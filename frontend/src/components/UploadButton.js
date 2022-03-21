import { GalleryAdd } from 'iconsax-react';
import React from 'react';
import { Link } from 'react-router-dom';

function UploadButton() {
  return (
    <div className="fixed bottom-6 right-6 lg:bottom-6 lg:right-14 z-30">
      <Link
        to="/upload"
        className="group flex justify-center w-12 h-12 animate-300 hover:bg-pink-300 hover:text-pink-600 items-center shadow-xl  text-pink-200 font-bold text-3xl rounded-full bg-pink-500 hover"
      >
        <GalleryAdd className="w-3/6 h-3/6 " />

        <span className="absolute animate-300 text-xs text-pink-300  bg-slate-700  opacity-0 scale-0 rounded-lg p-1 group-hover:scale-100 group-hover:opacity-100 group-hover:-translate-y-14">
          Add image
        </span>
      </Link>
    </div>
  );
}

export default UploadButton;
