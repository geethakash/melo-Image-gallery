import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Backdrop from '../components/Backdrop';
import { register } from '../actions/userActions';
import { Add } from 'iconsax-react';
import { addToast } from '../actions/toastActions';

function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  let location = useLocation();
  const navigate = useNavigate();
  let history = window.history;

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, error } = useSelector((state) => state.userRegister);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [history, userInfo]);

  const submitHandler = () => {
    if (password === confirmPassword) {
      dispatch(register(name, email, password));
    } else {
      dispatch(addToast('error', "Password doesn't match!"));
    }
  };

  return (
    <div className="absolute top-0 left-0 h-full w-full bg-black bg-opacity-95 flex flex-col justify-center items-center">
      <Link
        to="/"
        className="absolute z-10 right-0 top-0 m-5 text-red-500 rounded-md ring-2 ring-white hover:ring-red-500  "
      >
        <Add size={32} className="rotate-45" />
      </Link>
      {loading && (
        <div className="absolute flex h-full  w-full items-center justify-center backdrop-blur">
          <div className="h-20 w-20">
            <Spinner />
          </div>
        </div>
      )}

      <div className="flex h-[90%]  w-full items-center justify-center p-3">
        <form
          method="post"
          autoComplete="off"
          className=" w-full rounded   border-2 border-gray-600 px-5 pt-8 lg:w-1/3 bg-gray-900"
          onSubmit={(e) => {
            e.preventDefault();
            submitHandler();
          }}
        >
          <h4 className="mb-10 text-center text-2xl font-bold text-slate-600 dark:text-slate-300 ">
            Create Account
          </h4>
          {error && (
            <h6 className="mb-5 rounded bg-red-500 p-2 text-slate-200">
              {error}
            </h6>
          )}
          <div className="group relative  z-0 mb-6 w-full">
            <input
              type="name"
              name="floating_name"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 outline-none autofill:bg-none focus:border-purple-600 focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-purple-500"
              placeholder=" "
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label
              htmlFor="floating_name"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-purple-600 dark:text-gray-400 peer-focus:dark:text-purple-500"
            >
              Name
            </label>
          </div>
          <div className="group relative  z-0 mb-6 w-full">
            <input
              type="email"
              name="floating_email"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 outline-none autofill:bg-none focus:border-purple-600 focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-purple-500"
              placeholder=" "
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              htmlFor="floating_email"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-purple-600 dark:text-gray-400 peer-focus:dark:text-purple-500"
            >
              Email
            </label>
          </div>
          <div className="group relative z-0 mb-6 w-full">
            <input
              type="password"
              name="floating_password"
              id="floating_password"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 outline-none focus:border-purple-600 focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-purple-500"
              placeholder=" "
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label
              htmlFor="floating_password"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-purple-600 dark:text-gray-400 peer-focus:dark:text-purple-500"
            >
              Password
            </label>
          </div>
          <div className="group relative z-0 mb-6 w-full">
            <input
              type="password"
              name="floating_confirm_password"
              id="floating_confirm_password"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 outline-none focus:border-purple-600 focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-purple-500"
              placeholder=" "
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label
              htmlFor="floating_confirm_password"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-purple-600 dark:text-gray-400 peer-focus:dark:text-purple-500"
            >
              Confirm Password
            </label>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-purple-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 sm:w-auto"
          >
            Create Account
          </button>
          <p className="py-5 text-slate-400 text-center">
            Already Have An Account?{' '}
            <Link to="/user/login" className="text-slate-200 underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterScreen;
