import { Props, Image } from "components/interfaces";

export interface PropsBlocks extends Props {
  images: Image[];
  isShowImg: boolean;
  idImageSelected: string;
  handleClick: (id: string, category: string) => void;
  category: string;
  categorySelected: string;
}
