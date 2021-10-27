import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, ListGroupItem } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails } from '../actions/orderActions'


const OrderScreen = ({ match }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();
  const orderDetails = useSelector(state => state.orderDetails);
  const { order, loading, error } = orderDetails;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId])
  
  return loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> :
  <>
   <h1>Order {order._id}</h1>
   <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
              {order.isDelivered 
                ? <Message variant="success">Delivered on {order.deliveredAt}</Message> 
                : <Message variant="danger">Not Delivered</Message>}
            </ListGroupItem>
            <ListGroupItem>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
                {order.isPaid ? 
                <Message variant="success">Paid</Message> : <Message variant="danger">Not Paid</Message>}
              </p>
            </ListGroupItem>

            <ListGroupItem>
              <h2>Order </h2>
              {order.orderItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroupItem key={index}>
                      <Row>
                        <Col md={1}><Image src={item.image} alt={item.name} fluid rounded /></Col>
                        <Col><Link to={`/products/${item.product}`}>{item.name}</Link></Col>
                        <Col md={4}>
                          {item.quantity} x {item.price} = ${Number(item.quantity * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col variant='flush'>
          <ListGroupItem>
            <h2>Order Summary</h2>
          </ListGroupItem>
          <ListGroupItem>
            <Row>
              <Col>Items</Col>
              <Col>${order.itemsPrice}</Col>
            </Row>
          </ListGroupItem>

          <ListGroupItem>
            <Row>
              <Col>Shipping</Col>
              <Col>${order.shippingPrice}</Col>
            </Row>
          </ListGroupItem>

          <ListGroupItem>
            <Row>
              <Col>Tax</Col>
              <Col>${order.taxPrice}</Col>
            </Row>
          </ListGroupItem>

          <ListGroupItem>
            <Row>
              <Col>Total</Col>
              <Col>${order.totalPrice}</Col>
            </Row>
          </ListGroupItem>

          <ListGroupItem>
            {error && <Message variant='danger'>{error}</Message>}
          </ListGroupItem>

        </Col>
      </Row>
  </>
};

export default OrderScreen;
