import banner from '../assets/banner.svg';
const Banner = () => {
  return (
    <div className='h-100 alignBanner'>
      <img
        width='100%'
        className='bannerImage'
        src={banner}
      />
    </div>
  );
};

export default Banner;
