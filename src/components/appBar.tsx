import React from "react";

const AppBar: React.FC = () => {
  return (
    <div className="bg-customDarkBlue h-16 w-full">
      <div className="max-w-7xl mx-auto h-full flex items-center ">
        <div className="lg:flex items-center gap-8 text-white font-semibold hidden">
          <img src="/logo.svg" alt="Logo" className="h-[20px]" />
          <p>Movies</p>
          <p>TV Shows</p>
          <p>People</p>
          <p>More</p>
        </div>
      </div>
    </div>
  );
};

export default AppBar;
