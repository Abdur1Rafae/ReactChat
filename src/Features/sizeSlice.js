import { createSlice } from "@reduxjs/toolkit";

export const sizeSlice = createSlice({
    name: "sizeSlice",
    initialState: {
        value: (window.innerWidth<=412 ? true : false)
    },
    reducers: {
        isMobile : (state) => {
            state.value = (window.innerWidth <= 412)
        },
    }
})

export const {isMobile} = sizeSlice.actions
export default sizeSlice.reducer