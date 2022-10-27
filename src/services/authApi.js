import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api/v1/',
  }),
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (body) => {
        return {
          url: '/user/login',
          method: 'post',
          body,
        };
      },
    }),
    registerUser: build.mutation({
      query: (body) => {
        return {
          url: '/user/signup',
          method: 'post',
          body,
        };
      },
    }),
    profileUser: build.query({
      query: (jwt) => {
        return {
          url: '/user/profile',
          method: 'post',
          headers: {
            authorization: `Bearer ${jwt}`,
          },
        };
      },
    }),
    changeUser: build.mutation({
      query: (body) => {
        return {
          url: '/user/profile',
          method: 'put',
          headers: {
            authorization: `Bearer ${body.token}`,
          },
          body,
        };
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useProfileUserQuery,
  useChangeUserMutation,
} = authApi;
