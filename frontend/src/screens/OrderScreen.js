import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, ListGroupItem } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails, payOrder } from '../actions/orderActions'
import { PayPalButton } from 'react-paypal-button-v2';
import { ORDER_PAY_RESET } from '../constants/orderConstants';


const OrderScreen = ({ match }) => {

  const [sdkReady, setSdkReady] = useState(false);
 
  const orderId = match.params.id;
  const dispatch = useDispatch();
  const orderDetails = useSelector(state => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector(state => state.orderPay);
  const { success: successPay, loading: loadingPay } = orderPay;

  useEffect(() => {
    const addPaypalScript = async () => {
      const {data: clientId} = await axios.get('/api/v1/config/paypal');
      const script = document.createElement('script');
      script.type = "text/javascript";
      script.source = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script);
    }

    addPaypalScript();

    if(!order || successPay){
      dispatch({ type: ORDER_PAY_RESET })
      dispatch(getOrderDetails(orderId));
    }else if(!order.isPaid){
      if(!window.paypal){
        addPaypalScript();
      }else{
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order])

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult))
  }
  
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
              <strong>Method: </strong>
                {order.paymentMethod}
                {order.isPaid ? 
                <Message variant="success">Paid</Message> : <Message variant="danger">Not Paid</Message>}
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


          {!order.isPaid && 
            <ListGroupItem>
              {loadingPay && <Loader />}
              {!sdkReady ? <Loader /> : (
                <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
              )}
            </ListGroupItem>} 
          <ListGroupItem>
            {error && <Message variant='danger'>{error}</Message>}
          </ListGroupItem>
        </Col>
      </Row>
  </>
};

export default OrderScreen;
