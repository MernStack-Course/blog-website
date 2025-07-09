import { useState } from "react";
import * as Yup from "yup";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firbaseConfig";
import { toast } from "react-toastify";

export const useCategory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({
    name: "",
    displayName: "",
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    displayName: Yup.string().required(),
  });

  const createCatgory = async (data) => {
    setIsLoading(true);
    try {
      const categoryCollection = collection(db, "category");
      await addDoc(categoryCollection, data);
      setIsLoading(false);
      toast.success("New category has been created successfully");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return {
    isLoading,
    categories,
    category,
    setCategory, 
    validationSchema,
    createCatgory,
  };
};
