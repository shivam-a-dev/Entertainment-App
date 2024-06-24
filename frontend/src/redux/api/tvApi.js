import { TV_URL } from "../constant";
import apiSlice from "./apiSlice";

export const tvApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        getTvDetails : builder.query({
            query : ({tvId}) => ({
                url : `${TV_URL}/details/${tvId}`,
                method : 'GET'
            }),
            keepUnusedDataFor: 60 * 60, // Cache data for 1 hour
        }),

        getOnAir : builder.query({
            query : (page) => ({
                url : `${TV_URL}/on-air?page=${page}`,
                method : 'GET'
            }),
            keepUnusedDataFor: 60 * 60, // Cache data for 1 hour
        }),

    })


})

export const {useGetTvDetailsQuery, useGetOnAirQuery} = tvApiSlice