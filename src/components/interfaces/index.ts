export interface Props {
  className?: string;
}

export interface Image {
  id: string;
  display_name: string;
  featured_gif: {
    images: {
      fixed_height_small: {
        url: string;
      };
    };
  };
}
