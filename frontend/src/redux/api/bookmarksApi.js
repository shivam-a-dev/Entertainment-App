import apiSlice from './apiSlice'
import { BOOKMARK_URL } from '../constant'


export const bookmarkApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        isBookmarked: builder.mutation({
            query : (data) => ({
                url : `${BOOKMARK_URL}/is-bookmarked`,
                method : 'POST',
                body : data
                 
            })
        }),

        createBookmark : builder.mutation({
            query : (data) => ({
                url : `${BOOKMARK_URL}`,
                method : 'POST',
                body : data
            })
        }),

        getAllBookmarks : builder.query({
            query : () => ({
                url : `${BOOKMARK_URL}`,
                method : 'GET'
            })
        })
    })
})

export const {useIsBookmarkedMutation, useCreateBookmarkMutation, useGetAllBookmarksQuery} = bookmarkApiSlice