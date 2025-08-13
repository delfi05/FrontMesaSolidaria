import { Link } from 'react-router-dom'
import { IconEmail, IconFacebook, IconInstagram, IconLocation, IconWhatsApp } from '../../icons/Icons'
import { Image } from '../images/Image'
import { Text } from '../texts/Text'

export const Footer = () => {
  return (
    <footer className='bg-linear-to-b from-secondary to-secondary-s1 flex flex-col gap-3 lg:gap-5 pt-2.5'>
      <Image
        image={"../img/gral/logo_mesa.webp"}
        altImage={"Logo de Mesa Solidaria"}
        width={"w-20 2xl:w-30"}
      />
      <Text
        text_size={"text-sm md:text-base 2xl:text-lg"}
        variant={"paragraph"}
      >
        Si quieres realizar alguna consulta en particular escribinos a
      </Text>
      <section>
        <article className='flex justify-center items-center gap-4 2xl:gap-7'>
          <Link to={"https://wa.me/542494628316"} target='_blank'>
            <figure className='cursor-pointer 2xl:scale-120'>
              <IconWhatsApp />
            </figure>
          </Link>
          <Link to={"https://www.facebook.com/mstandil"} target='_blank'>
            <figure className='cursor-pointer 2xl:scale-120'>
              <IconFacebook />
            </figure>
          </Link>
          <Link to={"https://www.instagram.com/mesasolidariatandil"} target='_blank'>
            <figure className='cursor-pointer 2xl:scale-120'>
              <IconInstagram />
            </figure>
          </Link>
        </article>
      </section>
      <section className='flex justify-between items-center px-2 md:mx-8 lg:mx-5'>
        <article className='lg:flex lg:justify-start lg:gap-5 lg:w-3/10'>
          <Text
            text_size={"text-xs sm:text-sm xl:text-base 2xl:text-lg"}
            variant={"paragraph"}
            text_position={"text-left"}
            padding_x={"pl-3 lg:pl-0"}
          >
            Políticas de privacidad.
          </Text>
          <Text
            text_size={"text-xs sm:text-sm xl:text-base 2xl:text-lg"}
            variant={"paragraph"}
            text_position={"text-left"}
            padding_x={"pl-3 lg:pl-0"}
          >
            Términos y condiciones.
          </Text>
        </article>
        <article className='lg:flex lg:justify-end lg:gap-5 lg:w-5/10'>
          <article className='flex justify-between items-center gap-1.5'>
            <figure>
              <IconEmail />
            </figure>
            <Text
              text_size={"text-xs sm:text-sm xl:text-base 2xl:text-lg"}
              text_position={"text-left"}
              variant={"paragraph"}
            >
              federacion.mesasolidariatandil@gmail.com
            </Text>
          </article>
          <article className='flex justify-between items-center gap-1.5'>
            <figure>
              <IconLocation />
            </figure>
            <Text
              text_size={"text-xs sm:text-sm xl:text-base 2xl:text-lg"}
              text_position={"text-left"}
              variant={"paragraph"}
            >
              Pje Güiraldes 550, Tandil Buenos Aires
            </Text>
          </article>
        </article>
      </section>
      <section className='bg-secondary-s2 flex justify-between items-center gap-1.5 px-1.5 py-1.5'>
        <article className='w-45/100 sm:ml-3'>
          <Text
            text_size={"text-xs xl:text-sm 2xl:text-base"}
            text_position={"text-center sm:text-left"}
            variant={"paragraph"}
          >
            © Todos los derechos reservados. Mesa Solidaria.
          </Text>
        </article>
        <article className='w-5/10 sm:mr-3'>
          <Text
            width={"w-max sm:w-full"}
            text_position={"text-center sm:text-right"}
            text_size={"text-xs xl:text-sm 2xl:text-base"}
            variant={"paragraph"}
          >
            Desarrollado por
          </Text>
          <Text
            width={"w-max sm:w-full"}
            text_position={"text-center sm:text-right"}
            text_size={"text-xs xl:text-sm 2xl:text-base"}
            variant={"paragraph"}
          >
            Fernández Lorenzo y Ferreyra Delfina
          </Text>
        </article>
      </section>
    </footer>
  )
}