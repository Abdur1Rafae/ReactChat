import { configureStore } from "@reduxjs/toolkit";
import themeSliceReducer from "./themeSlice";
import sizeSlice from "./sizeSlice";

export const store =  configureStore({
    reducer: {
         themeKey: themeSliceReducer,
         sizeKey: sizeSlice
    }
})