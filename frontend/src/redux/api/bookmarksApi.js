import apiSlice from './apiSlice'
import { BOOKMARK_URL } from '../constant'


export const bookmarkApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        isBookmarked: builder.mutation({
            query : (data) => ({
                url : `${BOOKMARK_URL}/is-bookmarked`,
                method : 'POST',
                body : data
                 
            }),
            keepUnusedDataFor: 60 * 60, // Cache data for 1 hour
        }),

        createBookmark : builder.mutation({
            query : (data) => ({
                url : `${BOOKMARK_URL}`,
                method : 'POST',
                body : data
            }),
            keepUnusedDataFor: 60 * 60, // Cache data for 1 hour
        }),

        getAllBookmarks : builder.query({
            query : () => ({
                url : `${BOOKMARK_URL}`,
                method : 'GET'
            }),
            keepUnusedDataFor: 60 * 60, // Cache data for 1 hour
        })
    })
})

export const {useIsBookmarkedMutation, useCreateBookmarkMutation, useGetAllBookmarksQuery} = bookmarkApiSlice