import { Carousel } from "react-responsive-carousel";
import logo from "../../assets/logo_floreria.png";
export const Anuncio = ({ allFlowers }) => {
  console.log(allFlowers[allFlowers.length - 1]?.imageURL);
  return (
    <div className=" col-start-1 col-end-3 w-full relative ">
      <Carousel
        autoPlay={true}
        showThumbs={false}
        infiniteLoop
        showArrows={false}
        transitionTime={3}
      >
        <div className="w-full h-[274px] bg-[rgba(0,0,0,0.9)]" style={{ opacity: 0.8 }}>
          <img
            style={{ opacity: 0.8 }}
            className="w-full h-full  object-cover"
            src={allFlowers[allFlowers.length - 1]?.imageURL}
          />
        </div>
        <div className="w-full h-[274px] bg-[rgba(0,0,0,0.9)]" style={{ opacity: 0.8 }}>
          <img
            style={{ opacity: 0.8 }}
            className="w-full h-full  object-cover"
            src={allFlowers[allFlowers.length - 2]?.imageURL}
          />
        </div>
        <div className="w-full h-[274px] bg-[rgba(0,0,0,0.9)]" style={{ opacity: 0.8 }}>
          <img
            style={{ opacity: 0.8 }}
            className="w-full h-full  object-cover"
            src={allFlowers[allFlowers.length - 3]?.imageURL}
          />
        </div>
        <div className="w-full h-[274px] bg-[rgba(0,0,0,0.9)]" style={{ opacity: 0.8 }}>
          <img
            style={{ opacity: 0.8 }}
            className="w-full h-full  object-cover"
            src={allFlowers[allFlowers.length - 4]?.imageURL}
          />
        </div>
        <div className="w-full h-[274px] bg-[rgba(0,0,0,0.9)]" style={{ opacity: 0.8 }}>
          <img
            style={{ opacity: 0.8 }}
            className="w-full h-full  object-cover"
            src={allFlowers[allFlowers.length - 5]?.imageURL}
          />
        </div>
      </Carousel>
      <div className="absolute top-0 w-full h-full">
        <h2 className="bg-[rgba(255,255,255,0.8)] font-mono text-center text-xl text-black">Lo mas nuevo 2023</h2>
        <img src={logo} alt="logo" className="w-[100px] absolute bottom-2 left-2   " />
      </div>
    </div>
  );
};
