import React from "react";

interface SearchButtonProps {
  onSearch: () => void;
  isSearchEnabled: boolean;
  isSearching: boolean;
  buttonRef?: React.RefObject<HTMLDivElement>;
  isSticky?: boolean;
}

const SearchButton: React.FC<SearchButtonProps> = ({
  onSearch,
  isSearchEnabled,
  isSearching,
  buttonRef,
  isSticky = false,
}) => {
  const isDisabled = !isSearchEnabled || isSearching;

  const baseStyle = `w-full py-3 font-bold transition text-lg  ${
    isSticky
      ? "fixed bottom-0 left-0 right-0 z-50 border-t shadow-lg"
      : "px-4 rounded-full tracking-wider"
  }`;

  const activeStyle = isDisabled
    ? "bg-gray-200 text-gray-500"
    : "bg-customLightBlue text-white border-none hover:bg-customDarkBlue";

  return (
    <div ref={buttonRef} className={!isSticky ? "mt-6" : ""}>
      <button
        onClick={onSearch}
        disabled={isDisabled}
        className={`${baseStyle} ${activeStyle}`}
      >
        {isSearching ? "Searching..." : "Search"}
      </button>
    </div>
  );
};

export default SearchButton;
