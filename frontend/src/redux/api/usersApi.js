import { USERS_URL } from "../constant";
import { logOut, setCredentials } from "../features/auth/authSlice";
import { toggleRefetch } from "../features/bookmark/bookmarkSlice";
import apiSlice from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(setCredentials(data));
          dispatch(toggleRefetch());
        } catch (err) {
          console.log(err);
        }
      },
    }),

    logOut: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logOut());
        } catch (err) {
          console.log(err);
        }
      },
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(setCredentials(data));
          dispatch(toggleRefetch());
        } catch (err) {
          console.log(err);
        }
      },
    }),
    getProfilepic: builder.query({
        query : () => ({
            url : `${USERS_URL}/profilePic`,
            method : 'GET'
        })
    }),
    uploadProfilePic : builder.mutation({
      query: (formData) => ({
        url: `${USERS_URL}/profilePic`,
        method: "POST",
        body: formData,
      }),
      
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ profilePic: data.profilePic }));
        } catch (err) {
          console.log(err);
        }
      },
      
    })
  }),
  
});

export const { useLoginMutation, useLogOutMutation, useRegisterMutation, useGetProfilepicQuery, useUploadProfilePicMutation } =
  userApiSlice;
