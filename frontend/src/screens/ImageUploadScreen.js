import { motion, AnimatePresence } from 'framer-motion';
import { Add, GalleryExport } from 'iconsax-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getImages } from '../actions/imageActions';
import { addToast } from '../actions/toastActions';

function ImageUploader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const { userInfo } = useSelector((state) => state.userLogin);
  const [isUploading, setIsUploading] = useState();

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles]);
      setIsDragOver(false);
    },
    onDragOver: () => setIsDragOver(true),
    onDragLeave: () => setIsDragOver(false),
  });

  const handleSubmit = async (image) => {
    // addProgressToFile();
    setIsUploading(true);
    files.forEach(async (file, index) => {
      try {
        let newFiles = [...files];
        const formData = new FormData();
        formData.append('image', file);
        formData.append('caption', file.name);
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.token}`,
          },
          onUploadProgress: function (progressEvent) {
            newFiles[index].progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setFiles([...newFiles]);
          },
        };
        const { data } = await axios.post(
          '/api/images/upload/',
          formData,
          config
        );
        dispatch(addToast('success', data.detail));
        dispatch(getImages());
      } catch (error) {
        dispatch(
          addToast(
            'error',
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message
          )
        );
      }
    });
    setIsUploading(false);
    dispatch(addToast('info', 'Your new Memories adding in progress'));
    setTimeout(() => {
      dispatch(getImages());
      navigate('/');
    }, 2000);
  };

  // const addProgressToFile = () => {
  //   let newFiles = files;
  //   newFiles.forEach((file) => {
  //     file.progress = 1;
  //   });
  //   setFiles(newFiles);
  // };

  return (
    <AnimatePresence initial={true} exitBeforeEnter={true}>
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
        className="absolute z-40  w-screen h-screen flex flex-col lg:justify-center pt-20 lg:pt-0 items-center  bg-black bg-opacity-80  bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 "
      >
        <Link
          to="/"
          className="absolute z-10 right-0 top-0 m-5 text-red-500 rounded-md ring-2 ring-white hover:ring-red-500  "
        >
          <Add size={32} className="rotate-45" />
        </Link>

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
          className="w-11/12 md:w-4/12 2xl:w-3/12 bg-slate-900 py-3 rounded-lg"
        >
          <div className="px-3 mb-3">
            <h1 className="text-slate-300 my-2 text-lg font-bold ">
              Upload Images
            </h1>
            <div
              {...getRootProps()}
              className={`w-full  border-dashed border-2 transition-all duration-300  h-36  text-slate-400 text-center flex flex-col justify-center  items-center group ${
                isDragOver ? 'border-indigo-300 ' : 'border-indigo-500 '
              }`}
            >
              <GalleryExport className="my-2" size="32" />
              <span>
                {isDragOver
                  ? 'Drop Here.'
                  : "Drag 'n' drop images here, or click to select."}
              </span>
              <input {...getInputProps()} type="file" className="hidden" />
            </div>
          </div>

          <div className="overflow-auto max-h-[50vh] px-3">
            {isUploading && (
              <div className="w-full mb-3  flex justify-center items-center">
                <div className="w-2/12 aspect-square">
                  <Spinner />
                </div>
              </div>
            )}
            {!files.length ? (
              <p className="text-slate-300 my-2 mx-2">
                Select files to display in here.
              </p>
            ) : (
              files.map((image, index) => (
                <UploadingItem image={image} key={index} />
              ))
            )}
          </div>
          <div className="w-full px-3">
            <button
              hidden={!files.length}
              onClick={handleSubmit}
              className="py-1 text-center bg-indigo-600 hover:bg-indigo-500 text-gray-300 hover:shadow-xl rounded w-full"
            >
              Upload
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

const UploadingItem = ({ image }) => {
  const [progress, setProgress] = useState(31);

  return (
    <div className="w-full max-h-20 mb-2 bg-gray-800 flex flex-row rounded-md">
      <div className="w-2/12  relative overflow-hidden">
        <img
          src={URL.createObjectURL(image)}
          alt="img"
          className="rounded-l-md absolute top-[-9000px] left-[-9000px] right-[-9000px] bottom-[-9000px] m-auto w-full h-auto px-1"
        />
      </div>
      <div className="w-8/12 px-2 py-1">
        <p className=" truncate text-slate-400 text-xs">{image.name}</p>

        <div className=" my-2 11/12 bg-indigo-900 h-1 rounded-xl">
          <div className={`h-full bg-indigo-500 rounded-xl`}></div>
        </div>
      </div>
    </div>
  );
};
export default ImageUploader;
