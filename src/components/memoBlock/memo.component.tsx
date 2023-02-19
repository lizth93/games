import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store";
import { getImages } from "store/getImages";

interface Props {
  className?: string;
}

function MemoBlock(props: Props): JSX.Element {
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
  console.log(images);

  const shuffledImages = images.slice().sort(() => 0.5 - Math.random());

  return (
    <div className={props.className}>
      {shuffledImages.map((image: any) => (
        <img
          className="img-block"
          src={image.featured_gif.images.fixed_height_small.url}
          alt={image.display_name}
          key={image.id}
        />
      ))}
    </div>
  );
}
export default MemoBlock;
