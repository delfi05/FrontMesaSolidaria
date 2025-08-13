import { Header } from "@/components/gral/header/Header"
import { Text } from "@/components/gral/texts/Text"
import { ProjectsCards } from "./ProjectsCards"
import { Image } from "@/components/gral/images/Image"
import { MyPagination } from "@/components/gral/pagination/MyPagination"
import { useEffect, useState } from "react"
import { Footer } from "@/components/gral/footer/Footer"

export const Projects = ({ projects }) => {
  const [actualPage, setActualPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4); //para celu

  // Ajustar itemsPerPage basado en el tamaño de la pantalla
  const setPageSize = () => {
    if (window.innerWidth >= 1280) {
      setItemsPerPage(8);
    }
    else if (window.innerWidth >= 480) {
      setItemsPerPage(6);
    } else {
      setItemsPerPage(4);
    }
    setActualPage(1);
  };

  useEffect(() => {
    setPageSize();
    window.addEventListener("resize", setPageSize);
    return () => window.removeEventListener("resize", setPageSize);
  }, []);
  //si esta en el punto 4 y se agranda la pagina que se vuelva al punto anterior 
  const startIndex = (actualPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const actualProjects = projects.slice(startIndex, endIndex);

  const calculateTotalPages = (totalItems, itemsPerPage) => {
    return Math.ceil(totalItems / itemsPerPage);
  };
  const totalPages = calculateTotalPages(projects.length, itemsPerPage);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [actualPage]);

  return (
    <>
      <Header />
      <main>
        <section className="md:mt-6 md:flex md:flex-row-reverse md:items-center md:justify-between md:w-9/10 md:mx-auto
                            lg:flex lg:flex-row-reverse lg:items-center lg:justify-between lg:w-9/10">
          <Image
            image={"./img/gral/raised-hands.webp"}
            altImage={"Image raised hands"}
            objectFit={"contain"}
            width={"w-9/10 sm:w-7/10"}
            height={"h-35 md:h-full"}
            margin_y={"my-2"}
          />
          <article>
            <Text
              width={"w-9/10 md:w-8/10 lg:w-9/10"}
              text_size={"text-sm md:text-base lg:text-xl"}
              color_children={"text-gray-accent-light-1"}
            >
              En <span className="text-secondary-s1">Mesa Solidaria</span>, trabajamos para promover el bienestar social a través de proyectos que abarcan diversas áreas.
            </Text>
            <Text
              width={"w-9/10 md:w-8/10 lg:w-9/10"}
              text_size={"text-sm md:text-base lg:text-xl"}
              color_children={"text-gray-accent-light-1"}
            >
              Cada uno de nuestros programas está diseñado para generar un impacto positivo y duradero, construyendo puentes de colaboración entre organizaciones, el sector público, privado y la comunidad en general.
            </Text>
          </article>
        </section>
        <section className="flex flex-col w-9/10 mx-auto">
          {/* 

          
            VER SI SE AGREGA ESTO O NO
          
          A lo largo de estos años hemos desarrollado programas y proyectos como:
          
          
          */}
          <Text
            padding_y={"py-6"}
            text_position={"text-left"}
            text_size={"text-lg md:text-xl lg:text-2xl xl:text-3xl"}
          >
            PROYECTOS
          </Text>
          {projects.length > 0 ? (
            <>
              <ProjectsCards projects={actualProjects} />
              <section>
                <MyPagination
                  totalPages={totalPages}
                  currentPage={actualPage}
                  onPageChange={(page) => {
                    setActualPage(page)
                  }}
                />
              </section>
              <section className="mt-10">
                <Text
                  text_size={"text-base lg:text-xl"}
                  font_style={"font-oswald-bold"}
                  color_children={"text-gray-accent-light-1"}
                >
                  Creemos en la solidaridad, la innovación y el trabajo en red para transformar la realidad.
                </Text>
              </section>
            </>
          ) : (
            <aside className="text-red-400 text-2xl uppercase mx-auto w-max">No hay proyectos para mostrar</aside>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}