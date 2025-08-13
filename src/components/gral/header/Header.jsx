import { Link } from "react-router-dom"
import { Nav } from "../nav/Nav"
import { useEffect, useState } from "react";
import { IconMenuBurger } from "../../icons/Icons";

export const Header = () => {
  const [openMenu, setOpenMenu] = useState(innerWidth >= 1024);
  const handleClick = () => {
    setOpenMenu(!openMenu)
  }
  useEffect (()=>{
    const handleResize = ()=>{
      setOpenMenu(innerWidth >= 1024)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  },[])
  return (
    <header className="flex justify-between items-center w-full h-17.5 bg-white fixed z-5" style={{ boxShadow: "2px 3px 7px 0 rgba(0,0,0,0.2)" }}>
      <figure onClick={handleClick} className='absolute left-4 cursor-pointer lg:hidden'>
        <IconMenuBurger />
      </figure>
      <Nav openMenu={openMenu} />
      <Link to="/">
        <figure className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-26 
                      lg:left-5 lg:translate-x-0'>
          <img className="w-full h-full" src="../img/gral/logo_mesa.webp" alt="Logo de Mesa Solidaria" />
        </figure>
      </Link>
      
    </header>
  )
}