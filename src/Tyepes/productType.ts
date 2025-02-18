export type productType = {
  id: number;
  title: string;
  price: string;
  cat_prefix: string;
  img: string;
  quantity?: number;
  max?: number;
  isLiked?: boolean;
  isAuth?: boolean;
};
