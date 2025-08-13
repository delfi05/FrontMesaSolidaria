import { useEffect, useState } from "react"
import { Header } from "@/components/gral/header/Header"
import { Footer } from "@/components/gral/footer/Footer"
import { Image } from "@/components/gral/images/Image"
import { Text } from "@/components/gral/texts/Text"
import { IconOrangeKnow, IconOrangeKnowResponsive } from "@/components/icons/Icons"
import { Button } from "@/components/gral/buttons/Button"
import { sponsorsData } from "@/data/sponsorsData"
import { CarouselImages } from "@/components/carousel/CarouselImages"
import './know.css'

export const Know = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 410);

  useEffect(() => {
    const handleResize = () => {
      const newIsSmallScreen = window.innerWidth < 410;
      setIsSmallScreen(newIsSmallScreen);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        {/* title page */}
        <section>
          <Image
            image={'../img/know/titlepage-know.webp'}
            altImage={"Imagen portada de seccion conocenos"}
            height={"h-auto"}
            objectFit={"contain"}
          />
        </section>
        {/* history Mesa Solidaria */}
        <section className="flex flex-col justify-center gap-5 mx-auto mt-5 w-9/10
                            lg:flex-row lg:items-center lg:gap-5 lg:justify-start xl:gap-10 md:pb-4">
          <section className="flex flex-col justify-center gap-5
                              lg:w-6/10">
            <section>
              <Text
                margin_x={"mx-0"}
                margin_y={"my-0"}
                text_position={"text-left"}
                text_size={"text-lg sm:text-2xl lg:text-3xl"}
              >
                HISTORIA
              </Text>
            </section>
            <section className="flex flex-col items-center gap-3 md:gap-5 md:pb-5 xl:gap-6">
              <Text
                margin_x={"mx-0 md:mx-auto"}
                margin_y={"my-0"}
                letter_spacing={"tracking-[.10em]"}
                font_style={"font-roboto"}
                text_position={"text-justify"}
                text_size={"text-sm md:text-base"}
                width={"w-full lg:w-[180%] xl:w-[170%]"}
                variant={"paragraph"}
              >
                <span className="font-roboto-bold">Mesa Solidaria </span>nació en 2008 en Tandil,
                impulsada por un pequeño grupo de referentes de organizaciones locales —Sociedad
                Rural de Tandil, Fundación Banco de Alimentos, Cáritas y Asociación Civil
                Ayuda Rincón Solidario— que se reunieron frente a una posible crisis alimentaria.
              </Text>
              <Text
                margin_x={"mx-0"}
                margin_y={"my-0"}
                font_style={"font-roboto"}
                text_size={"text-sm md:text-base"}
                text_position={"text-justify"}
                letter_spacing={"tracking-[.10em]"}
                variant={"paragraph"}
              >
                Aunque la crisis no llegó a impactar en nuestra ciudad, esa primera experiencia
                dejó en claro algo fundamental: <span className="font-roboto-italic">trabajando en conjunto podíamos ir mucho más
                  allá de los límites de cada organización individual.</span>
              </Text>
              <Text
                margin_x={"mx-0"}
                margin_y={"my-0"}
                font_style={"font-roboto"}
                text_size={"text-sm md:text-base"}
                text_position={"text-justify"}
                letter_spacing={"tracking-[.10em]"}
                variant={"paragraph"}
              >
                Así surgió el desafío de convocar a más actores sociales, unir esfuerzos,
                compartir recursos y multiplicar los resultados. Con el tiempo, aquella primera
                iniciativa espontánea fue creciendo, hasta consolidarse en una Federación que
                hoy agrupa a más de 30 organizaciones de Tandil.
              </Text>
              <Text
                margin_x={"mx-0 md:mx-auto xl:mx-0"}
                margin_y={"my-0"}
                font_style={"font-roboto"}
                text_size={"text-sm md:text-base"}
                text_position={"text-justify"}
                letter_spacing={"tracking-[.10em]"}
                width={"w-full lg:w-full"}
                variant={"paragraph"}
              >
                Nuestro propósito sigue siendo el mismo: <span className="font-roboto-italic">fortalecer
                  a las organizaciones sociales, articular acciones con el sector público y privado,
                  y promover una ciudadanía activa que construya comunidad desde la solidaridad y el
                  compromiso.</span>
              </Text>
              <Text
                margin_x={"mx-0 md:mx-auto"}
                margin_y={"my-0"}
                font_style={"font-roboto"}
                text_size={"text-sm md:text-base"}
                text_position={"text-justify"}
                letter_spacing={"tracking-[.10em]"}
                width={"w-full lg:w-[180%]"}
                variant={"paragraph"}
              >
                Mesa Solidaria es, ante todo, un espacio de encuentro, colaboración y acción
                conjunta para transformar la realidad de nuestra ciudad.
              </Text>
            </section>
          </section>
          {/* image Mesa Solidaria */}
          <section className="lg:mt-15">
            <Image
              image={"./img/know/history_mesaSolidaria.webp"}
              altImage={"history Mesa Solidaria"}
              objectFit={"contain"}
              margin_y={"md:mb-5 xl:mb-0"}
              width={"w-full md:w-170 lg:w-115"}
            />
          </section>
        </section>
        <section className="relative top-10 flex justify-center h-[300px]">
          <section className="absolute left-0  2xl:left-30">
            {isSmallScreen ? (
              <figure className="absolute">
                <IconOrangeKnow />
              </figure>
            ) : (
              <figure className="absolute -translate-x-1/9">
                <IconOrangeKnowResponsive />
              </figure>
            )}
          </section>
          <article className="relative flex flex-col items-center gap-1 top-1/6 pt-7 sm:top-1/4 lg:top-1/3 h-full section_knowOrange">
            <Text
              margin_x={"mx-0"}
              margin_y={"my-0"}
              width={"w-9/10 md:w-8/10 2xl:w-7/10"}
              text_position={"text-center"}
              text_size={"text-lg sm:text-2xl lg:text-3xl"}
            >
              NUESTRA MISIÓN
            </Text>
            <Text
              margin_x={"mx-0"}
              margin_y={"my-0"}
              width={"w-9/10 md:w-8/10 2xl:w-7/10"}
              font_style={"font-roboto"}
              text_size={"text-sm md:text-base xl:text-lg"}
              text_position={"text-center"}
              variant={"paragraph"}
            >
              En Mesa Solidaria articulamos esfuerzos para construir una comunidad más justa e inclusiva. Promovemos la participación activa de la ciudadanía, impulsamos la solidaridad y trabajamos para incidir en políticas públicas que transformen realidades y mejoren la vida de quienes más lo necesitan.
            </Text>
            <Text 
              margin_x={"mx-0"}
              margin_y={"my-0"}
              width={"w-9/10 md:w-8/10 2xl:w-7/10"}
              font_style={"font-roboto"}
              text_size={"text-sm md:text-base xl:text-lg"}
              text_position={"text-center"}
              variant={"paragraph"}
            >
              Creemos en la fuerza de la acción colectiva y en el valor de cada persona. Por eso, fortalecemos el entramado social a través del trabajo conjunto entre organizaciones sin fines de lucro, el Estado, el sector privado y la comunidad.
            </Text>
            <Text
              margin_x={"mx-0"}
              margin_y={"my-0"}
              width={"w-9/10 md:w-8/10 2xl:w-7/10"}
              font_style={"font-roboto"}
              text_size={"text-sm md:text-base xl:text-lg"}
              text_position={"text-center"}
              variant={"paragraph"}
            >
              Nuestra misión es ser un motor de cambio social, generando redes de apoyo que potencien capacidades, promuevan derechos y construyan oportunidades para quienes más lo necesitan.
            </Text>
          </article>
        </section>
        {/* our objectives */}
        <section className="mt-50 sm:mt-35 md:mt-45 lg:mt-45">
          <article className="w-9/10 h-full pt-25 mx-auto">
            <Text
              margin_x={"mx-0"}
              margin_y={"my-0"}
              text_position={"text-left"}
              text_size={"text-lg sm:text-2xl lg:text-3xl"}
            >
              NUESTROS OBJETIVOS
            </Text>
            <section className="flex flex-col md:w-full md:flex-row md:items-center">
              <article className="flex flex-col">
                <ul className="w-9/10 list-disc list-inside flex flex-col gap-3 mx-4 my-3 font-roboto text-sm 
                             md:text-base xl:text-lg">
                  <li>
                    <span className="font-roboto-bold">Conectar organizaciones sociales</span> para potenciar su impacto.
                  </li>
                  <li>
                    <span className="font-roboto-bold">Impulsar la participación ciudadana</span> en iniciativas comunitarias.
                  </li>
                  <li>
                    <span className="font-roboto-bold">Incidir en políticas públicas</span> que garanticen derechos y mejoren la calidad de vida de los sectores más vulnerables.
                  </li>
                  <li>
                    <span className="font-roboto-bold">Fomentar valores</span> de solidaridad y trabajo colectivo.
                  </li>
                  <li>
                    <span className="font-roboto-bold">Dar visibilidad</span> al trabajo de las organizaciones locales.
                  </li>
                  <li>
                    <span className="font-roboto-bold">Generar alianzas</span> estratégicas con sectores públicos y privados.
                  </li>
                  <li>
                    <span className="font-roboto-bold">Promover iniciativas</span> de innovación social que generen impacto comunitario y favorezcan la inclusión social, económica y ambiental.
                  </li>
                </ul>
              </article>
              <section className="md:w-1/2">
                <Image
                  image={"./img/know/children_in_the_world.webp"}
                  altImage={"children in the world"}
                  top={"pt-5 md:pt-0"}
                  width={"w-70 sm:w-120 md:w-90"}
                />
              </section>
            </section>
          </article>
        </section>
        {/* cards join voluntary/donate */}
        <section className="relative h-140 sm:h-140 md:h-110 my-10">
          <Image
            image={"./img/know/bg_join.webp"}
            altImage={"bg join"}
            height={"h-full"}
            position={"absolute"}
          />
          <article className="absolute w-full h-full flex flex-col justify-around items-center z-1 top-0">
            <Text
              margin_x={"mx-0"}
              margin_y={"my-0"}
              font_style={"font-oswald-bold"}
              color_children={"text-white"}
              text_size={"text-xl sm:text-2xl lg:text-3xl"}
            >
              MESA SOLIDARIA <span className="text-secondary-s1 uppercase">cuenta con vos</span>
            </Text>
            <article className="flex flex-col justify-center items-center gap-3 md:flex-row">
              <article className="w-9/10 h-55 bg-white flex flex-col justify-center items-center rounded-lg gap-4 py-3 
                                  md:w-3/10 md:h-80 md:justify-evenly">
                <Text
                  margin_x={"mx-0"}
                  margin_y={"my-0"}
                  font_style={"font-oswald-bold"}
                  text_size={"text-lg sm:text-xl md:text-2xl"}
                  color_children={"text-secondary-s1"}
                >
                  SUMATE COMO VOLUNTARIO
                </Text>
                <Text
                  width={"w-9/10 sm:w-8/10 lg:w-8/10"}
                  heigth={"h-auto"}
                  margin_x={"mx-0"}
                  margin_y={"my-0"}
                  font_style={"font-roboto"}
                  text_size={"text-sm md:text-base"}
                  variant={"paragraph"}
                >
                  Poné en acción tu solidaridad. ¡Te estamos esperando!
                </Text>
                <Button
                  hover_bg={"hover:bg-orange-500"}
                >
                  SUMARME
                </Button>
              </article>
              <article className="w-9/10 h-55 bg-secondary-s1 flex flex-col justify-center items-center rounded-lg py-5 gap-4 
                                  md:w-3/10 md:h-80 md:justify-evenly">
                <Text
                  width={"w-9/10"}
                  margin_x={"mx-0"}
                  margin_y={"my-0"}
                  font_style={"font-oswald-bold"}
                  text_size={"text-lg sm:text-xl md:text-2xl"}
                  color_children={"text-white"}
                >
                  SUMATE COMO DONANTE
                </Text>
                <Text
                  color_children={"text-white"}
                  width={"w-9/10 lg:w-8/10"}
                  heigth={"h-auto"}
                  margin_x={"mx-0"}
                  margin_y={"my-0"}
                  font_style={"font-roboto"}
                  text_size={"text-sm md:text-base"}
                  variant={"paragraph"}
                >
                  Cada aporte suma. ¡Ayudanos a seguir transformando realidades!
                </Text>
                <Button
                  bg_color={"bg-white"}
                  hover_bg={"hover:bg-orange-500"}
                  color={"text-secondary-s2"}
                  hover_text={"hover:text-white"}
                >
                  SUMARME
                </Button>
              </article>
            </article>
          </article>
        </section>
        <section className="w-9/10 flex flex-col mx-auto gap-5 lg:gap-8">
          <Text
            margin_x={"mx-0"}
            margin_y={"my-0"}
            text_position={"text-left"}
            text_size={"text-lg sm:text-2xl lg:text-3xl"}
            text_case={"uppercase"}
          >
            participantes de mesa
          </Text>
          {/* icons */}
          <section className="flex justify-center flex-wrap gap-3 md:gap-5 lg:gap-4.5 xl:gap-5.5">
            {sponsorsData.map((sponsor, index) => (
              <article
                key={index}
                className="w-3/10 sm:w-2/10 md:w-15/100 h-32 flex flex-col items-center lg:hover:scale-120"
              >
                <Image
                  image={sponsor.imageUrl}
                  alt={sponsor.altImage}
                  objectFit={"contain"}
                  width={"w-full"}
                  height={"h-15 sm:h-20"}
                />
                <Text
                  text_size={"text-sm"}
                  text_case={"uppercase"}
                >
                  {sponsor.title}
                </Text>
              </article>
            ))}
          </section>
        </section>
        <section className="mt-5 md:mt-10">
          <CarouselImages />
        </section>
      </main>
      <Footer />
    </>
  )
}