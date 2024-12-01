import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { numberWithCommas } from "../utils/utils";
import axios from 'axios';
import { API_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

const TotalHarga = ({ charts }) => {
    const navigate = useNavigate();  // Using useNavigate in place of history.push

    const submitTotalBayar = (sum) => {
        const checkout = {
            total_bayar: sum,
            lists: charts,
        };

        axios.post(API_URL + "checkouts", checkout)
            .then((res) => {
                navigate('/success');  // Using navigate to go to '/success' page
            })
            .catch((error) => {
                console.error('There was an error during checkout!', error);
            });
    };

    const sum = charts.reduce((result, item) => result + item.total_harga, 0);

    return (
        <div className='fixed-bottom'>
            <Row>
                <Col md={{ span: 3, offset: 9 }} className='px-4'>
                    <h5>Total harga: <strong className="float-right mr-2">Rp {numberWithCommas(sum)}</strong></h5>
                    <Button 
                        variant='primary' 
                        className='mt-2 w-100'  
                        style={{ padding: '10px', fontSize: '16px' }} 
                        onClick={() => submitTotalBayar(sum)}>
                        <strong>BAYAR</strong>
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default TotalHarga;
