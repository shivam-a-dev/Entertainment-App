import { createSlice } from "@reduxjs/toolkit";


const bookmarkSlice = createSlice({
    name : 'bookmark',
    initialState : {
        shouldRefetch : false
    },
    reducers : {
        toggleRefetch : (state) => {
            state.shouldRefetch = true;
        },
        resetRefetch : (state) => {
            state.shouldRefetch = false
        }
    }
})

export const {toggleRefetch, resetRefetch} = bookmarkSlice.actions
export default bookmarkSlice.reducer