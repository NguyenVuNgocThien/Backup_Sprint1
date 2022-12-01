import { configureStore } from '@reduxjs/toolkit';
import homeReducer from '../pages/Home/HomeSlice'
import assetReducer from 'pages/ManageAsset/AssetSlice'
import userLoginReducer from '../pages/UserSlice'

const rootReducer = {
	home: homeReducer,
	asset:assetReducer,
    userLogin: userLoginReducer
}

const store = configureStore({
	reducer: rootReducer
});

export default store;