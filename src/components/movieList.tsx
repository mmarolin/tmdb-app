import React, { useEffect, useState } from "react";

import { Movie } from "../types/types";
import { fetchMovies } from "../api";
import MovieCard from "./movieCard";
import MovieCardMobile from "./movieCardMobile";

interface MovieListProps {
  selectedGenres: number[];
  search: boolean;
  onSearchComplete: () => void;
}

const MovieList: React.FC<MovieListProps> = ({
  selectedGenres,
  search,
  onSearchComplete,
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const loadMovies = async (genres: number[], pageNum: number) => {
    try {
      setLoading(true);
      setError("");

      const data = await fetchMovies(genres, pageNum);

      const newMovies =
        pageNum === 1 ? data.results : [...movies, ...data.results];
      setMovies(newMovies);
    } catch (err) {
      setError("Failed to load movies. Please try again.");
    } finally {
      setLoading(false);
      onSearchComplete();
    }
  };
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setPage(1);
    loadMovies(selectedGenres, 1);
  }, [search]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadMovies(selectedGenres, nextPage);
  };

  return (
    <div className="">
      {error && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => {
          if (windowWidth >= 640) {
            return <MovieCard movie={movie} key={movie.id} />;
          } else {
            return <MovieCardMobile movie={movie} key={movie.id} />;
          }
        })}
      </div>

      {movies.length >= 0 && (
        <div className="flex justify-center my-6">
          <button
            disabled={loading}
            onClick={handleLoadMore}
            className="w-full py-2 bg-customLightBlue text-white rounded-lg hover:text-customDarkBlue text-2xl font-bold transition "
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieList;
