import { motion } from 'framer-motion';
import { GalleryExport } from 'iconsax-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { logout } from '../actions/userActions';
import Spinner from './Spinner';
import axios from 'axios';
import { addToast } from '../actions/toastActions';

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [image, setImage] = useState(
    'https://img.icons8.com/external-justicon-flat-justicon/64/000000/external-couple-romantic-love-justicon-flat-justicon-1.png'
  );
  const [isUploading, setIsUploading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (acceptedFiles) => {
      setIsUploading(true);
      try {
        let formData = new FormData();
        formData.append('image', acceptedFiles[0]);
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.post(
          '/api/users/avatar/upload/',
          formData,
          config
        );
        dispatch(addToast('success', data.detail));
        setIsUploading(false);
        setImage(data.avatar);
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
    },
    onDragOver: () => {},
    onDragLeave: () => {},
  });

  const getAvatar = async () => {
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get('/api/users/avatar', config);
    setImage(data.avatar);
  };

  useEffect(() => {
    getAvatar();
  }, []);

  useEffect(() => {
    if (!userInfo?.token) {
      navigate('/');
    }
  }, [userInfo]);

  if (location.pathname !== '/image/:id') {
    return (
      <nav className="navbar  transition-all duration-200 bg-gray-800  w-full z-30">
        <div className="flex flex-row justify-between items-center w-full h-full px-5 py-2 max-w-[1900px]">
          <Link to="/">
            <h1 className="font-bold text-2xl text-pink-600 md:hidden">Melo</h1>
            <h1 className="font-bold text-2xl text-pink-600 md:block hidden">
              Memories of Love
            </h1>
            {/* <span>Stay your Memories</span> */}
          </Link>
          <div className="relative flex">
            <button
              href="#"
              className=" group"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            >
              <img
                className="w-10 rounded-full   border-2 hover:shadow-lg "
                src={image}
                alt="avatar"
              />
            </button>
            <div
              className={`absolute z-30 w-[70vw]  md:w-[300px] shadow-xl bg-slate-700 pt-10 pb-5  flex flex-col rounded-lg  items-center  transition-all duration-300 text-white ${
                isUserMenuOpen
                  ? 'opacity-100 scale-100 translate-y-10 -translate-x-full '
                  : '-translate-y-1/2 -translate-x-1/2 opacity-0 scale-0'
              }   `}
            >
              <div className="w-24 h-24 relative group">
                {!isUploading ? (
                  <div {...getRootProps()}>
                    <img
                      className=" rounded-full  w-full h-full border-4"
                      src={image}
                      alt="avatar"
                    />
                    <div className="opacity-0 border-4 group-hover:opacity-100 transition-all duration-300 absolute w-full h-full top-0 left-0 bg-black bg-opacity-80 rounded-full flex flex-col justify-center items-center">
                      <GalleryExport size={34} />
                      <p>Change</p>
                    </div>
                    <input
                      {...getInputProps()}
                      type="file"
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full top-0">
                    <Spinner />
                  </div>
                )}
              </div>

              <div>
                <p className="pt-4  truncate">Name :{userInfo?.name}</p>
                <p className="pt-2  truncate">Email :{userInfo?.email}</p>
              </div>

              <div className="pt-5 relative">
                <button
                  className="px-2 py-1 bg-purple-600 rounded-lg  hover:bg-slate-300 hover:text-purple-900"
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  } else {
    return <></>;
  }
}

export default NavBar;
