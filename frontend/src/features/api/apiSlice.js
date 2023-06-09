import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: '  http://localhost:9000/api/v1'
});
export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery,
    tagTypes: ["quizzes", "user"],
    endpoints: () => ({})
})
