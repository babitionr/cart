import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItem from '../../cartItems'
import axios from "axios";
import { openModal } from "../modal/modalSlice";
const url = 'http://course-api.com/react-useReducer-cart-project'

const initialState = {
    cartItem : cartItem,
    amount: 4,
    total: 0,   
    isLoading: true,
};

export const getCartItems = createAsyncThunk('cart/getCartItems', async (name, thunkAPI) => {
    try {
        // thunkAPI.dispatch(openModal())
        const resp = await axios(url)
        return resp.data
    } catch (error) {
        return thunkAPI.rejectWithValue('something went wrong')
    }
})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItem = []
        },
        removeItem: (state, action) => {
            const itemID = action.payload;
            state.cartItem = state.cartItem.filter((item) => item.id !== itemID)
        },
        increase: (state, {payload}) => {
            const cartItem = state.cartItem.find((item) => item.id === payload.id);
            cartItem.amount = cartItem.amount + 1;
        },
        decrease: (state, {payload}) => {
            const cartItem = state.cartItem.find((item) => item.id === payload.id);
            cartItem.amount = cartItem.amount - 1;
        },
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItem.forEach((item) => {
                amount += item.amount;
                total += item.amount * item.price;
            })
            state.amount = amount;
            state.total = total;    
        }
    },

    extraReducers: (builder) => {
        builder
        .addCase(getCartItems.pending, (state) =>{
            state.isLoading = true
        })
        .addCase(getCartItems.fulfilled, (state, action) =>{
            state.isLoading = false
            state.cartItem = action.payload
        })
        .addCase(getCartItems.rejected, (state, action) =>{
            state.isLoading = false
        })
    }
});
export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions
export default cartSlice.reducer