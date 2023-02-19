import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "store";
import { getImages } from "store/getImages";
import { Props, Image } from "components/interfaces";
import { RootState } from "store/imagesSlice";
import Blocks from "components/blocks";

function MemoBlock(props: Props): JSX.Element {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const [randomizedImages, setRandomizedImages] = useState<Image[]>([]);
  const [duplicatedImages, setDuplicatedImages] = useState<Image[]>([]);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [idImageSelected, setIdImageSelected] = useState("");
  const [categorySelected, setcategorySelected] = useState("");
  const [isShowImg, setShowImg] = useState(false);

  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);

  const { images, isLoadingImages } = useSelector((state: RootState) => ({
    images: state.imagesCollection.images,
    isLoadingImages: state.imagesCollection.isLoadingImages,
  }));

  if (isLoadingImages) {
    return <p>Please Wait</p>;
  }
  if (isFirstTime) {
    const newRandomizedImages = sortImages(images);
    setRandomizedImages(newRandomizedImages);

    const duplicatedImages = sortImages(images);
    setDuplicatedImages(duplicatedImages);
    setIsFirstTime(false);
  }

  function sortImages(images: Image[]) {
    return images.slice().sort(() => 0.5 - Math.random());
  }

  function handleClick(id: string, category: string) {
    console.log(id, "click", category);
    setShowImg(true);
    setIdImageSelected(id);
    setcategorySelected(category);
    if (idImageSelected === id) {
      alert("iguales");
      setIdImageSelected("");
    }
  }
  return (
    <div className={`${props.className} content`}>
      <Blocks
        images={randomizedImages}
        handleClick={handleClick}
        isShowImg={isShowImg}
        idImageSelected={idImageSelected}
        category="1"
        categorySelected={categorySelected}
      />

      <Blocks
        images={duplicatedImages}
        handleClick={handleClick}
        isShowImg={isShowImg}
        idImageSelected={idImageSelected}
        category="2"
        categorySelected={categorySelected}
      />
    </div>
  );
}
export default MemoBlock;
