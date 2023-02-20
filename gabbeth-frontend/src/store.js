import {configureStore} from '@reduxjs/toolkit';
import productSlice from './features/productSlice';
import userSlice from './features/userSlice';
import appApi from './services/appApi';


//persist our store
//when we refresh the page we still want to have user details

import storage from 'redux-persist/lib/storage';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';

// reducers
const reducer = combineReducers({
  user: userSlice,
  products: productSlice,
  [appApi.reducerPath]: appApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [appApi.reducerPath, 'products'],
};

//persist our store
const persistedReducer = persistReducer(persistConfig, reducer);

// creating the store

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, appApi.middleware],
});


export default store;