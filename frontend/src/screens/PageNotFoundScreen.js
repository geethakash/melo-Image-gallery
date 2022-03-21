import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFoundScreen() {
  return (
    <div className=" text-blue-400 h-screen flex flex-col justify-center items-center">
      <span className="text-2xl">😞 Page not found!</span>
      <span>
        Stay with{' '}
        <Link to="/" className="text-blue-300 underline underline-offset-4 ">
          Your Memories
        </Link>{' '}
      </span>
    </div>
  );
}

export default PageNotFoundScreen;
