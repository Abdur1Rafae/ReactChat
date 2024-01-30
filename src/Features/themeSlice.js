import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
    name: "themeSlice",
    initialState: {
        value: true
    },
    reducers: {
        toggleTheme : (state) => {
            state.value = !state.value
        },
    }
})

export const {toggleTheme} = themeSlice.actions
export default themeSlice.reducer