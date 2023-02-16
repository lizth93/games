import { Dispatch } from "redux";
import { imagesAction } from "./imagesSlice";

export const getImages = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(imagesAction.setIsLoading(true));
      const fetchResult = await fetchImages();

      if (fetchResult.data.length === 0) {
        dispatch(imagesAction.setIsLoading(false));
        throw new Error("Doesn't have Images");
      }

      dispatch(imagesAction.setImages(fetchResult.data));
      dispatch(imagesAction.setIsLoading(false));
    } catch (error: any) {
      dispatch(imagesAction.setIsLoading(false));
      dispatch(imagesAction.setError(error.message));
    }
  };
};

async function fetchImages() {
  const response = await fetch(
    "https://api.giphy.com/v1/stickers/packs?api_key=34fff10Cvxo1SKlv1akZ25wCXp1NQ34P"
  );

  if (!response.ok) {
    throw new Error("Error getting images");
  }
  return response.json();
}
