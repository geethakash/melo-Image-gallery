import { Danger, Edit2 } from 'iconsax-react';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { renameImage, getImages, getImageById } from '../actions/imageActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ImageRenameScreen({ image, handleClose }) {
  const [caption, setCaption] = useState(image.caption);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeCaptionHandler = () => {
    dispatch(renameImage(image.id, caption));
    handleClose();
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
        className="w-11/12 md:w-1/2 lg:w-1/4 flex flex-col items-center item-center bg-gray-900 py-5 rounded-lg text-slate-400 p-5"
      >
        <h4 className="font-bold text-3xl text-teal-500">Change Caption</h4>
        <div className="w-2/12 text-teal-500 my-2">
          <Edit2 className="w-full h-full py-2" />
        </div>
        <div className="group relative z-0  w-full mb-2">
          <input
            type="text"
            name="floating_caption"
            className="peer px-1 block w-full appearance-none border-0 border-b-2 border-gray-300 text-slate-300 bg-transparent py-2.5 text-sm  outline-none autofill:bg-none focus:border-teal-600 focus:ring-0 dark:border-gray-600  dark:focus:border-teal-500"
            placeholder=" "
            required
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <label
            htmlFor="floating_caption"
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-teal-600 dark:text-gray-400 peer-focus:dark:text-teal-500"
          >
            Caption
          </label>
        </div>
        <div className="pt-3 w-full flex flex-row justify-center items-center">
          <button
            onClick={handleClose}
            className="m-2 py-1 px-2 text-center w-1/2 border rounded border-slate-500 hover:bg-slate-500 hover:text-gray-900"
          >
            Cancel
          </button>
          <button
            onClick={changeCaptionHandler}
            className="m-2 py-1 px-2 text-center w-1/2 border rounded border-green-500 text-green-500 hover:bg-green-500 hover:text-gray-900"
          >
            Change
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ImageRenameScreen;
