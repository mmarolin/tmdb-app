import React, { useRef, useState, useEffect } from "react";
import GenreFilter from "./components/genreFilter";
import MovieList from "./components/movieList";
import AppBar from "./components/appBar";
import SearchButton from "./components/searchButton";

const App: React.FC = () => {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [search, setSearch] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [lastSearchedGenres, setLastSearchedGenres] = useState<number[]>([]);
  const [showStickySearch, setShowStickySearch] = useState<boolean>(false);

  const searchButtonRef = useRef<HTMLDivElement | null>(null);

  const toggleGenre = (genreId: number) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  };

  const areGenresChanged = () => {
    if (selectedGenres.length !== lastSearchedGenres.length) return true;
    const sortedCurrent = [...selectedGenres].sort();
    const sortedLast = [...lastSearchedGenres].sort();

    return !sortedCurrent.every((val, index) => val === sortedLast[index]);
  };

  const isSearchEnabled =
    selectedGenres.length === 0
      ? lastSearchedGenres.length > 0
      : areGenresChanged();

  const handleSearch = () => {
    setSearch(true);
    setIsSearching(true);
    setLastSearchedGenres(selectedGenres);
  };

  const handleSearchComplete = () => {
    setSearch(false);
    setIsSearching(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickySearch(!entry.isIntersecting),
      { threshold: 1 }
    );

    if (searchButtonRef.current) observer.observe(searchButtonRef.current);

    return () => {
      if (searchButtonRef.current) observer.unobserve(searchButtonRef.current);
    };
  }, []);

  return (
    <div>
      <AppBar />
      <div className="max-w-7xl xl:mx-auto mx-6">
        <p className="text-2xl my-6 font-semibold">Popular Movies</p>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/5">
            <GenreFilter
              selectedGenres={selectedGenres}
              toggleGenre={toggleGenre}
            />

            <div ref={searchButtonRef} className="mt-5">
              <SearchButton
                onSearch={handleSearch}
                isSearchEnabled={isSearchEnabled}
                isSearching={isSearching}
              />
            </div>
          </div>

          <div className="lg:w-4/5 w-full">
            <MovieList
              selectedGenres={selectedGenres}
              search={search}
              onSearchComplete={handleSearchComplete}
            />
          </div>
        </div>

        {showStickySearch && isSearchEnabled && (
          <SearchButton
            onSearch={handleSearch}
            isSearchEnabled={isSearchEnabled}
            isSearching={isSearching}
            isSticky
          />
        )}
      </div>
    </div>
  );
};

export default App;
