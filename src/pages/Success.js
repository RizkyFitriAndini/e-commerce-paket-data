import React, { Component } from 'react';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import { numberWithCommas } from '../utils/utils'; 

export default class Success extends Component {
  constructor(props) {
    super(props);
    this.state = {
      charts: [],  
    };
  }

  componentDidMount() {
    axios.get(API_URL + "charts")
      .then(res => {
        const charts = res.data;
        this.setState({ charts });

        charts.map(item => {
          return axios
            .delete(API_URL + "charts/" + item.id)
            .then(res => console.log(res))
            .catch(error => console.log(error));
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { charts } = this.state;

    const total = charts.reduce((acc, item) => acc + item.total_harga, 0);

    return (
      <Container fluid className="mt-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="text-center p-4 shadow-lg">
              <Image
                src="assets/success.png"
                width="200"
                className="mx-auto d-block mb-4"
              />
              <h2 className="text-primary">Checkout Berhasil!</h2>
              <p className="text-muted">Pesanan Anda telah kami terima. Silakan periksa detail berikut:</p>
              <hr />
              <div>
                <h4>Detail Pembelian:</h4>
                <ul className="list-unstyled">
                  {charts.map((item, index) => (
                    <li key={index}>
                      <strong>Produk:</strong> {item.product.nama}<br />
                      <strong>Harga:</strong> Rp {numberWithCommas(item.product.harga)}<br />
                      <strong>Jumlah:</strong> {item.jumlah}<br />
                      <strong>Total:</strong> Rp {numberWithCommas(item.total_harga)}<br />
                      <hr />
                    </li>
                  ))}
                  <li>
                    <strong>Total Pembayaran:</strong> Rp {numberWithCommas(total)}<br />
                  </li>
                </ul>
              </div>
              <Link to="/home" className="btn btn-primary mt-3">
                Kembali ke Beranda
              </Link>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
