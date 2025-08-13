import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/gral/buttons/Button";
import { Image } from "@/components/gral/images/Image";
import { Text } from "@/components/gral/texts/Text"
import { IconBook, IconCalendar } from "@/components/icons/Icons"

// AGREGUE VARIABLE HOME ------------------------------>>>>>>>>>>>>>>>>>>>> PARA INDICAR LOS
// ESTILOS A REALIZAR EN LA SECCION HOME.
export const NewsCard = ({ title, date, summary, image, typeImage, imageCaption, width, width_img_home, height, height_img_home, gap, home, objectFit }) => {
  const titleRef = useRef(null);
  const summaryRef = useRef(null);
  const [titleMaxLength, setTitleMaxLength] = useState(title);
  const [summaryMaxLength, setSummaryMaxLength] = useState(summary);

  const truncateTextByWidth = (text, ref, setTruncatedText) => {
    if (!ref.current) return;
    const containerWidth = ref.current.offsetWidth;
    const approxCharsPerPixel = 0.6; // Estimación: ajusta según tu fuente y estilo
    const maxChars = Math.floor(containerWidth * approxCharsPerPixel);

    if (text.length > maxChars) {
      setTruncatedText(text.substring(0, maxChars) + "...");
    } else {
      setTruncatedText(text);
    }
  };

  const formattedDate = new Date(date).toLocaleDateString('es-AR', { // 'es-AR' para español argentino
    year: 'numeric',
    month: 'long',  // Nombre completo del mes
    day: 'numeric'
  })
  .replace(/(\d+) de (\w+) de (\d+)/, '$2 $1, $3')
  .replace(/^\w/, (char) => char.toUpperCase());

  useEffect(() => {
    const handleResize = () => {
      truncateTextByWidth(title, titleRef, setTitleMaxLength);
      truncateTextByWidth(summary, summaryRef, setSummaryMaxLength);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [title, summary]);

  return (
    <section className={`bg-neutral-50 hover:bg-neutral-100 ${width ? width : "w-full"}
                         ${height ? height : ""}
                         flex flex-col ${home ? "lg:flex-row-reverse" : ""}
    `} style={{ boxShadow: "2px 3px 7px 0 rgba(0,0,0,0.2)" }}>

      <Image width={`${width_img_home ? `${width_img_home}` : "w-full"}`} height={`${height_img_home ? `h-28 md:h-35 lg:h-1/2 ${height_img_home}` : "h-28 md:h-35 lg:h-1/2"}`} objectPosition={"top"} objectFit={objectFit || "cover"} image={image ? `data:${typeImage};base64,${image}` : null} altImage={imageCaption} />
      <article className={`w-95/100 overflow-hidden
                          flex flex-col items-start ${gap ?? "gap-1"}
                          mx-auto py-2 lg:py-2 xl:py-3 ${home ? "lg:justify-center lg:gap-5 lg:ml-7" : ""}
                         `}>
        <Text
          ref={titleRef}
          color_children={`${home ? "text-gray-accent-light-2 lg:text-gray-accent-light-1" : "text-gray-accent-light-2"}`}
          text_size={`${home ? "text-base/4.5 sm:text-lg/6 lg:text-2xl xl:text-3xl" : "text-base/4.5 sm:text-lg/6 lg:text-xl xl:text-2xl/8"}`}
          font_style={"font-oswald-bold"}
          text_position={"text-left"}
          text_case={"uppercase overflow-hidden text-ellipsis whitespace-normal line-clamp-2"}
          width={`${home ? "w-full lg:w-2/3" : "w-full"}`}
          margin_x={"mx-0"}
          margin_y={`${home ? "my-auto lg:my-0" : "my-auto"}`}
        >
          {titleMaxLength}
        </Text>
        <article className="flex justify-start items-center gap-1 w-full">
          <article>
            <IconCalendar />
          </article>
          <Text
            color_children={"text-gray-accent-light-2"}
            font_style={"font-roboto-italic"}
            text_size={"text-xs md:text-sm xl:text-base"}
            width={"w-fit"}
            margin_x={"mx-0"}
            padding_y={"md:pt-1"}
            variant={"paragrafh"}
          >
            {formattedDate}
          </Text>
        </article>
        <Text
          ref={summaryRef}
          color_children={"text-gray-accent-light-1"}
          text_size={`${home ? "text-xs sm:text-sm md:text-base lg:text-lg" : "text-xs sm:text-sm md:text-base"}`}
          text_position={"text-left overflow-hidden text-ellipsis whitespace-normal line-clamp-3"}
          width={`${home ? "w-full lg:w-1/2" : "w-full"}`}
          margin_x={`${home ? "mx-auto lg:mx-0" : "mx-auto"}`}
          margin_y={`${home ? "my-auto lg:my-0" : "my-auto"}`}
          variant={"paragrafh"}
        >
          {summaryMaxLength}
        </Text>
        {home && (
          <article className="hidden lg:flex">
            <Button
              bg_color={"bg-primary-s2"}
              hover_bg={"hover:bg-primary-s1"}
              py={"py-3 lg:py-2 xl:py-3"}
              px={"px-10 lg:px-3 xl:px-5"}
              text_size={"text-sm xl:text-base"}
              icon={<IconBook />}
              iconWidth={"w-full"}
              iconHeight={"w-full"}
            >
              Seguir Leyendo
            </Button>
          </article>
        )}
      </article>
    </section>
  )
}