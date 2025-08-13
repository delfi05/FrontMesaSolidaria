import { useEffect } from "react";
import { NewsCard } from "./NewsCard"
import { Link } from "react-router-dom"

export const NewsCards = ({ news }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <article className="flex justify-between flex-wrap w-full gap-2 sm:gap-5 md:gap-3 md:justify-start lg:gap-4 xl:gap-5.5">
      {news?.map((newsItem) => (
        <Link
          to={`/news/${newsItem.id_news}`}
          key={newsItem.id_news}
          className="w-48/100 md:w-32/100"
        >
          <NewsCard
            height={"h-60 sm:h-68 md:h-77 lg:h-90 xl:h-100"}
            gap={"gap-1 sm:gap-3 md:gap-1 xl:gap-2"}
            {...newsItem}
          />
        </Link>
      )
      )}
    </article>
  )
}