import { IconDonate, IconHome, IconJoin, IconKnow, IconNotification, IconProjects } from "../../icons/Icons"
import { Link } from "react-router-dom";

export const Nav = ({ openMenu }) => {
  return (
    <>
      {openMenu && (
        <nav className='absolute top-17.5 bg-primary-l2 w-full 
                        lg:bg-transparent lg:top-0 lg:pr-5'>
          <ul className='flex flex-col lg:flex-row lg:justify-end lg:gap-5 xl:gap-8 gap-4 py-5.5 pl-5.5 tracking-wider 2xl:text-xl'>
            <Link to="/">
              <li style={{ textShadow: "0px 3px 2px rgba(0,0,0,0.2)" }} className='flex justify-between items-center lg:justify-start lg:gap-2 lg:flex-row-reverse text-green-600 uppercase w-46 lg:w-max'>
                Inicio
                <figure>
                  <IconHome />
                </figure>
              </li>
            </Link>
            <Link to="/know">
              <li style={{ textShadow: "0px 3px 2px rgba(0,0,0,0.2)" }} className='flex justify-between items-center lg:justify-start lg:gap-2 lg:flex-row-reverse text-green-600  uppercase w-46 lg:w-max'>
                Conocenos
                <figure>
                  <IconKnow />
                </figure>
              </li>
            </Link>
            <Link to="/projects">
              <li style={{ textShadow: "0px 3px 2px rgba(0,0,0,0.2)" }} className='flex justify-between items-center lg:justify-start lg:gap-2 lg:flex-row-reverse text-green-600  uppercase w-46 lg:w-max'>
                Proyectos
                <figure>
                  <IconProjects />
                </figure>
              </li>
            </Link>
            <Link to="/news">
              <li style={{ textShadow: "0px 3px 2px rgba(0,0,0,0.2)" }} className='flex justify-between items-center lg:justify-start lg:gap-2 lg:flex-row-reverse text-green-600  uppercase w-46 lg:w-max'>
                Noticias
                <figure>
                  <IconNotification />
                </figure>
              </li>
            </Link>
            <Link to="/join">
              <li style={{ textShadow: "0px 3px 2px rgba(0,0,0,0.2)" }} className='flex justify-between items-center lg:justify-start lg:gap-2 lg:flex-row-reverse text-green-600  uppercase w-46 lg:w-max'>
                Sumate
                <figure>
                  <IconJoin />
                </figure>
              </li>
            </Link>
            <Link to="/donate">
              <li style={{ textShadow: "0px 3px 2px rgba(0,0,0,0.2)" }} className='flex justify-between items-center lg:justify-start lg:gap-2 lg:flex-row-reverse text-green-600  uppercase w-46 lg:w-max'>
                Donar
                <figure>
                  <IconDonate />
                </figure>
              </li>
            </Link>
          </ul>
        </nav>
      )}
    </>
  )
}