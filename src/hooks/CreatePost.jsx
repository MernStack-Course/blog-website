import { addDoc, collection, getDocs } from "firebase/firestore";
import {
  ref,
  getStorage,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { storage ,db } from "../firbaseConfig";
import { toast } from "react-toastify";
import * as yup from "yup";

export const useCreatePost = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const postSchema = yup.object({
    title: yup.string().required().min(4),
    content: yup.string().required().min(10),
  });

  const createPost = async (data, files) => {

    setIsLoading(true);
    try {
      if(files){
      console.log(files);
        await  uploadImages(files)
      }
      const postCollection = collection(db, "post");
      await addDoc(postCollection, data);
      setIsLoading(false);
      toast("New post created successfully ", "success");
    } catch (error) {
      setIsLoading(false);
      toast("Something happen wrong,  please try again ");
      console.log(error);
    }
  };

  const uploadImages = async (files) => {
    try {
      const storageRef = ref(
        storage,
        `images/${Array.from(files).map((file) => file.name)}`
      );
     const uploadImage = await uploadBytesResumable(storageRef, files, {
        contentType: 'multipart/form-data'
     });
     console.log(uploadImage);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  const getPosts = async () => {
    setIsLoading(true);
    try {
      const postCollection = collection(db, "post");
      const data = await getDocs(postCollection);
      const allPost = data.docs.map((post) => post.data());
      setIsLoading(false);
      setPosts(allPost);
    } catch (error) {
      setIsLoading(false);
      setError(error);
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return {
    createPost,
    getPosts,
    posts,
    setError,
    error,
    postSchema,
    isLoading,
  };
};
