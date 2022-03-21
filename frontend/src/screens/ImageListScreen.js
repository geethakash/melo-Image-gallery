import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, Route, Router, Routes, useNavigate } from 'react-router-dom';
import { getImages } from '../actions/imageActions';
import FileListAsGrid from '../components/FileListAsGrid';
import FileListAsGridLeft from '../components/FileListAsGridLeft';
import ImageUploader from './ImageUploadScreen';
import UploadButton from '../components/UploadButton';
import Spinner from '../components/Spinner';
import { addToast } from '../actions/toastActions';

function FileListScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstVisit, setFirstVisit] = useState(false);
  const [imagesCount, setImagesCount] = useState(null);
  const { images, error, loading } = useSelector((state) => state.images);
  const { userInfo } = useSelector((state) => state.userLogin);
  useEffect(() => {
    if (userInfo?.token) {
      dispatch(getImages());
    } else {
      dispatch(addToast('info', 'You Should Login First!'));
      navigate('/user/login');
    }
  }, []);

  useEffect(() => {
    setImagesCount(images?.length);
  }, [images]);

  return (
    <>
      <UploadButton />

      {loading ? (
        <div className=" text-blue-400 w-full h-full flex flex-col justify-center items-center">
          <div className="w-20 h-20">
            <Spinner />
          </div>
        </div>
      ) : images ? (
        <>
          {imagesCount === 0 ? (
            <div className=" text-blue-400 h-screen text-center flex flex-col justify-center items-center">
              <span className="text-2xl">No memories were found!</span>
              <p>🤗 Add some memories Using button on bottom right corner.</p>
            </div>
          ) : (
            <FileListAsGrid images={images} />
          )}
        </>
      ) : error ? (
        <div className=" text-red-400 h-screen flex flex-col justify-center items-center">
          <span className="text-2xl">🥺 Error</span>
          <span>{error}</span>
        </div>
      ) : (
        ''
      )}
      <Outlet />
    </>
  );
}

export default FileListScreen;

{
  /*  */
}
