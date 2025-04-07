import React from "react";
import { Movie } from "../types/types";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const votePercentage = Math.round(movie.vote_average * 10);

  const radius = 28;
  const circumference = 2 * 3.14 * radius;
  const strokeDashoffset =
    circumference - (circumference * votePercentage) / 100;

  let strokeColor = "#4CAF50";
  if (votePercentage < 40) {
    strokeColor = "#F44336";
  } else if (votePercentage < 70) {
    strokeColor = "#FFEB3B";
  }

  return (
    <div
      key={movie.id}
      className="relative rounded-lg overflow-hidden shadow-cardShadow border-gray-200 border bg-white cursor-pointer"
    >
      <div className="relative w-full">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full object-obtain"
        />

        <div className="absolute bottom-2 left-7 transform -translate-x-1/2 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold ">
          <svg
            className="absolute left-5 transform -translate-x-1/2"
            width="34"
            height="34"
            viewBox="0 0 60 60"
          >
            <circle
              cx="30"
              cy="30"
              r={radius}
              stroke={`${strokeColor}3A`}
              strokeWidth="4"
              fill="none"
            />

            <circle
              cx="30"
              cy="30"
              r={radius}
              stroke={strokeColor}
              strokeWidth="4"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{
                transform: "rotate(-90deg)",
                transformOrigin: "50% 50%",
              }}
            />
          </svg>
          <p className="text-sm">
            {votePercentage !== 0 ? votePercentage : "NR"}
          </p>
        </div>
      </div>

      <div className="p-2 ">
        <h3 className="tracking-tight font-extrabold hover:text-customLightBlue">
          {movie.title}
        </h3>
        <p className="text-gray-500">
          {new Date(movie.release_date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
