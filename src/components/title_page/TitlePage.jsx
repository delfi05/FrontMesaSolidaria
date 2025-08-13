import { Link } from "react-router-dom"
import { Button } from "../gral/buttons/Button"
import { Text } from "../gral/texts/Text"
import { Image } from "../gral/images/Image"

export const TitlePage = () => {
  return (
    <>
      <section className="h-[calc(100vh-70px)] flex flex-col justify-center items-center pt-15 gap-4
                           md:gap-7 lg:gap-10 border-y-20 border-primary-s1">
        <Image width={"w-60"} image={"./img/gral/logo_mesa.webp"} altImage={"Logo de Mesa Solidaria portada"} />
        <Text
          width={"w-9/10 sm:w-8/10 lg:w-6/10"}
          margin_y={"my-0"}
          margin_x={"mx-0"}
          color_children={"text-primary-s1"}
          font_style={"font-oswald-bold"}
          text_size={"text-lg sm:text-xl md:text-2xl xl:text-3xl 2xl:text-4xl"}
        >
          Fortalecemos y articulamos el trabajo de las organizaciones sociales, impulsando la participación ciudadana, el compromiso colectivo y la transformación de realidades
        </Text>
        <Link to="/join">
          <Button
            px={"px-10 xl:px-15"}
            py={"py-3 xl:py-4"}
            text_size={"text-sm lg:text-base"}
          >
            SUMATE
          </Button>
        </Link>
      </section>
    </>
  )
}