import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/gral/buttons/Button'
import { Footer } from '@/components/gral/footer/Footer'
import { Header } from '@/components/gral/header/Header'
import { Text } from '@/components/gral/texts/Text'
import { IconArrowRightProjects, IconFolder } from '@/components/icons/Icons'
import { TitlePage } from '@/components/title_page/TitlePage'
import { NewsCard } from '../news/NewsCard'
import { Link } from 'react-router-dom'
import { ProjectCard } from '../project/ProjectCard'
import { IncrementNumber } from '@/service/IncrementNumber'
import { ProjectService } from "@/service/ProjectService"
import { NewsService } from "@/service/NewsService"
import { imagesProjectHome } from "@/mocks/project.json"

export const Home = ({ projects, loadingProjects, errorProjects, news, loadingNews, errorNews }) => {
  const sectionNumberRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [latestNews, setLatestNews] = useState([]);
  const [latestProjects, setLatestProjects] = useState([]);

  const carouselRef = useRef(null);
  const newsRefs = useRef([]);

  const scrollToNews = (index) => {
    if (carouselRef.current && newsRefs.current[index]) {
      const newsItem = newsRefs.current[index];
      const offset = newsItem.offsetLeft;

      carouselRef.current.scrollTo({
        left: offset,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (news && news.length > 0) {
      const sortedNews = [...news].sort((a, b) => new Date(b.date) - new Date(a.date));
      setLatestNews(sortedNews.slice(0, 5));
    } else {
      setLatestNews([]);
    }

    if (projects && projects.length > 0) {
      const sortedProjects = [...projects].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setLatestProjects(sortedProjects.slice(0, 5));
    } else {
      setLatestProjects([]);
    }
  }, [news, projects]);

  //seccion incremento de numeros 
  useEffect(() => {
    const sectionElement = sectionNumberRef.current;
    const handleScroll = () => {
      if (sectionElement && !hasAnimated) {
        const rect = sectionElement.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible) {
          setHasAnimated(true);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <main className='flex flex-col gap-10'>
        <TitlePage />
        {/* sección conoce a mesa solidaria */}
        <section className='flex flex-col justify-center items-center gap-6 w-9/10 mx-auto'>
          <article>
            <Text
              text_size={"text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl"}
            >
              CONOCE A <span className='text-secondary-s1'>MESA SOLIDARIA</span>
            </Text>
          </article>
          <article className='flex flex-col justify-center items-center gap-1 lg:gap-3 xl:gap-5'>
            <Text
              color_children={'text-gray-accent-light-2'}
              font_style={"font-roboto"}
              text_size={"text-sm md:text-base 2xl:text-xl"}
              variant={"paragraph"}
            >
              Somos <span className='font-roboto-italic text-secondary-s1'>Mesa Solidaria Tandil</span>,
              una federación que reúne y representa a organizaciones sociales de nuestra ciudad.
            </Text>
            <Text
              color_children={"text-gray-accent-light-2"}
              font_style={"font-roboto"}
              text_size={"text-sm md:text-base 2xl:text-xl"}
              variant={"paragraph"}
            >
              Trabajamos por el fortalecimiento del entramado social, promoviendo el trabajo
              conjunto entre organizaciones sin fines de lucro, el Estado y el sector privado.
            </Text>
            <Text
              color_children={"text-gray-accent-light-2"}
              font_style={"font-roboto"}
              text_size={"text-sm md:text-base 2xl:text-xl"}
              variant={"paragraph"}
            >
              Nos mueve la pasión por unir esfuerzos en favor del bien común, juntando el
              compromiso de las ONGs, el Estado, de las empresas y de los vecinos.
            </Text>
            <Text
              color_children={"text-gray-accent-light-2"}
              font_style={"font-roboto"}
              text_size={"text-sm md:text-base 2xl:text-xl"}
              text_position={"text-center hidden sm:block"}
              variant={"paragraph"}
            >
              Nuestro mayor valor es la construcción colectiva: creemos firmemente en la fuerza
              de la unión y en el aporte de cada persona. Así, invitamos a más vecinos y
              organizaciones a sumarse a este proyecto común. Juntos, avanzamos hacia un
              Tandil más justo, inclusivo y esperanzador.
            </Text>
          </article>
        </section>
        {/* sección noticias */}
        <section className='flex flex-col gap-4 w-9/10 mx-auto lg:w-full lg:mx-0 lg:gap-3 xl:gap-4'>
          <article className='flex justify-between items-center lg:w-9/10 lg:mx-auto'>
            <Text
              width={"w-max"}
              text_position={"text-left"}
              margin_x={"mx-0"}
              text_size={"text-lg md:text-xl lg:text-2xl xl:text-3xl"}
            >
              ULTIMAS NOTICIAS
            </Text>
            <article>
              <Link to={"/news"} >
                <Button
                  bg_color={"bg-primary-s2"}
                  color={"text-white"}
                  text_size={"text-xs 2xl:text-sm"}
                  hover_bg={"hover:bg-primary-s1"}
                  py={"py-1 sm:py-2"}
                  px={"px-3"}
                  icon={<IconFolder />}
                  id={"news"}
                >
                  VER TODOS
                </Button>
              </Link>
            </article>
          </article>
          <article className='hidden lg:flex lg:gap-3 lg:w-9/10 lg:mx-auto'>
            {latestNews?.map((item, index) => (
              <Button
                key={index}
                bg_color={"bg-gray-accent-light-2"}
                hover_bg={"hover:bg-gray-accent-light-1"}
                rounded={"rounded-full"}
                px={"px-0"}
                py={"py-0"}
                width={"lg:w-7 2xl:w-9"}
                height={"lg:h-7 2xl:h-9"}
                text_size={"text-sm 2xl:text-base"}
                onClick={() => scrollToNews(index)}
              >
                {index + 1}
              </Button>
            ))}
          </article>
          <section ref={carouselRef} className='overflow-x-scroll scrollbar-hide pt-1 lg:mx-0 lg:w-full'>
            {loadingNews && !errorNews && <p className="text-center text-gray-600 py-4 uppercase text-base lg:text-xl">Cargando noticias...</p>}
            {errorNews && <p className="text-center text-red-500 py-4 uppercase text-base lg:text-xl">{errorNews}</p>}
            {!loadingNews && !errorNews && (
              <article className='w-3/1 sm:w-2/1 lg:w-full flex items-center gap-3 lg:gap-5 flex-nowrap flex-shrink-0'>
                {latestNews?.map((newsItem, index) => (
                  <Link
                    to={`/news/${newsItem.id_news}`}
                    key={newsItem.id_news}
                    className='w-full lg:flex-shrink-0'
                    ref={(el) => (newsRefs.current[index] = el)}
                  >
                    <NewsCard
                      home
                      height={"h-60 sm:h-65 md:h-77 lg:h-80 xl:h-107.5"}
                      height_img_home={"lg:h-80 xl:h-107.5"}
                      width_img_home={"w-full lg:w-3/2"}
                      {...newsItem}
                    />
                  </Link>
                )
                )}
              </article>
            )}
          </section>
        </section>
        {/* sección proyectos */}
        <section className='flex flex-col gap-5 w-9/10 mx-auto lg:gap-10'>
          <article className='flex justify-between items-center'>
            <Text
              width={"w-max"}
              margin_x={"mx-0"}
              text_position={"text-left"}
              text_size={"text-lg md:text-xl lg:text-2xl xl:text-3xl"}
            >
              ¿QUE HACEMOS?
            </Text>
            <article>
              <Link to={"/projects"} >
                <Button
                  bg_color={"bg-primary-s2"}
                  color={"text-white"}
                  text_size={"text-xs 2xl:text-sm"}
                  hover_bg={"hover:bg-primary-s1"}
                  py={"py-1 sm:py-2"}
                  px={"px-3"}
                  width={"w-full"}
                  icon={<IconFolder />}
                  id={"projects"}
                >
                  VER TODOS
                </Button>
              </Link>
            </article>
          </article>
          <article className='w-full font-roboto flex flex-col gap-3 2xl:gap-5'>
            <Text
              width={"md:w-9/10 lg:w-8/10"}
              margin_x={"mx-0"}
              margin_y={"my-0"}
              text_position={"text-left"}
              text_size={"text-sm md:text-base 2xl:text-xl"}
              font_style={"font-roboto"}
            >
              Desde el año 2008, la Federación Mesa Solidaria trabaja por el fortalecimiento
              del Tercer Sector de Tandil, apostando al desarrollo sustentable de las
              organizaciones sociales y a la generación de impacto comunitario.
            </Text>
            <Text
              width={"md:w-9/10 lg:w-8/10"}
              margin_x={"mx-0"}
              margin_y={"my-0"}
              text_position={"text-left"}
              text_size={"text-sm md:text-base 2xl:text-xl"}
              font_style={"font-roboto"}
            >
              Nuestro accionar se basa en tres grandes líneas estratégicas:
            </Text>
            <ul className='text-sm md:text-base 2xl:text-xl md:w-9/10 lg:w-7/10 ml-5 2xl:ml-10 list-disc'>
              <li><span className='font-roboto-bold'>Agrupar y representar</span> a las asociaciones civiles de primer grado que gestan políticas sociales en el Partido de Tandil.</li>
              <li><span className='font-roboto-bold'>Fortalecer y profesionalizar</span> a las organizaciones a través de acciones de capacitación, asesoramiento, articulación público-privada y visibilización en medios de comunicación.</li>
              <li><span className='font-roboto-bold'>Promover iniciativas de innovación social</span>, impulsando proyectos productivos, educativos, de inclusión socio-laboral y de triple impacto que mejoren la calidad de vida en nuestra comunidad.</li>
            </ul>
            <Text
              width={"md:w-9/10 lg:w-8/10"}
              margin_x={"mx-0"}
              margin_y={"my-0"}
              text_position={"text-left"}
              text_size={"text-sm md:text-base 2xl:text-xl"}
              font_style={"font-roboto"}
            >
              Contamos con un espacio físico propio, cedido en comodato por el Municipio de Tandil,
              que funciona como sede social, centro logístico y sede de emprendimientos de las
              organizaciones que forman parte de la Federación.
            </Text>
            <Text
              width={"md:w-9/10 lg:w-8/10"}
              margin_x={"mx-0"}
              margin_y={"my-0"}
              text_position={"text-left"}
              text_size={"text-sm md:text-base 2xl:text-xl"}
              font_style={"font-roboto"}
            >
              A lo largo de estos años hemos desarrollado programas y proyectos como:
            </Text>
          </article>
          <section>
            {loadingProjects && !errorProjects && <p className="text-center text-gray-600 py-4 uppercase text-base lg:text-xl">Cargando noticias...</p>}
            {errorProjects && <p className="text-center text-red-500 py-4 uppercase text-base lg:text-xl">{errorProjects}</p>}
            {!loadingProjects && !errorProjects && (
              <article className='flex flex-col justify-center gap-3 w-full lg:gap-5'>
                {latestProjects?.map((project, index) => {
                  const projectImage = imagesProjectHome[index];
                  return (
                    <Link
                      to={`/projects/${project.id_project}`}
                      key={project.id_project}
                    >
                      <ProjectCard
                        {...project}
                        image={projectImage.image}
                        isMockImage={true}
                        height={"h-20 sm:h-25 md:h-32 lg:h-40 xl:h-55"}
                        rounded={"rounded"}
                        color_children={"text-white"}
                        blur={"blur(1.5px)"}
                        relative={"relative"}
                        absolute={"absolute"}

                        text_shadow={{ textShadow: "6px 4px 5px rgba(0,0,0,1)" }}
                        text_transform={"transform"}
                        text_translate={"translate-x-2 -translate-y-1/2"}
                        /* icon */
                        top={"top-1/2 md:top-8 lg:top-10 xl:top-18"}
                        top_icon={"top-1/2 md:top-17 lg:top-20 xl:top-35"}
                        text_icon={
                          <Text
                            text_position={"uppercase"}
                            color_children={"text-white"}
                            text_size={"text-base 2xl:text-lg"}
                          >
                            conoce mas
                          </Text>
                        }
                        bg_icon={"bg-transparent md:bg-primary-s1"}
                        left={"left-2"}
                        icon={<IconArrowRightProjects />}
                      />
                    </Link>
                  );
                })}
              </article>
            )}
          </section>
        </section>
        {/* sección nuestra misión */}
        <section className='flex flex-col justify-center gap-6 w-9/10 mx-auto'>
          <article>
            <Text
              text_position={"text-left"}
              text_size={"text-lg md:text-xl lg:text-2xl xl:text-3xl"}
            >
              NUESTRA MISION
            </Text>
          </article>
          <article className='flex flex-col justify-center items-center gap-1 lg:w-8/10 lg:mx-0 lg:gap-3 xl:gap-5'>
            <Text
              color_children={'text-gray-accent-light-2'}
              font_style={"font-roboto"}
              text_size={"text-sm md:text-base 2xl:text-xl"}
              text_position={"text-center lg:text-left"}
            >
              En Mesa Solidaria articulamos esfuerzos para construir una comunidad más justa e inclusiva.
            </Text>
            <Text
              color_children={"text-gray-accent-light-2"}
              font_style={"font-roboto"}
              text_size={"text-sm md:text-base 2xl:text-xl"}
              text_position={"text-center lg:text-left"}
            >
              Promovemos la participación activa de la ciudadanía, impulsamos la solidaridad
              y trabajamos para incidir en políticas públicas que transformen realidades y
              mejoren la vida de quienes más lo necesitan.
            </Text>
          </article>
        </section>
        {/* sección se parte */}
        <section className='bg-[url(../img/gral/join_voluntary.webp)] bg-no-repeat bg-cover 
                            flex items-center py-8 md:h-80'>
          <article className='w-9/10 flex flex-col justify-center items-center gap-5 mx-auto md:gap-8'>
            <Text
              color_children={"text-secondary"}
              text_shadow={{ textShadow: "0px 3px 2px rgba(0,0,0,1)" }}
              text_size={"text-lg md:text-xl lg:text-2xl xl:text-3xl"}
              text_case={"uppercase"}
            >
              ¡Sumate a Mesa Solidaria!
            </Text>
            <Text
              color_children={"text-white"}
              text_size={"text-sm md:text-base 2xl:text-xl"}
              width={"w-full sm:w-2/3"}
              text_shadow={{ textShadow: "0px 3px 2px rgba(0,0,0,1)" }}
            >
              Gracias al apoyo incondicional de nuestros voluntarios, podemos llevar adelante
              todas nuestras acciones. Si compartís nuestro compromiso con la solidaridad y la
              transformación social, te invitamos a ser parte de este gran equipo.
            </Text>
            <Link to="/join">
              <Button
                bg_color={"bg-secondary-s1"}
                rounded={"rounded-full"}
                text_size={"text-xs sm:text-sm 2xl:text-base"}
                px={"px-5 sm:px-10"}
              >
                ¡Sumate y ayudanos a hacer la diferencia!
              </Button>
            </Link>
          </article>
        </section>
        {/* sección nuestros objetivos */}
        <section className='flex flex-col justify-center gap-6 w-9/10 mx-auto'>
          <article>
            <Text
              text_position={"text-left"}
              text_size={"text-lg md:text-xl lg:text-2xl xl:text-3xl"}
            >
              NUESTROS OBJETIVOS
            </Text>
          </article>
          <article className='flex flex-col justify-center items-center gap-1 lg:w-8/10 lg:mx-0 lg:gap-3 xl:gap-5'>
            <Text
              color_children={'text-gray-accent-light-2'}
              font_style={"font-roboto"}
              text_size={"text-sm md:text-base 2xl:text-xl"}
              text_position={"text-center lg:text-left"}
            >
              En Mesa Solidaria trabajamos para conectar organizaciones sociales y potenciar
              su impacto, impulsando la participación ciudadana en iniciativas comunitarias.
            </Text>
            <Text
              color_children={'text-gray-accent-light-2'}
              font_style={"font-roboto"}
              text_size={"text-sm md:text-base 2xl:text-xl"}
              text_position={"text-center lg:text-left"}
            >
              Buscamos incidir en políticas públicas que garanticen derechos y mejoren la
              calidad de vida de los sectores más vulnerables, al mismo tiempo que fomentamos
              valores de solidaridad y trabajo colectivo.
            </Text>
            <Text
              color_children={'text-gray-accent-light-2'}
              font_style={"font-roboto"}
              text_size={"text-sm md:text-base 2xl:text-xl"}
              text_position={"text-center lg:text-left"}
            >
              Nos proponemos dar visibilidad al trabajo de las organizaciones locales, generar alianzas estratégicas con sectores
              públicos y privados, y promover iniciativas de innovación social que generen
              impacto comunitario y favorezcan la inclusión social, económica y ambiental.
            </Text>
          </article>
        </section>
        {/* sección acompañamiento */}
        <section ref={sectionNumberRef} className='bg-[url(../img/gral/accompaniment_mesa.webp)] bg-no-repeat bg-cover
                      flex justify-start flex-wrap sm:h-70 md:h-90 2xl:h-140'>
          <article className='w-4/10 pt-2.5 pl-2.5 sm:pt-7 lg:pl-5 xl:pl-8 2xl:pl-10 2xl:pt-15'>
            <Text
              width={"w-full xl:w-3/4"}
              margin_x={"mx-0"}
              font_style={"font-oswald-bold"}
              letter_spacing={"tracking-normal"}
              text_position={"text-left"}
              text_size={"text-base sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl"}
            >
              ACOMPAÑAMIENTO DE <span className='text-secondary-s2'>MESA SOLIDARIA</span> EN NUMEROS
            </Text>
          </article>
          <article className='w-6/10 flex justify-end items-center gap-3 pr-2.5 sm:pr-7 sm:gap-6 md:gap-10 lg:pr-15 2xl:pr-20'>
            <article className="w-25 flex flex-col items-center gap-1 md:justify-center sm:w-40 2xl:w-55 2xl:gap-4">
              <IncrementNumber targetNumber={30} shouldAnimate={hasAnimated} />
              <Text
                margin_y={"my-0"}
                text_size={"text-xs sm:text-sm md:text-base 2xl:text-xl"}
                text_case={"uppercase"}
              >
                Organizaciones sociales articuladas
              </Text>
            </article>
            <article className="w-25 flex flex-col items-center gap-1 md:justify-center sm:w-40 2xl:w-55 2xl:gap-4">
              <IncrementNumber targetNumber={15} shouldAnimate={hasAnimated} />
              <Text
                margin_y={"my-0"}
                text_size={"text-xs sm:text-sm md:text-base 2xl:text-xl"}
                text_case={"uppercase"}
              >
                Proyectos y programas impulsados
              </Text>
            </article>
          </article>
          <article className='w-full flex justify-end gap-3 pr-2.5 sm:pr-7 sm:gap-6 md:gap-10 lg:pr-15 2xl:pr-20'>
            <article className="w-25 flex flex-col items-center gap-1 sm:w-40 2xl:w-55 2xl:gap-4">
              <IncrementNumber targetNumber={300} shouldAnimate={hasAnimated} />
              <Text
                margin_y={"my-0"}
                text_size={"text-xs sm:text-sm md:text-base 2xl:text-xl"}
                text_case={"uppercase"}
              >
                Voluntarios/as movilizados
              </Text>
            </article>
            <article className="w-25 flex flex-col items-center gap-1 sm:w-40 2xl:w-55 2xl:gap-4">
              <IncrementNumber targetNumber={5000} shouldAnimate={hasAnimated} />
              <Text
                margin_y={"my-0"}
                text_size={"text-xs sm:text-sm md:text-base 2xl:text-xl"}
                text_case={"uppercase"}
              >
                Personas beneficiadas
              </Text>
            </article>
            <article className="w-25 flex flex-col items-center gap-1 sm:w-40 2xl:w-55 2xl:gap-4">
              <IncrementNumber targetNumber={20000} shouldAnimate={hasAnimated} />
              <Text
                margin_y={"my-0"}
                text_size={"text-xs sm:text-sm md:text-base 2xl:text-xl"}
                text_case={"uppercase"}
              >
                Horas de compromiso solidario
              </Text>
            </article>
          </article>
        </section>
      </main>
      <Footer />
    </>
  )
}