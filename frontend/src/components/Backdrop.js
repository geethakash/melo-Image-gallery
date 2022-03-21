import { motion } from 'framer-motion';
import { Add } from 'iconsax-react';
import React from 'react';
import { Link } from 'react-router-dom';

function Backdrop({ children, onClick }) {
  return (
    <motion.div
      className="backdrop absolute top-0 left-0 h-full w-full bg-black bg-opacity-95 flex justify-center items-center"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Link
        to="/"
        className="absolute z-10 right-0 top-0 m-5 text-red-500 rounded-md ring-2 ring-white hover:ring-red-500  "
      >
        <Add size={32} className="rotate-45" />
      </Link>
      {children}
    </motion.div>
  );
}

export default Backdrop;
