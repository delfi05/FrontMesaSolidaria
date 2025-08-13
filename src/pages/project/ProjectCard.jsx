import { useEffect, useRef, useState } from "react";
import { Text } from "@/components/gral/texts/Text"
import { Image } from "@/components/gral/images/Image";

export const ProjectCard = ({ color_children, title, image, typeImage,
  width, height, height_image, text_shadow,
  relative, absolute, top, bottom, padding_y, text_transform, text_translate,
  rounded, blur, icon, top_icon, bg_icon, text_icon, isMockImage }) => {
  const titleRef = useRef(null);
  const [titleMaxLength, setTitleMaxLength] = useState(title);

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

  useEffect(() => {
    const handleResize = () => {
      truncateTextByWidth(title, titleRef, setTitleMaxLength);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [title]);

  return (
    <>
      <section className={`${width ?? "w-full"} ${height} bg-gray-900 ${relative} overflow-hidden cursor-pointer font-oswald-bold text-secondary ${rounded ?? "rounded-2xl"}`}>
        <Image
          image={isMockImage ? image : `data:${typeImage};base64,${image}`}
          altImage={`imagen de: ${title} `}
          height={height_image ?? "h-full"}
          width={"w-full"}
          objectPosition={"top"}
          blur={blur}
          position={absolute}
          bottom={bottom}
          z_index={"-1"}
        />
        <article>
          <Text
            ref={titleRef}
            height={"h-auto sm:h-max"}
            padding_x={"px-2"}
            padding_y={padding_y}
            top={top}
            position={absolute}
            color_children={color_children ?? "text-secondary"}
            font_style={"font-oswald-bold"}
            text_size={"text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl"}
            text_position={"text-left whitespace-nowrap"}
            text_case={"uppercase overflow-hidden text-ellipsis whitespace-normal"}
            text_shadow={text_shadow}
            text_transform={text_transform}
            text_translate={text_translate}
          >
            {titleMaxLength}
          </Text>
          {icon && (
            <figure className={`${absolute} ${top_icon} ${text_transform} ${text_translate} ${bg_icon} right-7 md:w-50 md:h-9 2xl:w-60 2xl:h-12 md:flex md:justify-between md:items-center md:pr-2 md:rounded-sm`}>
              <span className="hidden md:flex md:ml-4">
                {text_icon}
              </span>
              {icon}
            </figure>
          )}
        </article>
      </section>
    </>
  )
}
