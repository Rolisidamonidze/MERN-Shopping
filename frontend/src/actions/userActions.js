import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS } from '../constants/userConstants';
import axios from 'axios';
import { json } from 'express';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        ContentType: 'Application/json',
      },
    };

    const { data } = await axios.post('/api/v1/users/login', { email, password }, config);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {}
};
