import { useEffect, useRef, useState } from "react";
import { images } from "@/data/images"
import { Image } from "@/components/gral/images/Image"
import { Text } from "@/components/gral/texts/Text"

export const CarouselImages = () => {
  const carouselRef = useRef(null);
  const [itemWidth, setItemWidth] = useState(150);
  const [height, setHeight] = useState(750);
  const gap = 12;
  const itemWidthWithGap = itemWidth + gap;
  const numberOfImages = images.length;
  const totalWidth = numberOfImages * itemWidthWithGap;
  const animationDuration = 60;

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth < 640) {
        setItemWidth(230);
        setHeight(190);

      } else {
        setItemWidth(460);
        setHeight(320);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  })

  useEffect(() => {
    let animationFrameId;
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;
      const progress = elapsedTime / (animationDuration * 1000);

      if (progress > 1) {
        startTime = timestamp;
      }

      const translateX = -progress * totalWidth;
      carouselRef.current.style.transform = `translateX(${translateX}px)`;
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [totalWidth, animationDuration]);

  const carouselImages = [...images, ...images];

  return (
    <>
      <section className='overflow-hidden scrollbar-hide'>
        <article
          ref={carouselRef}
          className="flex"
          style={{
            width: `${(numberOfImages * 2) * (itemWidth + gap)}px`, height: height
          }}
        >
          {carouselImages.map((image, index) => (
            <article
              key={index}
              style={{ width: `${itemWidth}px`, marginRight: `${gap}px` }}
              className={`h-full cursor-pointer overflow-hidden bg-primary rounded-lg flex flex-col relative top-0 left-0`}
              onClick={() => openPopup(image)}
            >
              <Image
                height={"h-8/10"}
                image={image.image}
                alt={image.altImage}
                borderTopLeftRadius={"10px"}
                borderTopRightRadius={"10px"}
                objectPosition={"top"}
              />
              <Text
                color_children={"text-white"}
                font_style={"font-oswald-bold"}
                text_size={"text-base sm:text-xl xl:text-2xl"}
                text_case={"uppercase overflow-hidden text-ellipsis line-clamp-1"}
                height={"h-2/10"}
              >
                {image.text}
              </Text>
            </article>
          ))}
        </article>
      </section>
    </>
  )
}