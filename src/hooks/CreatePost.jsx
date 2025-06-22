import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firbaseConfig";
import { toast } from "react-toastify";

export const useCreatePost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    title: "",
    content: "",
  });

  const [post, setPost] = useState({
    title: "",
    content: null,
    slug: "",
    userId: "",
  });


  const postValidator = (errror)=> {
      
  }

  const createPost = async (data) => {
    try {
      const postCollection = collection(db, "post");
      await addDoc(postCollection, data);
      toast("New post created successfully ", "success");
    } catch (error) {
      toast("Something happen wrong,  please try again ");
      console.log(error);
    }
  };

  return {
      error, 
      isLoading, 
      post, 
      setPost, 
      createPost, 
      postValidator
  };
};
