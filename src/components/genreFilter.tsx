import React, { useEffect, useState } from "react";
import { Genre } from "../types/types";
import { fetchGenres } from "../api";
import { ChevronRight, ExpandMore } from "@mui/icons-material";

interface GenreFilterProps {
  selectedGenres: number[];
  toggleGenre: (genreId: number) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({
  selectedGenres,
  toggleGenre,
}) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const data = await fetchGenres();
        setGenres(data.genres);
      } catch (error) {
        console.error("Failed to load genres", error);
      }
    };

    loadGenres();
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col bg-white border border-gray-200 shadow-cardShadow rounded-lg">
      <div
        className="flex justify-between items-center cursor-pointer p-4"
        onClick={handleToggle}
      >
        <p className="text-lg font-semibold">Filters</p>
        {!isOpen ? <ChevronRight /> : <ExpandMore />}
      </div>

      <div className={`border-t p-4 ${!isOpen ? "hidden" : ""}`}>
        <p className="font-light">Genres</p>
        <div className="gap-2 flex flex-wrap mt-4">
          {genres.map((genre) => {
            const isSelected = selectedGenres.includes(genre.id);
            return (
              <button
                key={genre.id}
                onClick={() => toggleGenre(genre.id)}
                className={`px-3 py-1 rounded-full border text-sm font-medium  
                  ${
                    isSelected
                      ? "bg-customLightBlue text-white border-customLightBlue "
                      : "bg-white text-gray-800 border-gray-500 hover:bg-customLightBlue hover:text-white hover:border-customLightBlue"
                  }`}
              >
                {genre.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GenreFilter;
