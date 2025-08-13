import { IconAdministrator, IconAvatar, IconLogout, IconHome, IconNotification, IconProjects } from "../../icons/Icons"
import { Link, useNavigate } from "react-router-dom";
import { Text } from "../texts/Text";
import { AuthService } from "@/service/AuthService";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export const NavAdm = ({ openMenu }) => {
  const navigate = useNavigate();
  const [decodedToken, setDecodedToken] = useState(null);
  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setDecodedToken(decoded);
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        setDecodedToken(null);
      }
    }
  }, []);
  const handleLogout = () => {
    AuthService.logoutManager(AuthService.getToken())
      .then(() => {
        AuthService.removeToken();
        navigate('/login');
      })
      .catch(error => {
        console.error("Error al cerrar sesión en el backend:", error);
        AuthService.removeToken();
        navigate('/login');
      });
  };

  return (
    <>
      {openMenu && (
        <>
          <nav className='absolute top-17.5 bg-gray-accent-light-2 w-full h-[calc(100vh-70px)] md:w-3/10 lg:w-65'>
            <section className="bg-primary flex justify-evenly items-center py-5">
              <figure>
                <IconAvatar />
              </figure>
              <Text
                text_size={"text-xl"}
                text_position={"text-right"}
                width={"w-1/3 md:w-1/2"}
                margin_x={"mx-0"}
                margin_y={"my-0"}
                text_case={"capitalize"}
              >
                {/* ¡Hola! {decodedToken.name} {decodedToken.lastName} */}
                ¡Hola Claudia Caballero!
              </Text>
            </section>
            <ul className='flex flex-col gap-4 py-5.5 pl-5.5 tracking-wider'>
              <Link to="/panelAdministration">
                <li style={{ textShadow: "0px 3px 2px rgba(0,0,0,0.2)" }} className='flex justify-between items-center text-white uppercase w-46'>
                  Inicio
                  <figure>
                    <IconHome />
                  </figure>
                </li>
              </Link>
              <Link to="/panelAdministration/news">
                <li style={{ textShadow: "0px 3px 2px rgba(0,0,0,0.2)" }} className='flex justify-between items-center text-white uppercase w-46'>
                  Noticias
                  <figure>
                    <IconNotification />
                  </figure>
                </li>
              </Link>
              <Link to="/panelAdministration/projects">
                <li style={{ textShadow: "0px 3px 2px rgba(0,0,0,0.2)" }} className='flex justify-between items-center text-white  uppercase w-46'>
                  Proyectos
                  <figure>
                    <IconProjects />
                  </figure>
                </li>
              </Link>
              <Link to="/panelAdministration/managers">
                <li style={{ textShadow: "0px 3px 2px rgba(0,0,0,0.2)" }} className='flex justify-between items-center text-white  uppercase w-46'>
                  Administradores
                  <figure>
                    <IconAdministrator />
                  </figure>
                </li>
              </Link>
              <Link to="/login" onClick={handleLogout}>
                <li style={{ textShadow: "0px 3px 2px rgba(0,0,0,0.2)" }} className='flex justify-between items-center text-white uppercase w-46 absolute bottom-5'>
                  Cerrar Sesión
                  <figure>
                    <IconLogout />
                  </figure>
                </li>
              </Link>
            </ul>
          </nav>
        </>
      )}
    </>
  )
}