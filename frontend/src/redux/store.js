import { configureStore } from "@reduxjs/toolkit";
import  apiSlice  from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from './features/auth/authSlice'
import bookmarkReducer from './features/bookmark/bookmarkSlice'



const store = configureStore({
    reducer : {
        [apiSlice.reducerPath] : apiSlice.reducer,
        auth : authReducer,
        bookmark : bookmarkReducer
    },
 
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools : true,
})

setupListeners(store.dispatch);

export default store