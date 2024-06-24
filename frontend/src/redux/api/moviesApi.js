import { MOVIES_URL } from "../constant";
import apiSlice from "./apiSlice";


export const movieApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        getTrending : builder.query({
            query : () => ({
                url : `${MOVIES_URL}/trending`,
                method : 'GET'
            }),
            
            keepUnusedDataFor: 60 * 60, // Cache data for 1 hour
        }),

        getDetails : builder.query({
            query : ({movieId}) => ({
                url : `${MOVIES_URL}/details/${movieId}`,
                method : 'GET'
            }),

             keepUnusedDataFor: 60 * 60, // Cache data for 1 hour
        }),
        
        getLatestShows : builder.query({
            query : () => ({
                url : `${MOVIES_URL}/latest-shows`,
                method : 'GET'
            }),

            keepUnusedDataFor: 60 * 60, // Cache data for 1 hour
        }),

        getTopRated : builder.query({
            query : (page) => ({
                url : `${MOVIES_URL}/top-movies?page=${page}`,
                method : 'GET'
            }) ,

            keepUnusedDataFor: 60 * 60, // Cache data for 1 hour
        })
    })
})



export const { useGetTrendingQuery, useGetDetailsQuery, useGetLatestShowsQuery, useGetTopRatedQuery } = movieApiSlice