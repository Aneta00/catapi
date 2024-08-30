export interface FavouriteCat {
  id: string;
  image_id: string;
  user_id: string;
  sub_id?: string;
  created_at: string;
  image: {
    id: string;
    url: string;
  };
}
