import React from 'react'
import { Col, Card, Button, ListGroup } from 'react-bootstrap';
import { numberWithCommas } from '../utils/utils';

const Lists = ({ list, chartAdd }) => {
  return (
    <Col md={4} xs={6} className="mb-4">
      <Card className='shadow' style={{ borderRadius: '20px', height: '100%' }}>
        <Card.Body>
          <Card.Title>{list.nama}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Rp {numberWithCommas(list.harga)}</Card.Subtitle>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>{list.features}</ListGroup.Item>
          </ListGroup>
          <Button variant='primary' className='mt-3' onClick={() => chartAdd(list)}>Beli</Button>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default Lists;
