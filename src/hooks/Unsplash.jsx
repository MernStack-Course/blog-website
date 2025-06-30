import axios from "axios";
import { useEffect, useState } from "react";
import { environments } from "../environments/env.development";

export const useUnsplash = () => {
  const [images, setImages] = useState([]);

  const getDefaultPrams = (post_length, post_title) => {
    try {
      let data = getImages(post_length, post_title);
      setImages(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getImages = async (post_length = 10, post_title = "food") => {
    try {
      const response = await axios.get(
        `${environments.UNSPLASH_URL}?client_id=${environments.UNSPLASH_ACCESS_KEY}&query=${post_title}&limit=${post_length}`
      );
      setImages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  return {
    images,
    getDefaultPrams,
  };
};
