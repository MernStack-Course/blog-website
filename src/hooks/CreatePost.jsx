import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firbaseConfig";
import { toast } from "react-toastify";
import * as yup from 'yup'

export const useCreatePost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const postSchema = yup.object({
        title: yup.string().required().min(4), 
        content:yup.string().required().min(10)
  })

  const createPost = async (data) => {
    setIsLoading(true)
    try {
      const postCollection = collection(db, "post");
      await addDoc(postCollection, data);
        setIsLoading(false)
      toast("New post created successfully ", "success");
    } catch (error) {
        setIsLoading(false)
      toast("Something happen wrong,  please try again ");
      console.log(error);
    }
  };



  return {
      setError,
      error,
      postSchema,  
      isLoading, 
      createPost, 
  };
};
