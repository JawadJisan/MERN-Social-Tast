import { apiSlice } from "../api/apiSlice";


export const postAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => 'posts',
            providesTags: ["posts"]
        }),
        getUserPosts: builder.query({
            // query: (data) => 'getMyPosts',
            query: (data) => ({
                // console.log(data)
                url: "/getMyPosts",
                method: "GET",
                body: data,
            })
        }),
        createPost: builder.mutation({
            query: (data) => ({
                url: "/new-post",
                method: "POST",
                body: data,
            }),
            invalidatesTags: (result, error, arg) => [
                "posts"
            ]
        }),
        addLike: builder.mutation({
            query: (data) => ({
                url: "/addLike",
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (result, error, arg) => [
                "posts"
            ]
        }),
        postComment: builder.mutation({
            query: (data) => ({
                url: "/newComment",
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (result, error, arg) => [
                "posts"
            ]
        }),
        updatePost: builder.mutation({
            query: (data) => ({
                url: `/updatePost/${data?.id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (result, error, arg) => [
                "posts"
            ]
        }),
        getSingleAssignment: builder.query({
            query: (id) => ({
                url: `/getMyPosts/${id}`,
            })
        }),
        deleteSinglePost: builder.mutation({
            query: (id) => ({
                url: `/deletePost/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, arg) => [
                "posts"
            ]
        }),
    }),
});


export const { useCreatePostMutation, useGetPostsQuery, useAddLikeMutation, usePostCommentMutation, useGetUserPostsQuery, useGetSingleAssignmentQuery, useDeleteSinglePostMutation, useUpdatePostMutation } = postAPI;
