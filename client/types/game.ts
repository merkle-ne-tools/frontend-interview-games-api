export interface Game {
  id: number;
  title: string;
  description: string;
  platform: string;
  releaseDate: string;
  averageRating: number;
  totalReviews: number;

  genre: {
    genreName: string;
  };

  developer: {
    name: string;
  };

  images: {
    id: number;
    image_url: string;
    image_type: string;
  }[];

  reviews: Review[];
}

export interface Review {
  id: number;
  username: string;
  rating: number;
  text: string;
}
