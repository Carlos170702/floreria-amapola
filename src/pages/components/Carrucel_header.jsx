import "react-responsive-carousel/lib/styles/carousel.min.css";
import carrucel1 from "../../assets/carrucel1.jpg";
import carrucel2 from "../../assets/carrucel2.jpg";
import carrucel3 from "../../assets/carrucel3.jpg";
import flor_decoration from "../../assets/flor_decoration.png";
import { Carousel } from "react-responsive-carousel";

export const Carrucel_header = () => {
  return (
    <div className="relative">
      <Carousel
        autoPlay={true}
        showThumbs={false}
        infiniteLoop
        showArrows={false}
        transitionTime={1}
      >
        <div
          className="w-full 2-[400px] sm:h-[400px] bg-[rgba(0,0,0,0.2)]"
          style={{ opacity: 0.8 }}
        >
          <img
            style={{ opacity: 0.8 }}
            className="w-full h-full object-cover"
            src={carrucel1}
          />
        </div>
        <div className="w-full 2-[400px] sm:h-[400px] bg-[rgba(0,0,0,0.2)]">
          <img
            style={{ opacity: 0.8 }}
            className="w-full h-full object-cover"
            src={carrucel2}
          />
        </div>
        <div className="w-full 2-[400px] sm:h-[400px] bg-[rgba(0,0,0,0.2)]">
          <img
            style={{ opacity: 0.8 }}
            className="w-full h-full object-cover"
            src={carrucel3}
          />
        </div>
      </Carousel>

      <div className="absolute top-10 gap-2 flex w-full justify-center items-center">
        <img src={flor_decoration} alt="decoracion" className="h-20 hidden md:block" />
        <h2 className="font-bold text-lg text-justify">
          ¡TU FUENTE CONFIABLE DE FLORES FRESCAS Y HERMOSAS!
        </h2>
        <img src={flor_decoration} alt="decoracion" className="h-20 hidden md:block" />
      </div>
    </div>
  );
};
