import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../index";

let user = JSON.parse(localStorage.getItem("user"));

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers, { getState }) => {
      if (user) {
        headers.set("authorization", `Bearer ${user.token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    register: build.mutation({
      query: (body) => ({
        url: `/register`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["User"],
      async onQueryStarted(
        arg,
        { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
      ) {},
      async onCacheEntryAdded(
        arg,
        {
          dispatch,
          getState,
          requestId,
          extra,
          getCacheEntry,
          cacheDataLoaded,
          cacheEntryRemoved,
        }
      ) {},
    }),
    login: build.mutation({
      query: (body) => ({
        url: `/login`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["User"],
      async onQueryStarted(
        arg,
        { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
      ) {},
      async onCacheEntryAdded(
        arg,
        {
          dispatch,
          getState,
          requestId,
          extra,
          getCacheEntry,
          cacheDataLoaded,
          cacheEntryRemoved,
        }
      ) {},
    }),
    getUserById: build.query({
      query: (userId) => `/users/${userId}`,
      invalidatesTags: ["User"],
      async onQueryStarted(
        arg,
        { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
      ) {},
      async onCacheEntryAdded(
        arg,
        {
          dispatch,
          getState,
          requestId,
          extra,
          getCacheEntry,
          cacheDataLoaded,
          cacheEntryRemoved,
        }
      ) {},
    }),
    addFarmer: build.mutation({
      query: (body) => ({
        url: `/farmers`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Farmer"],
      async onQueryStarted(
        arg,
        { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
      ) {},
      async onCacheEntryAdded(
        arg,
        {
          dispatch,
          getState,
          requestId,
          extra,
          getCacheEntry,
          cacheDataLoaded,
          cacheEntryRemoved,
        }
      ) {},
    }),
    addFarmland: build.mutation({
      query: (body) => ({
        url: `/farmlands?farmerId=${body.farmerId}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Farmland"],
      async onQueryStarted(
        arg,
        { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
      ) {},
      async onCacheEntryAdded(
        arg,
        {
          dispatch,
          getState,
          requestId,
          extra,
          getCacheEntry,
          cacheDataLoaded,
          cacheEntryRemoved,
        }
      ) {},
    }),
    getFarmersBy: build.query({
      query: (filterBy) => `/farmers?from=${filterBy}`,
      invalidatesTags: ["Farmers"],
      async onQueryStarted(
        arg,
        { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
      ) {},
      async onCacheEntryAdded(
        arg,
        {
          dispatch,
          getState,
          requestId,
          extra,
          getCacheEntry,
          cacheDataLoaded,
          cacheEntryRemoved,
        }
      ) {},
    }),
    getFarmlandsBy: build.query({
      query: (filterBy) => `/farmlands?from=${filterBy}`,
      invalidatesTags: ["Farmlands"],
      async onQueryStarted(
        arg,
        { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
      ) {},
      async onCacheEntryAdded(
        arg,
        {
          dispatch,
          getState,
          requestId,
          extra,
          getCacheEntry,
          cacheDataLoaded,
          cacheEntryRemoved,
        }
      ) {},
    }),

    addDivision: build.mutation({
      query: (body) => ({
        url: `/farmlands/${body.farmlandId}/divisions`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Division"],
      async onQueryStarted(
        arg,
        { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
      ) {},
      async onCacheEntryAdded(
        arg,
        {
          dispatch,
          getState,
          requestId,
          extra,
          getCacheEntry,
          cacheDataLoaded,
          cacheEntryRemoved,
        }
      ) {},
    }),
    getPerformance: build.query({
      query: () =>
        `/performances?userId=${user?._id}&district=${user?.address?.district}&province=${user?.address?.province}`,
      invalidatesTags: ["Performance"],
      async onQueryStarted(
        arg,
        { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
      ) {},
      async onCacheEntryAdded(
        arg,
        {
          dispatch,
          getState,
          requestId,
          extra,
          getCacheEntry,
          cacheDataLoaded,
          cacheEntryRemoved,
        }
      ) {},
    }),
  }),
});

export const { 
    // user
    useRegisterMutation, 
    useLoginMutation, 
    useGetUserByIdQuery,

    // farmer
    useAddFarmerMutation,
    useGetFarmersByQuery,

    // farmland
    useAddFarmlandMutation,
    useAddDivisionMutation,
    useGetFarmlandsByQuery,

    // performance
    useGetPerformanceQuery,
} = apiSlice;
