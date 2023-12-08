/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState : {
  itemsList : any[];
  totalQuantity : number;
  showCart: boolean;
} = {
  itemsList : [],
  totalQuantity: 0,
  showCart: false
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addToCart : (state, action: PayloadAction<any>) => {
      const newItem = action.payload;
      // to check if the already availabe then update
      const existingItem = state.itemsList.find((item) => item.id == newItem.id);

      if(existingItem){
        existingItem.quantity++;
        existingItem.totalPrice+= newItem.price;
      }else{
        // state.itemsList.push({
        //   id: newItem.id,
        //   name: newItem.name
        //   price: newItem.price,
        //   quantity: 1,
        //   totalPrice: newItem.price,
        // })
        state.itemsList.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price
        })
        state.totalQuantity++;
      }
    },
    updateQuantity : (state, action) => {
      const existingItem = state.itemsList.find((item) => item.id == action.payload.id);
      if(action.payload.type === "INC" && existingItem){
        // state.itemsList = state.itemsList.map(item => {
        //    return  item.id === action.payload.id ? {...item, quantity: item.quantity+1, totalPrice: item.totalPrice+item.price} : { ...item }
        // })
        existingItem.quantity++;
        existingItem.totalPrice+= existingItem.price;
      }
      else if(action.payload.type === "DEC" && existingItem){
        existingItem.quantity--;
        existingItem.totalPrice-= existingItem.price;
      }
      else{
        alert(action.type)
      }
    },
    removeFromCart : (state, action) => {
      state.itemsList = state.itemsList.filter(item => item.id !== action.payload);
      state.totalQuantity = state.itemsList.length;
    },
    setShowCart(state){
      state.showCart = !state.showCart;
    },
  }
});

export const cartActions = cartSlice.actions;
export default cartSlice;

