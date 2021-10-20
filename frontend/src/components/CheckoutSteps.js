import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                <LinkContainer disabled={!step1} to='/login'><Nav.Link>Sign In</Nav.Link></LinkContainer> 
            </Nav.Item>
            <Nav.Item>
                <LinkContainer disabled={!step2} to='/shipping'><Nav.Link>Shipping</Nav.Link></LinkContainer>
            </Nav.Item>
            <Nav.Item>
                <LinkContainer disabled={!step3} to='/payment'><Nav.Link>Payment</Nav.Link></LinkContainer>
            </Nav.Item>
            <Nav.Item>
                <LinkContainer disabled={!step4} to='/placeorder'><Nav.Link>Place Order</Nav.Link></LinkContainer>
            </Nav.Item>
        </Nav>
    )
}

export default CheckoutSteps
