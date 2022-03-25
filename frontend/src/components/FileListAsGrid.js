import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Masonry from '@mui/lab/Masonry';
import { Box, Container } from '@mui/material';
import { useInView } from 'react-intersection-observer';

function FileListAsGrid({ images }) {
  const [currentLoadedImages, setCurrentLoadedImages] = useState(
    images.slice(0, 20)
  );
  const [isLoaded, setIsLoaded] = useState(false);

  const { ref: loader, inView, entry } = useInView({});
  useEffect(() => {
    if (inView) {
      // setIsLoaded(true);
      setCurrentLoadedImages([
        ...currentLoadedImages,
        ...images.slice(
          currentLoadedImages.length,
          currentLoadedImages.length + 10
        ),
      ]);
    }
  }, [inView]);

  //
  return (
    <>
      <div className="columns-2 sm:columns-3 xl:columns-4 2xl:columns-5 gap-3 px-3  p-10 pt-8 xl:px-10  mx-auto space-y-3 ">
        {currentLoadedImages.map((image, index) => (
          <ImageCard image={image} key={image.id} index={index} />
        ))}
      </div>
      <div className="h-24" ref={loader}>
        <div className="w-14 h-14"></div>
      </div>

      {/* <Container maxWidth="xl" className="mb-10 lg:my-10 lg:mb-20 py-5 lg:py-5">
        <Masonry
          columns={{ xs: 2, sm: 3, md: 3, lg: 5, xl: 5 }}
          className="min-h-[100vh]"
        >
          {currentLoadedImages.map((image) => (
            <ImageCard image={image} key={image.id} />
          ))}
        </Masonry>

        <div className="" ref={loader}>
          <div className="w-14 h-14"></div>
        </div>
      </Container> */}
    </>
  );
}

const ImageCard = ({ image, index }) => {
  const [imageUrl, setImageUrl] = useState('');
  const { ref: imageRef, inView, entry } = useInView({ triggerOnce: true });
  useEffect(() => {
    if (!imageUrl) {
      setImageUrl(image.source);
    }
  }, [inView]);
  return (
    <div
      ref={imageRef}
      className={`group relative bg-slate-600 duration-500 transition-all rounded-md break-inside-avoid ${
        inView ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <Link to={`/image/${image.id}`}>
        <img className="rounded-md" alt="image" src={imageUrl} />
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

//  order-[${(index % 4) + 1}]
