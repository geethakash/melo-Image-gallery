import { AnimatePresence } from 'framer-motion';
import { ArrowCircleLeft2, Edit2, Menu, Trash } from 'iconsax-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { useIdleTimer } from 'react-idle-timer';
import PrismaZoom from 'react-prismazoom';
import { getImageById } from '../actions/imageActions';
import ImageDeleteScreen from './ImageDeleteScreen';
import ImageRenameScreen from './ImageRenameScreen';
import { addToast } from '../actions/toastActions';
import Spinner from '../components/Spinner';
// import { images } from '../data';

function ImageViewScreen() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState('');

  const { image, error, loading } = useSelector((state) => state.imageDetails);
  const params = useParams();

  const handleClose = () => {
    setIsModalOpen('');
  };
  const timeout = 3000;
  const [remaining, setRemaining] = useState(timeout);
  const [elapsed, setElapsed] = useState(0);
  const [lastActive, setLastActive] = useState(+new Date());
  const [isIdle, setIsIdle] = useState(false);

  const handleOnActive = () => setIsIdle(false);
  const handleOnIdle = () => setIsIdle(true);

  const {
    reset,
    pause,
    resume,
    getRemainingTime,
    getLastActiveTime,
    getElapsedTime,
  } = useIdleTimer({
    timeout,
    onActive: handleOnActive,
    onIdle: handleOnIdle,
  });

  useEffect(() => {
    if (error) {
      navigate('/');
    }
  }, [error, image]);

  useEffect(() => {
    dispatch(getImageById(params.id));
  }, [params.id]);
  useEffect(() => {
    setRemaining(getRemainingTime());
    setLastActive(getLastActiveTime());
    setElapsed(getElapsedTime());

    setInterval(() => {
      setRemaining(getRemainingTime());
      setLastActive(getLastActiveTime());
      setElapsed(getElapsedTime());
    }, 1000);
  }, []);
  return (
    <div className="absolute bg-[#0f172a]  z-40 top-0 w-full h-full flex justify-center items-center ">
      <div
        className={`topbar absolute w-full backdrop-blur-md animate-300 bg-black bg-opacity-20   top-0 p-5 px-5 flex items-center justify-between  text-slate-400 ${
          isIdle ? 'opacity-0' : ''
        }`}
      >
        <div className="flex items-center w-1/2">
          <Link
            to="/"
            className="hover:bg-pink-500 hover:text-gray-100 animate-300 rounded-full"
          >
            <ArrowCircleLeft2 size="30" />
          </Link>
          <span className="ml-5 text-lg truncate lg:w-1/2">
            {image?.caption}
          </span>
        </div>
        <div>
          <button
            onClick={() => setIsModalOpen('rename')}
            className="text-slate-400 ml-3 p-1 rounded ring-2 ring-current hover:bg-slate-500 hover:ring-slate-500 hover:text-white focus:ring-2"
          >
            <Edit2 />
          </button>

          <button
            onClick={() => setIsModalOpen('delete')}
            className="text-red-500 ml-3 p-1 rounded ring-2 ring-current hover:bg-red-500 hover:ring-red-500 hover:text-white focus:ring-2"
          >
            <Trash />
          </button>
        </div>
      </div>
      {loading ? (
        <div className=" text-blue-400 w-full h-full flex flex-col justify-center items-center">
          <div className="w-20 h-20">
            <Spinner />
          </div>
        </div>
      ) : (
        <>
          <div className="block lg:hidden  md:h-auto relative -z-10">
            <PrismaZoom className="">
              <img className="" src={image?.source} />
            </PrismaZoom>
          </div>

          <img className="hidden lg:block h-5/6 w-auto" src={image?.source} />
        </>
      )}

      <AnimatePresence initial={false} exitBeforeEnter={false}>
        {isModalOpen === 'rename' && (
          <ImageRenameScreen handleClose={handleClose} image={image} key="12" />
        )}
        {isModalOpen === 'delete' && (
          <ImageDeleteScreen handleClose={handleClose} key="10" />
        )}

        <Outlet />
      </AnimatePresence>
    </div>
  );
}

export default ImageViewScreen;
