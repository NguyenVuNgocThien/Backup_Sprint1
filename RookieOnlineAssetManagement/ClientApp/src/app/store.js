import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import homeReducer from '../pages/Home/HomeSlice'
import assetReducer from 'pages/ManageAsset/AssetSlice'

const rootReducer = {
	home: homeReducer,
	asset:assetReducer
	// user: userReducer
}

const store = configureStore({
	reducer: rootReducer
});

export default store;