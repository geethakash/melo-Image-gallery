import { Danger } from 'iconsax-react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { deleteImage } from '../actions/imageActions';

function ImageDeleteScreen({ handleClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { success } = useSelector((state) => state.imageDelete);
  const params = useParams();
  const imageDeleteHandler = () => {
    dispatch(deleteImage(params.id));
    navigate('/');
  };
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{
        opacity: 1,
        transition: {
          duration: 2000,
          type: 'spring',
          damping: 25,
          stiffness: 500,
        },
      }}
      exit={{ opacity: 0 }}
      className="w-full h-full absolute top-0 left-0 flex justify-center items-center bg-black bg-opacity-90"
    >
      <motion.div
        initial={{ y: '-100vh' }}
        animate={{
          y: '0',
          opacity: 1,
          transition: {
            duration: 0.1,
            type: 'spring',
            damping: 25,
            stiffness: 500,
          },
        }}
        exit={{ opacity: 0, y: '-100vh' }}
        className="w-10/12 md:w-1/2 lg:w-auto flex flex-col items-center item-center bg-gray-900 py-5 rounded-lg text-slate-400 p-5"
      >
        <h4 className="font-bold text-3xl text-red-500">Are You sure?</h4>
        <div className="w-2/12 text-red-500">
          <Danger className="w-full h-full py-2" />
        </div>
        <p>Do you really want to delete this Memory?</p>
        <div className="pt-3 w-full flex flex-row justify-center items-center">
          <button
            onClick={handleClose}
            className="m-2 py-1 px-2 text-center w-1/2 border rounded border-slate-500 hover:bg-slate-500 hover:text-gray-900"
          >
            Cancel
          </button>
          <button
            onClick={imageDeleteHandler}
            className="m-2 py-1 px-2 text-center w-1/2 border rounded border-red-500 text-red-500 hover:bg-red-500 hover:text-gray-900"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ImageDeleteScreen;
