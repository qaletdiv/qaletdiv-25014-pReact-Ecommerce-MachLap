import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slices/authSlice";
import productsSlice from './Slices/productsSlice';
import productSaleSlice from './Slices/productSaleSlice';
import categoriesSLice from './Slices/categoriesSlice';
import newsSlice from './Slices/newsSlice';
import userSlice from './Slices/userSlice';
import cartSlice from './Slices/cartSLice'


const store = configureStore({
  reducer: {
    auth: authSlice,
    products : productsSlice,
    productSale: productSaleSlice,
    categories : categoriesSLice,
    news : newsSlice,
    user : userSlice,
    cart: cartSlice,
  },
});
export default store;