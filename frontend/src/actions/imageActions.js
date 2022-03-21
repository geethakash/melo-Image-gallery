import axios from 'axios';
import {
  GET_IMAGES_FAIL,
  GET_IMAGES_REQUEST,
  GET_IMAGES_RESET,
  GET_IMAGES_SUCCESS,
  IMAGE_DELETE_FAIL,
  IMAGE_DELETE_REQUEST,
  IMAGE_DELETE_SUCCESS,
  IMAGE_DETAILS_FAIL,
  IMAGE_DETAILS_REQUEST,
  IMAGE_DETAILS_RESET,
  IMAGE_DETAILS_SUCCESS,
  IMAGE_RENAME_FAIL,
  IMAGE_RENAME_REQUEST,
  IMAGE_RENAME_SUCCESS,
} from '../constants/imageContstants';
import { addToast } from './toastActions';

export const getImages = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_IMAGES_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/images/`, config);
    dispatch({ type: GET_IMAGES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_IMAGES_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
    dispatch(
      addToast(
        'error',
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      )
    );
  }
};

export const getImageById = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: IMAGE_DETAILS_RESET });
    dispatch({ type: IMAGE_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/images/${id}/`, config);
    dispatch({ type: IMAGE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: IMAGE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
    dispatch(
      addToast(
        'error',
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      )
    );
  }
};

export const deleteImage = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: IMAGE_DELETE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/images/delete/${id}/`, config);
    dispatch({ type: IMAGE_DELETE_SUCCESS, payload: data });
    dispatch(addToast('success', data.detail));
    dispatch(getImages());
  } catch (error) {
    dispatch({
      type: IMAGE_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
    dispatch(
      addToast(
        'error',
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      )
    );
  }
};

export const renameImage = (id, caption) => async (dispatch, getState) => {
  try {
    dispatch({ type: IMAGE_RENAME_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `/api/images/rename/${id}/`,
      { caption },
      config
    );
    dispatch(addToast('success', data.detail));
    dispatch({ type: IMAGE_RENAME_SUCCESS, payload: data });
    dispatch(getImageById(id));
    dispatch(getImages());
  } catch (error) {
    dispatch({
      type: IMAGE_RENAME_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
    dispatch(
      addToast(
        'error',
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      )
    );
  }
};
