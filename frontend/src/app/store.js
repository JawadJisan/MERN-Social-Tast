import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/user/userSlice';
import { apiSlice } from '../features/api/apiSlice';
import postSlice from '../features/post/postSlice';


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        users: userSlice,
        posts: postSlice
    },
    middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(apiSlice.middleware)
});
