import { Button } from '@/components/gral/buttons/Button'
import { Image } from '@/components/gral/images/Image'
import { Input } from '@/components/gral/inputs/Input'
import { Text } from '@/components/gral/texts/Text'
import { IconEyesOff, IconEyesOn } from '@/components/icons/Icons'
import { AuthService } from '@/service/AuthService'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const [manager, setManager] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleForgotPasswordClick = () => {
    setShowModal(true);
    setError('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmitForgotPassword = async () => {
    try {
      const response = await AuthService.forgotPassword(manager);
      setError('Corrobora tu correo para recuperar la contraseña.');
      setShowModal(false); // Cerrar el modal después del éxito
      console.log('Respuesta del backend:', response.data);
    } catch (error) {
      console.log(error);      
      setError('Error, el correo no esta registrado. Intente nuevamente con otro correo\n');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setManager(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClickForm = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const response = await AuthService.loginManager(manager);
      const token = response.data;
      AuthService.setToken(token);
      navigate('/panelAdministration');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Credenciales inválidas. Por favor, inténtalo de nuevo.');
    }
  };

  const handleViewPassword = () => {
    setViewPassword(!viewPassword)
  }

  return (
    <>
      <header className='h-1/10 pt-3'>
        <Image
          image={"../img/gral/logo_mesa.webp"}
          altImage={"Logo de Mesa Solidaria"}
          width={"w-27"}
        />
      </header>

      <main className="bg-[url(../img/donate/titlepage_donate.webp)] bg-no-repeat bg-bottom bg-contain
                      flex items-center h-9/10 min-h-[calc(100vh-65px)]" style={{ marginBottom: 0, paddingTop: 0 }}>
        <section className='w-8/10 sm:w-1/2 lg:w-1/3 mx-auto rounded-2xl bg-white' style={{ boxShadow: "2px 3px 7px 0 rgba(0,0,0,0.2)" }}>
          {!showModal && (
            <section className='bg-primary py-3 rounded-t-2xl'>
              <Text
                color_children={"text-white"}
                text_size={"lg:text-xl"}
              >
                PANEL DE ADMINISTRACION
              </Text>
            </section>
          )}
          {!showModal ? (
            <form className='w-full flex flex-col justify-center items-center gap-2.5 py-5 px-3 
                           sm:gap-3 md:gap-3 lg:gap-4'
              onSubmit={handleClickForm}
            >
              <Input
                py={"py-2 md:py-3"}
                px={"px-2 md:px-3"}
                text_size={"text-xs sm:text-sm md:text-base"}
                text_label={"Email"}
                value={manager.email}
                onChange={handleChange}
                type="email" placeholder="John@example.com" name="email" autoComplete="on" required />
              <Input
                py={"py-2 md:py-3"}
                px={"px-2 md:px-3"}
                text_size={"text-xs sm:text-sm md:text-base"}
                text_label={"Contraseña"}
                icon={viewPassword ? <IconEyesOn /> : <IconEyesOff />}
                value={manager.password}
                onChange={handleChange}
                onClick={handleViewPassword}
                type={viewPassword ? "text" : "password"} placeholder="********" name="password" autoComplete="on" required />
              {error && <Text color_children={"text-red-500"} text_size={"text-sm"}>{error}</Text>}
              <Button
                bg_color={"bg-primary"}
                hover_bg={"hover:bg-primary-l1"}
                margin_y={"my-0 mt-2"}
                px={"px-7 md:px-8 lg:px-10"}
                py={"py-2 md:py-3"}
                text_size={"text-xs md:text-sm lg:text-base"}
                type={"submit"}
              >
                Iniciar sesión
              </Button>
              <section>
                <Text
                  color_children={"text-blue-500"}
                  text_size={"text-sm xl:text-base"}
                  text_position={"text-left"}
                  text_case={"hover:underline cursor-pointer"}
                  onClick={handleForgotPasswordClick}
                >
                  ¿Olvidaste la contraseña?
                </Text>
              </section>
            </form>
          ) : (
            <section className="border border-secondary-s1 rounded-lg flex flex-col items-center gap-4 py-5">
              <Text
                text_size={"text-lg"}
                color_children={"text-secondary-s2"}
                font_style={"font-oswald-bold"}
                text_case={"uppercase"}
                margin_x={"mx-0"} margin_y={"my-0"}
              >
                Recuperar Contraseña
              </Text>
              <Input
                type={"email"}
                name={"email"}
                placeholder={"Ingresa tu email"}
                value={manager.email || ''}
                onChange={handleChange}
                px={"px-3"} py={"py-2 md:py-3"}
                width={"w-9/10"}
                margin_x={"mx-0"} margin_y={"my-0"}
                text_size={"text-sm md:text-base"}
              />
              {error && <p className={error.includes('Error') ? 'text-red-500 w-9/10' : 'text-primary w-9/10'}>{error}</p>}
              <article className="flex gap-5 justify-between w-9/10">
                <Button
                  bg_color={"bg-gray-400"} hover_bg={"hover:bg-gray-600"}
                  color={"text-gray-800"}
                  px={"px-2 sm:px-5"} py={"py-2"}
                  margin_x={"mx-0"} margin_y={"my-0"}

                  onClick={handleCloseModal}
                >
                  Cancelar
                </Button>
                <Button
                  bg_color={"bg-primary"} hover_bg={"hover:bg-primary-s1"}
                  px={"px-2 sm:px-5"} py={"py-2"} color={"text-gray-200"}
                  margin_x={"mx-0"} margin_y={"my-0"}
                  text_wrap={"text-wrap"}
                  onClick={handleSubmitForgotPassword}
                >
                  Recuperar Contraseña
                </Button>
              </article>
            </section>
          )}
        </section>
      </main>
    </>
  )
}