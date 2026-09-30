import { useEffect, useState } from "react";
import axios from "axios";

const ImagePage = () => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const getImages = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/getImage");

        setImage(response.data.image);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getImages();
  }, []);

  console.log(image);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {image?.map((image) => (
        <div
          key={image._id}
          className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-1"
        >
          <img
            src={`http://localhost:4000/upload/${image?.image}`}
            alt={image.title}
            className="w-full h-56 object-cover"
          />

          <div className="p-5">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {image.title}
            </h2>

            <p className="text-gray-600 text-sm leading-6">
              {image.description?.slice(0, 100)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImagePage;
