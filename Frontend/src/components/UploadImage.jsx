import { useState } from "react";
import axios from "axios";

const ImageUpload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/createImage",
        formData
      );

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} enctype="multipart/form-data">
      <div>
        <label>Title</label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label>Description</label>

        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label>Image</label>

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>

      <button type="submit">
        Upload
      </button>
    </form>
  );
};

export default ImageUpload;