import logo from "../assets/logo.png";
import menuGrey from "../assets/menu-grey.png";
import menuWhite from "../assets/menu-white.png";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import HomePage from "./HomePage";
import TagPage from "./TagPage";
import { useState } from "react";
import useWindowResize from "../utils/windowResize";

const Navbar = ({ screenWidth }: any) => {
  const [home, setHome] = useState(true);
  const [tags, setTags] = useState(false);

  return (
    <>
      { screenWidth > 640 ?
        <div className="flex flex-col items-center w-20 bg-[#1B1B1B] h-screen">
          <Link to="/" onClick={() => { setHome(true); setTags(false); }}>
            <div className="flex w-full items-center justify-center h-[88px] p-2 cursor-pointer">
              <img src={logo} width={35} height={15} alt="logo" />
            </div>
          </Link>
          <Link to="/" onClick={() => { setHome(true); setTags(false); }}>
            <div className="flex flex-col items-center justify-center p-2 cursor-pointer">
              <img src={home ? menuWhite : menuGrey} width={24} height={24} alt="home" />
              <span className="text-white text-xs">Home</span>
            </div>
          </Link>
          <Link to="/tag" onClick={() => { setHome(false); setTags(true); }}>
            <div className="flex flex-col items-center justify-center p-2 cursor-pointer">
              <img src={tags ? menuWhite : menuGrey} width={24} height={24} alt="tags" />
              <span className="text-white text-xs">Tags</span>
            </div>
          </Link>
        </div> :
        <div className="flex flex-row items-center justify-center w-full bg-[#1B1B1B] h-20 fixed bottom-0">
          <Link to="/" onClick={() => { setHome(true); setTags(false); }}>
            <div className="flex flex-col items-center justify-center p-2 cursor-pointer">
              <img src={home ? menuWhite : menuGrey} width={24} height={24} alt="home" />
              <span className="text-white text-xs">Home</span>
            </div>
          </Link>
          <Link to="/tag" onClick={() => { setHome(false); setTags(true); }}>
            <div className="flex flex-col items-center justify-center p-2 cursor-pointer">
              <img src={tags ? menuWhite : menuGrey} width={24} height={24} alt="tags" />
              <span className="text-white text-xs">Tags</span>
            </div>
          </Link>
        </div>
      }
    </>
  )
}

const LogoPhone = () => {
  return (
    <div className="flex w-full bg-[#1B1B1B] h-20">
      <div className="flex w-full items-center h-[70px] px-5 py-1 cursor-pointer">
        <img src={logo} width={35} height={15} alt="logo" />
      </div>
    </div>
  )
}

export default function ExamCompTwo() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  function handleResize() {
      setScreenWidth(window.innerWidth);
  }

  useWindowResize(handleResize);
  
  return (
    <>
      <div className="flex flex-col md:flex-row">
        {screenWidth > 640 ? <Navbar screenWidth={screenWidth} /> : <LogoPhone />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tag" element={<TagPage />} />
        </Routes>
      </div>
      {screenWidth <= 640 && <Navbar screenWidth={screenWidth} />}
    </>
  )
}