import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store";
import { getImages } from "store/getImages";

function MemoBlock(): JSX.Element {
  const dispatch: any = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);

  const { images, isLoadingImages } = useSelector((state: any) => ({
    images: state.imagesCollection.images,
    isLoadingImages: state.imagesCollection.isLoadingImages,
  }));

  if (isLoadingImages) {
    return <p>Please Wait</p>;
  }

  return (
    <>
      {images.map((image: any) => (
        <img
          src={image.featured_gif.images.fixed_height_small.url}
          alt={image.display_name}
          key={image.id}
        />
      ))}
    </>
  );
}
export default MemoBlock;
