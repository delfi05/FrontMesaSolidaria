import { useEffect, useState } from "react"
import { Footer } from "@/components/gral/footer/Footer"
import { Header } from "@/components/gral/header/Header"
import { Image } from "@/components/gral/images/Image"
import { Text } from "@/components/gral/texts/Text"
import { NewsCards } from "./NewsCards"
import { MyPagination } from "@/components/gral/pagination/MyPagination"

export const News = ({ news }) => {
  const [actualPage, setActualPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4); //para celu

  // Ajustar itemsPerPage basado en el tamaño de la pantalla
  const setPageSize = () => {
    const newItemsPerPage = window.innerWidth >= 1280 ? 9 : window.innerWidth >= 768 ? 6 : 4;
    setItemsPerPage(newItemsPerPage);
    setActualPage(1);
  };

  useEffect(() => {
    setPageSize();
    window.addEventListener("resize", setPageSize);
    return () => window.removeEventListener("resize", setPageSize);
  }, []);

  // si esta en el punto 4 y se agranda la pagina que se vuelva al punto anterior 
  const startIndex = (actualPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const actualNews = news.slice(startIndex, endIndex);

  const calculateTotalPages = (totalItems, itemsPerPage) => {
    return Math.ceil(totalItems / itemsPerPage);
  };
  const totalPages = calculateTotalPages(news.length, itemsPerPage);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [actualPage]);

  return (
    <>
      <Header />
      <main>
        <section>
          <Image
            image={"../img/news/titlepage-news-mobile.webp"}
            altImage={"Imagen portada de sección noticias"}
            height={"h-auto lg:h-100"}
          />
        </section>
        <section className="w-9/10 mx-auto">
          <Text
            text_position={"text-left"}
            text_size={"text-lg md:text-xl lg:text-2xl xl:text-3xl"}
            margin_y={"my-5 md:my-7 lg:my-10"}
            margin_x={"mx-0"}
          >
            NOTICIAS
          </Text>
          {news.length > 0 ? ( // Cambiamos la condición a verificar la longitud del array
            <NewsCards objectFit="contain" news={actualNews} />
          ) : (
            <aside className="text-red-400 text-2xl uppercase mx-auto w-max">No hay noticias para mostrar</aside>
          )}
          {news.length > 0 && ( // Solo mostrar la paginación si hay noticias
            <MyPagination
              totalPages={totalPages}
              currentPage={actualPage}
              onPageChange={(page) => {
                setActualPage(page)
              }}
            />
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}