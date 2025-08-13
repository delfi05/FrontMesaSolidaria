import React, { useState, useEffect, useRef } from 'react';
import { Text } from '@/components/gral/texts/Text';

export const IncrementNumber = ({ targetNumber, shouldAnimate }) => {
  const [count, setCount] = useState(0);
  const animationFrame = useRef(null);

  useEffect(() => {
    if (shouldAnimate) {
      let start = null;
      const duration = 2000; // Duración de la animación en milisegundos

      const animate = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        setCount(Math.floor(progress * targetNumber));
        if (progress < 1) {
          animationFrame.current = requestAnimationFrame(animate);
        }
      };

      animationFrame.current = requestAnimationFrame(animate);
    } else {
      setCount(0); // Reinicia el contador si no debe animar
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current); // Cancela cualquier animación en curso
      }
    }

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current); // Limpieza al desmontar
      }
    };
  }, [shouldAnimate, targetNumber]);

  return (
    <Text
      margin_y={"my-0"}
      color_children={"text-secondary-s2"}
      font_style={"font-oswald-bold"}
      text_size={"text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl"}
    >
      +{isNaN(count) ? 0 : count}
    </Text>
  );
};