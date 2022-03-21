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

export const imageListReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_IMAGES_REQUEST:
      return { loading: true, images: [] };

    case GET_IMAGES_SUCCESS:
      return { loading: false, images: action.payload };

    case GET_IMAGES_FAIL:
      return { loading: false, error: action.payload };
    case GET_IMAGES_RESET:
      return { images: [] };
    default:
      return state;
  }
};

export const imageDetailsReducer = (state = { image: {} }, action) => {
  switch (action.type) {
    case IMAGE_DETAILS_REQUEST:
      return { loading: true, ...state };

    case IMAGE_DETAILS_SUCCESS:
      return { loading: false, image: action.payload };

    case IMAGE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case IMAGE_DETAILS_RESET:
      return { image: {} };
    default:
      return state;
  }
};

export const imageDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case IMAGE_DELETE_REQUEST:
      return { loading: true };

    case IMAGE_DELETE_SUCCESS:
      return { loading: false, success: action.payload };

    case IMAGE_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const imageRenameReducer = (state = {}, action) => {
  switch (action.type) {
    case IMAGE_RENAME_REQUEST:
      return { loading: true };

    case IMAGE_RENAME_SUCCESS:
      return { loading: false, success: action.payload };

    case IMAGE_RENAME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
