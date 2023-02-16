import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { imagesReducer } from "./imagesSlice";

const store = configureStore({
  reducer: {
    imagesCollection: imagesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
