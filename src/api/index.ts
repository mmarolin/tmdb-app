import axios from "axios";
import { Genre, GenresApiReponse, MovieApiResponse } from "../types/types";

const apiKey = process.env.REACT_APP_TMDB_API_KEY;
const url = "https://api.themoviedb.org/3";

const tmdbApi = axios.create({
  baseURL: url,
  params: { api_key: apiKey },
});

export const fetchGenres = async (): Promise<GenresApiReponse> => {
  const response = await tmdbApi.get<GenresApiReponse>("/genre/movie/list");
  return response.data;
};

export const fetchMovies = async (
  genreIds: number[],
  page = 1
): Promise<MovieApiResponse> => {
  const genreParam = genreIds.join(",");
  const response = await tmdbApi.get<MovieApiResponse>("/discover/movie", {
    params: { with_genres: genreParam, page },
  });
  return response.data;
};
