import Particless from '../Common/Particles/Particless';
import Carousel from './Carousel/Carousel';
import Header from './Header/Header';
import './Carousel/css/embla.css';

const OPTIONS = { loop: true };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const GalleryPage = () => {
  return (
    <>
      <Header />
      <Carousel slides={SLIDES} options={OPTIONS} />
      <Particless />
    </>
  );
};

export default GalleryPage;
