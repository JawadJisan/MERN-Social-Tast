import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: []
};


const userSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        
    },
})
export const { } = userSlice.actions;
export default userSlice.reducer


