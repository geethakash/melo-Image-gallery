import { ADD_TOAST, REMOVE_TOAST } from '../constants/toastConstants';

export const addToast = (type, message) => (dispatch, state) => {
  const toastId = Math.floor(Math.random() + 1 * 10) * Date.now();
  dispatch({ type: ADD_TOAST, payload: { id: toastId, type, message } });
  setTimeout(() => {
    dispatch({ type: REMOVE_TOAST, payload: toastId });
  }, 5000);
};

// export const removeToast = (id) => (dispatch, state) => {
//   console.log('timeouted', id);
//   //   setTimeout(() => {

//   //   }, 10000);
// };
