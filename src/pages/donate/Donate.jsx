import { Header } from '@/components/gral/header/Header'
import { Footer } from '@/components/gral/footer/Footer'
import { Text } from '@/components/gral/texts/Text'
import { Image } from '@/components/gral/images/Image'

export const Donate = () => {
  return (
    <>
      <Header />
      <main className='lg:bg-[url(../img/donate/bg_donate.webp)] lg:bg-bottom bg-no-repeat bg-contain lg:bg-size-[65%] xl:bg-size-[50%]'>
        <section>
          <Image
            image={"../img/donate/titlepage_donate.webp"}
            altImage={"Imagen de portada de donar"}
            objectFit={"contain"}
            height={"h-auto sm:h-50 lg:h-70"}
          >
          </Image>
        </section>
        <Text
          width={"w-9/10"}
          margin_y={"my-4 md:my-10"}
          text_size={"text-lg md:text-xl lg:text-2xl xl:text-3xl"}
          text_position={"text-left"}
        >
          DONAR
        </Text>
        <section className='w-9/10 mx-auto md:w-6/10 lg:bg-[#FFFFFFEF]'>
          <article className='py-4 px-2 sm:px-5 mt-5 mb-10 flex flex-col gap-4 backdrop-opacity-30 h-36'
            style={{ boxShadow: "2px 3px 7px 0 rgba(0,0,0,0.2)" }}
          >
            <Text
              color_children={"text-primary-s1"}
              text_size={"text-lg md:text-2xl"}
              text_position={"text-center"}
              font_style={"font-oswald-bold"}
            >
              DONAR MATERIALES | FRAZADAS | ABRIGO
            </Text>
            <Text
              text_size={"text-sm md:text-base"}
              text_position={"text-left"}
              width={"w-full md:w-9/10"}
            >
              Comunicarse al email <span className='font-oswald-bold'>federacion.mesasolidariatandil@gmail.com</span>
            </Text>
          </article>
        </section>
        <section className='w-9/10 mx-auto md:w-6/10 lg:bg-[#FFFFFFEF]'>
          <article className='py-4 px-2 sm:px-5 flex flex-col gap-4 h-104'
            style={{ boxShadow: "2px 3px 7px 0 rgba(0,0,0,0.2)" }}
          >
            <Text
              color_children={"text-primary-s1"}
              text_size={"text-lg md:text-2xl"}
              font_style={"font-oswald-bold"}
            >
              DONAR CON TRANSFERENCIA BANCARIA
            </Text>
            <article className='flex flex-col items-start gap-2'>
              <Text
                text_size={"text-sm md:text-base"}
                text_position={"text-left"}
                width={"w-full md:w-9/10"}
                font_style={"font-roboto"}
                variant={"paragraph"}
              >
                Nombre de la cuenta: <span className='font-roboto-bold'>Federación de Organización</span>
              </Text>
              <Text
                text_size={"text-sm md:text-base"}
                text_position={"text-left"}
                width={"w-full md:w-9/10"}
                font_style={"font-roboto-bold"}
                variant={"paragraph"}
              >
                Banco Provincia
              </Text>
              <Text
                text_size={"text-sm md:text-base"}
                text_position={"text-left"}
                width={"w-full md:w-9/10"}
                font_style={"font-roboto"}
                variant={"paragraph"}
              >
                Alias: <span className='font-roboto-bold'>CANADA.CALDO.RULO</span>
              </Text>
              <Text
                text_size={"text-sm md:text-base"}
                text_position={"text-left"}
                width={"w-full md:w-9/10"}
                font_style={"font-roboto"}
                variant={"paragraph"}
              >
                CVU: <span className='font-roboto-bold'>0140339601630205618376</span>
              </Text>
              <Text
                text_size={"text-sm md:text-base"}
                text_position={"text-left"}
                width={"w-full md:w-9/10"}
                font_style={"font-roboto"}
                variant={"paragraph"}
              >
                Número de Cuenta: <span className='font-roboto-bold'>6302-56183/7</span>
              </Text>
              <Text
                text_size={"text-sm md:text-base"}
                text_position={"text-left"}
                width={"w-full md:w-9/10"}
                font_style={"font-roboto"}
                variant={"paragraph"}
              >
                CUIL/CUIT: <span className='font-roboto-bold'>30-71507201-3</span>
              </Text>
            </article>
            <Text
              text_size={"text-sm md:text-base"}
              text_position={"text-center"}
              width={"w-full md:w-9/10"}
              font_style={"font-roboto"}
              variant={"paragraph"}
            >
              Para enviar el comprobante de depósito, informar su destino o
              solicitar recibo podés escribir a
              <span className='font-oswald-bold underline-offset-2 text-xs md:text-sm'> federacion.mesasolidariatandil@gmail.com</span>
            </Text>
            <Text
              text_size={"text-sm sm:text-base md:text-lg"}
              width={"w-full md:w-9/10"}
              variant={"paragraph"}
            >
              ¡Gracias!
            </Text>
          </article>
        </section>
      </main>
      <Footer />
    </>
  )
}