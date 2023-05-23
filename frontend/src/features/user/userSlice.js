import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: undefined,
};


const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.user = action.payload.user;
        },
        userLoggedOut: (state) => {
            state.user = undefined;
        },
    },
})
export const { userLoggedIn, userLoggedOut } = userSlice.actions;
export default userSlice.reducer


