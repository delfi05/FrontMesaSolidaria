import { IconMenuBurger } from "@/components/icons/Icons";
import { useState } from "react";
import { NavAdm } from "../nav/NavAdm";

export const HeaderAdm = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const handleClickMenu = () => {
    setOpenMenu(!openMenu)
  }

  return (
    <header className="flex justify-between items-center w-full h-17.5 bg-gray-accent-light-2 fixed z-5">
      <figure onClick={handleClickMenu} className='absolute left-4 cursor-pointer'>
        <IconMenuBurger />
      </figure>
      <NavAdm openMenu={openMenu} />
      <figure className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-26'>
        <img className="w-full h-full" src="../img/gral/logo_mesa.webp" alt="Logo de Mesa Solidaria" />
      </figure>
    </header>
  )
}