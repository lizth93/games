import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store";
import { getImages } from "store/getImages";
import { RootState } from "store/imagesSlice";

function MemoBlock() {
  const dispatch: any = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);

  const { images, isLoadingImages } = useSelector((state: RootState) => ({
    images: state.imagesCollection.images,
    isLoadingImages: state.imagesCollection.isLoadingImages,
  }));

  console.log(images);
  return (
    <>
      {images.map((image: any) => (
        <p key={image.id}>{image.featured_gif.bitly_url}</p>
      ))}
    </>
  );
}
export default MemoBlock;
