import React from 'react';
import {
  Routes,
  Route,
  HashRouter as Router,
  Navigate,
  Outlet,
} from 'react-router-dom';
import NavBar from './components/NavBar';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import ImageListScreen from './screens/ImageListScreen';
import ImageViewScreen from './screens/ImageViewScreen';
import PageNotFoundScreen from './screens/PageNotFoundScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ImageDeleteScreen from './screens/ImageDeleteScreen';
import ImageRenameScreen from './screens/ImageRenameScreen';
import ImageUploadScreen from './screens/ImageUploadScreen';
import ToastContainer from './components/ToastContainer';

function App() {
  return (
    <div className=" bg-[#0f172a]   overflow-hidden w-100 h-screen  ">
      <ToastContainer />

      <Router>
        <NavBar />

        <div className="overflow-auto h-full">
          <Routes>
            <Route exact path="/" element={<ImageListScreen />}>
              <Route path="image/:id" element={<ImageViewScreen />}>
                <Route path="rename" element={<ImageRenameScreen />} />
                <Route path="delete" element={<ImageDeleteScreen />} />
              </Route>
              <Route path="upload" element={<ImageUploadScreen />} />
            </Route>
            <Route path="user/login" element={<LoginScreen />} />
            <Route path="user/register" element={<RegisterScreen />} />
            <Route path="*" element={<PageNotFoundScreen />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
