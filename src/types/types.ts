export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  overview: string;
}

export interface MovieApiResponse {
  results: Movie[];
  total_pages: number;
}

export interface GenresApiReponse {
  genres: Genre[];
}
