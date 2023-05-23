import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./userSlice";

export const userAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: "/register",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    localStorage.setItem(
                        "auth",
                        JSON.stringify({
                            user: result.data.user,
                        })
                    );
                    dispatch(
                        userLoggedIn({
                            user: result.data.user,
                        })
                    );
                } catch (err) {
                    // do nothing
                }
            },
        }),
        login: builder.mutation({
            query: (data) => ({
                url: "/login",
                method: "POST",
                body: data,
            }),
            providesTags: ["user"],
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    localStorage.setItem(
                        "auth",
                        JSON.stringify({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        })
                    );
                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        })
                    );
                } catch (err) {
                    // do nothing
                }
            },
        }),
        updateInfo: builder.mutation({
            query: (data) => ({
                url: "/info",
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (result, error, arg) => [
                "user"
            ]
        }),
        getUSerInfo: builder.query({
            query: (id) => ({
                url: `/userInfo/${id}`,
            })
        }),
    }),
});

// userInfo/:id

// export const { useLoginMutation, useRegisterMutation } = userAPI;
export const { useRegisterMutation, useLoginMutation, useUpdateInfoMutation, useGetUSerInfoQuery } = userAPI;
