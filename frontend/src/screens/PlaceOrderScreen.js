import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, ListGroupItem } from 'react-bootstrap';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions'
import { removeFromCart } from '../actions/cartActions';

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  console.log(cartItems,'cartItems')

  //calculate price
  cart.itemsPrice = (Number(cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0))).toFixed(2);
  cart.shippingPrice = cart.cartItems.length > 0 ? Number(10).toFixed(2) : 0;
  cart.taxPrice = (0.15 * cart.itemsPrice).toFixed(2);
  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2);

  const orderCreate = useSelector(state => state.orderCreate);
  const { order, success, error } = orderCreate; 

  useEffect(() => {
    if(success){
      cartItems.map(item =>  dispatch(removeFromCart(item.product)));
      history.push(`/orders/${order._id}`)
    }
  }, [success, order, history, dispatch, cartItems])
  
  const placeOrderHandler = () => {
    dispatch(createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    }))
  } 

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
              </p>
            </ListGroupItem>
            <ListGroupItem>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroupItem>

            <ListGroupItem>
              <h2>Order </h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
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
              <Col>${cart.itemsPrice}</Col>
            </Row>
          </ListGroupItem>

          <ListGroupItem>
            <Row>
              <Col>Shipping</Col>
              <Col>${cart.shippingPrice}</Col>
            </Row>
          </ListGroupItem>

          <ListGroupItem>
            <Row>
              <Col>Tax</Col>
              <Col>${cart.taxPrice}</Col>
            </Row>
          </ListGroupItem>

          <ListGroupItem>
            <Row>
              <Col>Total</Col>
              <Col>${cart.totalPrice}</Col>
            </Row>
          </ListGroupItem>

          <ListGroupItem>
            {error && <Message variant='danger'>{error}</Message>}
          </ListGroupItem>

          <ListGroupItem>
            <Button type='button' className='btn-block' disabled = {cart.cartItems.length === 0}
            onClick={placeOrderHandler}>Place Order</Button>
          </ListGroupItem>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
