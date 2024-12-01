import React, { Component } from 'react'
import { Col, ListGroup } from 'react-bootstrap'
import axios from 'axios'
import { API_URL } from '../utils/constants'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
  
const Icon = ({ nama }) => {
    const validNama = ["Harian", "Mingguan", "Bulanan"];
    return validNama.includes(nama) ? (
      <FontAwesomeIcon icon={faGlobe} style={{ marginRight: '10px' }}/>
    ) : (
      <FontAwesomeIcon icon={faGlobe} style={{ marginRight: '10px' }} />
    );
  };
class PackageList extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         categories:[]
      }
    }
    componentDidMount() {
        axios.get(API_URL+"categories")
          .then(res => {
            const categories = res.data;
            this.setState({ categories });
          })
          .catch(error =>{
            console.error(error);
          })
      }
  render() {
   const {categories} = this.state
   const {changeCategory, selectedCategory} = this.props
    return (
    <Col md={2} mt="2">
      <div>
        <h4><strong>Kategori</strong></h4>
        <hr />
        <ListGroup>
        {categories && categories.map((category) => (
        <ListGroup.Item 
        key={category.id} 
        onClick={() => changeCategory(category.nama)} 
        className={selectedCategory === category.nama && "category-aktif"} 
        style={{cursor: 'pointer'}}>
            <h6><Icon nama = {category.nama}/>{category.nama}</h6></ListGroup.Item>))}
      </ListGroup>
      </div>
      </Col>
    )
  }
}
export default PackageList;