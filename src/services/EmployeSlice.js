import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const EmployeeApi = createApi({
  reducerPath: "EmployeeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ["Post"],
  // GET DATA->
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => {
        return {
          url: "employees",
          method: "GET",
        };
      },
      providesTags: ["Post"],
    }),
    // DELETE DATA-->
    deletePosts: builder.mutation({
      query: (id) => {
        console.log("come_id", id);
        return {
          url: `employees/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Post"],
    }),
    // ADD POST-->
    addPost: builder.mutation({
      query: (data) => {
        console.log("come_id", data);
        return {
          url: `employees`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Post"],
    }),
    // UPDATE POST-->
    updatePost: builder.mutation({
      query: ({ data, id }) => {
        // console.log("hookID", id);
        // console.log("hookDATA", data);
        return {
          url: `employees/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Post"],
    }),
  }),
});
export const {
  useGetPostsQuery,
  useDeletePostsMutation,
  useAddPostMutation,
  useUpdatePostMutation,
} = EmployeeApi;
