import { Link, useParams } from "react-router-dom";
import { Header } from "@/components/gral/header/Header"
import { Text } from "@/components/gral/texts/Text"
import { IconArrowCircleLeft, IconCalendar } from "@/components/icons/Icons";
import { NewsCard } from "./NewsCard";
import { Footer } from "@/components/gral/footer/Footer";
import { useEffect, useState } from "react";
import { Image } from "@/components/gral/images/Image";
import { NewsService } from "@/service/NewsService";

const { getNewsById, getAllNews } = NewsService()

const getById = (id, setSelectedNews) => {
  getNewsById(id).then((response) => {
    setSelectedNews(response.data)
  }).catch(error => {
    console.log(error);
  });
}

const getNews = (setNews) => {
  getAllNews()
    .then((response) => {
      setNews(response.data);
    })
    .catch((error) => {
      console.error(error);
      setNews([]);
    });
};

export const NewsUnique = () => {
  // a través del parámetro de la URL agarra el ID
  const { id } = useParams();
  // selecciona la noticia del array de noticias gracias al ID
  const [selectedNews, setSelectedNews] = useState(null);
  const [news, setNews] = useState([]);
  const [moreNews, setMoreNews] = useState(innerWidth >= 640 ? 3 : 2);
  const formattedDate = new Date(selectedNews?.date).toLocaleDateString('es-AR', { // 'es-AR' para español argentino
    year: 'numeric',
    month: 'long',  // Nombre completo del mes
    day: 'numeric'
  })
    .replace(/(\d+) de (\w+) de (\d+)/, '$2 $1, $3')
    .replace(/^\w/, (char) => char.toUpperCase());
  // separar los parrafos de la descripción a través de los saltos de linea "\n"  
  const paragraphs = selectedNews?.description ? selectedNews.description.split(/\n+/) : [];

  // Sección más novedades ordenadas por fecha de la más actual hasta la menos.
  const currentDate = new Date().toISOString().slice(0, 10);
  console.log(currentDate);

  const recentNews = news.filter((item) => item.id_news != id).sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, moreNews);
  console.log(recentNews);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleResize = () => {
      setMoreNews(innerWidth >= 640 ? 3 : 2);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    getById(id, setSelectedNews)
    getNews(setNews)
  }, [id])

  return (
    <>
      <Header />
      <main>
        <section className="w-9/10 mx-auto my-5 md:w-8/10 lg:my-10">
          {selectedNews ?
            <article className="flex flex-col gap-3 sm:gap-5 lg:gap-10">
              <Text
                width={"w-fit"}
                margin_x={"mx-0"}
                font_style={"font-oswald-bold"}
                text_case={"uppercase lg:normal-case"}
                text_position={"tex-left"}
                text_size={"text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl"}
              >
                {selectedNews.title}
              </Text>
              <article className="flex items-center gap-2.5 md:mt-3 lg:mt-2 lg:-mb-5">
                <IconCalendar />
                <Text
                  width={"w-fit"}
                  margin_x={"mx-0"}
                  text_size={"text-sm lg:text-base"}
                >
                  {formattedDate}
                </Text>
              </article>
              <Image
                height={"h-auto sm:h-75 md:h-110 lg:h-130"}
                objectFit={"contain"}
                image={selectedNews.image ? `data:${selectedNews.typeImage};base64,${selectedNews.image}` : null} altImage={selectedNews.imageCaption}
              />
              <article className="flex flex-col items-start gap-5 w-9/10">
                <article className="bg-secondary p-2.5">
                  <Text
                    color_children={"text-gray-accent-light-2"}
                    text_position={"text-left"}
                    text_size={"text-sm md:text-base lg:text-lg xl:text-xl"}
                    font_style={"font-roboto"}
                  >
                    {selectedNews.epigraph}
                  </Text>
                </article>
                {paragraphs.map((paragraph, index) => (
                  <Text
                    key={index}
                    color_children={"text-gray-accent-light-2"}
                    text_position={"text-left"}
                    text_size={"text-sm md:text-base xl:text-lg"}
                    font_style={"font-roboto"}
                    variant={"paragraph"}
                  >
                    {paragraph}
                  </Text>
                ))}
              </article>
              <section>
                {recentNews.length > 0 && (
                  <>
                    <Text
                      text_position={"text-left"}
                      text_size={"text-lg md:text-xl"}
                      margin_x={"mx-0"}
                      margin_y={"my-5"}
                    >
                      MÁS NOVEDADES
                    </Text>
                    <article className="flex gap-2.5 items-center flex-nowrap w-full sm:justify-between sm:gap-0">
                      {recentNews?.map((item) => (
                        <Link
                          to={`/news/${item.id_news}`}
                          key={item.id_news}
                          className="w-50/100 sm:w-32/100"
                        >
                          <NewsCard
                            {...item}
                            height={"h-60 sm:h-65 md:h-80 lg:h-90 xl:h-100"}
                          />
                        </Link>
                      ))}
                    </article>
                  </>
                )}
                <Link to={`/news`} className="flex items-center gap-2.5 text-primary-s2 text-lg uppercase mt-7.5">
                  <IconArrowCircleLeft />
                  Noticias
                </Link>
              </section>
            </article>
            :
            <article className="h-80 flex items-center">
              <Text
                color_children={"text-red-500"}
                text_case={"uppercase"}
              >
                Hubo un error al cargar la noticia
              </Text>
            </article>
          }
        </section>
      </main>
      <Footer />
    </>
  )
}