import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Masonry from '@mui/lab/Masonry';
import { Box, Container } from '@mui/material';

function FileListAsGrid({ images }) {
  return (
    <>
      {/* <div className="masonry">
        {images.map((image) => (
          <ImageCard image={image} key={image.id} />
        ))}
      </div> */}
      <Container maxWidth="xl" className="mb-10 lg:my-10 lg:mb-20 py-5 lg:py-5">
        <Masonry columns={{ xs: 2, sm: 3, md: 3, lg: 5, xl: 5 }}>
          {images.map((image) => (
            <ImageCard image={image} key={image.id} />
          ))}
        </Masonry>
      </Container>
    </>
  );
}

const ImageCard = ({ image }) => {
  return (
    <div className="group relative bg-slate-600   rounded-md break-inside-avoid">
      <Link to={`/image/${image.id}`}>
        <img className="rounded-md" src={image.source} alt={image.caption} />
        <div
          className={`w-full p-3 rounded-md  text-white truncate  absolute bottom-0 group-hover:opacity-100 opacity-0 duration-500  bg-gradient-to-t from-gray-800 `}
        >
          <span className="font-bold text-blue-200" title={image.caption}>
            {image.caption}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default FileListAsGrid;
