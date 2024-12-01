import React, { Component } from 'react';
import { Badge, Col, ListGroup, Row } from 'react-bootstrap';
import { numberWithCommas } from '../utils/utils';
import TotalHarga from './TotalHarga';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

class Result extends Component {
  render() {
    const { charts } = this.props;
    const total = charts.reduce((acc, item) => acc + item.total_harga, 0);
    return (
      <Col md={3} mt="2">
        <h4>
          <FontAwesomeIcon icon={faShoppingCart} />
          <strong> Keranjang</strong>
        </h4>
        <hr />
        {charts.length !== 0 && (
          <ListGroup>
            {charts.map((menuCharts, index) => (
              <ListGroup.Item key={index}>
                <Row>
                  <Col xs={2}>
                    <h4>
                      <Badge pill variant="success">{menuCharts.jumlah}</Badge>
                    </h4>
                  </Col>
                  <Col>
                    {menuCharts.product ? (
                      <>
                        <h5>{menuCharts.product.nama}</h5>
                        <p>Rp {numberWithCommas(menuCharts.product.harga)}</p>
                      </>
                    ) : (
                      <p>Product info unavailable</p> 
                    )}
                  </Col>
                  <Col>
                    <strong>Rp {numberWithCommas(menuCharts.total_harga)}</strong>
                  </Col>
                
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
        <TotalHarga charts={charts} {...this.props} />
      </Col>
    );
  }
}

export default Result;
