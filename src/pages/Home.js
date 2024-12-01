import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Result, PackageList, Lists } from '../components';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import Swal from 'sweetalert2';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      selectedCategory: "Harian",
      charts: [],
    };
  }

  componentDidMount() {
    // Fetch products based on category and charts in one go
    this.fetchData();
  }

  fetchData = () => {
    const { selectedCategory } = this.state;

    // Fetch both products and charts simultaneously
    Promise.all([
      axios.get(API_URL + "products?category.nama=" + selectedCategory),
      axios.get(API_URL + "charts"),
    ])
      .then(([productRes, chartRes]) => {
        this.setState({
          lists: productRes.data,
          charts: chartRes.data,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  changeCategory = (value) => {
    this.setState({ selectedCategory: value }, () => {
      this.fetchData();  // Re-fetch data whenever the category changes
    });
  };

  chartAdd = (value) => {
    const { charts } = this.state;

    // Check if the product is already in the chart
    const existingChart = charts.find((chart) => chart.product.id === value.id);
    
    if (!existingChart) {
      const chart = {
        jumlah: 1,
        total_harga: value.harga,
        product: value,
      };

      axios.post(API_URL + "charts", chart)
        .then((res) => {
          Swal.fire({
            title: 'Add chart',
            text: 'Success Add Chart ' + chart.product.nama,
            icon: 'success',
            confirmButtonText: 'OK',
          });
          this.fetchData();  // Re-fetch the charts after adding
        })
        .catch((error) => {
          console.error("Error adding chart:", error);
        });
    } else {
      // Update the existing chart
      const updatedChart = {
        ...existingChart,
        jumlah: existingChart.jumlah + 1,
        total_harga: existingChart.total_harga + value.harga,
      };

      axios.put(API_URL + "charts/" + existingChart.id, updatedChart)
        .then((res) => {
          Swal.fire({
            title: 'Update chart',
            text: 'Success Update Chart ' + updatedChart.product.nama,
            icon: 'success',
            confirmButtonText: 'OK',
          });
          this.fetchData();  // Re-fetch the charts after updating
        })
        .catch((error) => {
          console.error("Error updating chart:", error);
        });
    }
  };

  render() {
    const { lists, selectedCategory, charts } = this.state;

    return (
      <div className="mt-3">
        <Container fluid>
          <Row>
            <PackageList
              changeCategory={this.changeCategory}
              selectedCategory={selectedCategory}
            />
            <Col md={7}>
              <h4><strong>Paket Data</strong></h4>
              <hr />
              <Row>
                {lists.map((list) => (
                  <Lists key={list.id} list={list} chartAdd={this.chartAdd} />
                ))}
              </Row>
            </Col>
            <Result charts={charts} {...this.props} />
          </Row>
        </Container>
      </div>
    );
  }
}
