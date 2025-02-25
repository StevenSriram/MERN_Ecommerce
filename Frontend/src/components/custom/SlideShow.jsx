import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Slideshow = ({ slides }) => {
  const [curSlide, setCurSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[400px] lg:h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <img
          key={index}
          src={slide}
          alt={`Slide ${index + 1}`}
          className={`${
            curSlide === index ? "opacity-100" : "opacity-0"
          } absolute top-0 left-0 w-full h-full object-cover max-md:object-right-top transition-opacity duration-1000 ease-in-out`}
        />
      ))}
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        onClick={() =>
          setCurSlide(
            (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
          )
        }
      >
        <ChevronLeftIcon className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        onClick={() =>
          setCurSlide((prevSlide) => (prevSlide + 1) % slides.length)
        }
      >
        <ChevronRightIcon className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default Slideshow;
