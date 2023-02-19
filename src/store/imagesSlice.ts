import { createSlice, PayloadAction, combineReducers } from "@reduxjs/toolkit";
import { Image } from "components/interfaces";

interface ImagesState {
  images: Image[];
  isLoadingImages: boolean;
  error: string | null;
}

const initialState: ImagesState = {
  images: [],
  isLoadingImages: true,
  error: null,
};

const imagesSlice = createSlice({
  name: "imagesCollection",
  initialState,
  reducers: {
    setImages(state, action: PayloadAction<any[]>) {
      state.images = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoadingImages = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});
const rootReducer = combineReducers({
  imagesCollection: imagesSlice.reducer,
});

export const imagesReducer = imagesSlice.reducer;
export const imagesAction = imagesSlice.actions;
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
