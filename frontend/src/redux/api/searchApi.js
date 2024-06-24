import { SEARCH_URL } from '../constant'
import apiSlice from './apiSlice'
export const searchApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        search: builder.query({
            query: ({query, type = ''}) => ({
                url: `${SEARCH_URL}?query=${query}&type=${type}`,
            })
        })
    })
})


export const {useSearchQuery} = searchApiSlice