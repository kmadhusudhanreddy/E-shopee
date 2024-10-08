import BannerImage from "../images/BannerImage.jpg";

const Banner = () => {
  return (
    <div
      className="w-full h-96 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${BannerImage})` }} // Use the imported image variable
    >
      <div className="flex justify-center items-center h-full">
        <div className="flex flex-col justify-center items-center bg-opacity-50">
          <h1 className="text-white text-4xl font-bold mb-4">
            Welcome to Our Store!
          </h1>
          <a
            href="shop"
            className="px-6 py-3 bg-black text-white text-lg font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
          >
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
