import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import MovieCard from "../components/MovieCard";

const SliderCarousel = ({ data }) => {

  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed : 2000,

  };

  return (
   <div>
    <Slider {...settings}>
    {data.map((movie) => (
      <MovieCard key={movie.id} movie={movie} />
    ))}
    </Slider>
   </div>
  );
};

export default SliderCarousel;

