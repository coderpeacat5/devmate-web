import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: 'request',
    initialState : null,
    reducers : {
        addRequests: (state, action) => action.payload,
        clearRequests: () => null,
        removeRequest : (state, action) => {
            const newArray = state.filter(r => r._id !== action.payload)
            return newArray
        }
    }
})

export const {addRequests, clearRequests, removeRequest} = requestSlice.actions;

export default requestSlice.reducer;