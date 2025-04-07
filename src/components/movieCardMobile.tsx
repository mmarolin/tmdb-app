import React from "react";
import { Movie } from "../types/types";

interface MovieCardProps {
  movie: Movie;
}

const MovieCardMobile: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div
      key={movie.id}
      className="flex rounded-lg overflow-hidden shadow-cardShadow border-gray-200 border bg-white cursor-pointer"
    >
      <div className="overflow-hidden w-28 h-auto flex-shrink-0">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="py-6 px-4 flex flex-col justify-between flex-1">
        <h3 className="tracking-tight font-extrabold hover:text-customLightBlue">
          {movie.title}
        </h3>

        <p className="text-gray-500 text-sm">
          {new Date(movie.release_date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>

        <p className="text-gray-700 text-sm line-clamp-2 mt-2">
          {movie.overview || ""}
        </p>
      </div>
    </div>
  );
};

export default MovieCardMobile;
