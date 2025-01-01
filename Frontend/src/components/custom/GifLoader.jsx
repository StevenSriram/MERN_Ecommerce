import React from "react";
import loaderGif from "../../assets/lazyLoader.gif";

const GifLoader = () => {
  return (
    <div className="min-h-screen w-full grid place-items-center">
      <img src={loaderGif} />
    </div>
  );
};

export default GifLoader;
