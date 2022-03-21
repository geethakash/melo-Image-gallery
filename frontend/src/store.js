import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers';
import {
  imageListReducer,
  imageDetailsReducer,
  imageRenameReducer,
  imageDeleteReducer,
} from './reducers/imageReducers';
import { toastReducer } from './reducers/toastReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  usersList: userListReducer,
  userUpdate: userUpdateReducer,
  userDelete: userDeleteReducer,

  images: imageListReducer,
  imageDetails: imageDetailsReducer,
  imageRename: imageRenameReducer,
  imageDelete: imageDeleteReducer,

  toasts: toastReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  images: { images: [] },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
