import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { environments } from "../environments/env.development";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useCreatePost } from "../hooks/CreatePost";
import UploadImageHolder from "../../public/images/placeholder.jpg";
import CustomModal from "../components/CustomModal";
import { useCategory } from "../hooks/Category";

function CreatePost() {
  const TINYMCE_API_KEY = environments.TINYMCE_API_KEY;
  const contentRef = useRef("");
  const { postSchema, isLoading, createPost } = useCreatePost();
  const {
    category,
    createCategory,
    isLoading: isLoad,
    setCategory,
    validationSchema,
  } = useCategory();
  const [post, setPost] = useState({
    title: "",
    content: "",
  });

  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);

  function handleFileChange(e) {
    e.preventDefault();
    const files = e.target.files;
    const imageUrls = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setImages(imageUrls);
    if (files[0] instanceof File) {
      setFiles(files);
    }
  }
  const [error, setErrors] = useState({ title: [], content: [] });

  const handleChange = async (fieldName, value) => {
    setPost((prev) => ({
      ...prev,
      [fieldName]:
        fieldName === "content" ? contentRef.current.getContent() : value,
    }));
  };

  const handleCategoryChange = (fieldName, value) => {
    setCategory({
      [fieldName]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(category, { abortEarly: false });
    } catch (errors) {
      const newErrors = {};
      errors.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await postSchema.validate(post, { abortEarly: false });
      const postObject = {
        title: post.title,
        content: post.content,
        slug: post.title + Date.now(),
        user: localStorage.getItem("user") ? localStorage.getItem("user") : "",
      };
      await createPost(postObject, files);
      contentRef.current.setContent("");
      setPost({ title: "", content: "" });
      setErrors({ title: [], content: [] });
    } catch (validateError) {
      let newErrors = { title: [], content: [] };
      validateError.inner.forEach((err) => {
        newErrors[err.path] = [...newErrors[err.path], err.message];
      });
      setErrors(newErrors);
    }
  };

  function deleteImage(imageIndex) {
    const restImages = images.filter((_, index) => index !== imageIndex);
    setImages(restImages);
  }
  return (
    <div>
      <div className="max-w-4xl mt-10 mx-auto border border-gray-300 rounded-lg  px-4 py-6">
        <h1 className="mb-4 font-bold text-xl">Create New Post </h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-2">
            <CustomInput
              type="text"
              label="Post title"
              placeholder="post title ..."
              value={post.title}
              onChange={(value) => handleChange("title", value)}
            />
            {error &&
              error["title"].map((message, index) => (
                <li className="text-red-500 list-none" key={index}>
                  {message}
                </li>
              ))}
          </div>
          <div className="mb-1">
            <label htmlFor="conttent" className="font-bold text-md mb-1">
              Post Content
            </label>
            <div className="mb-1">
              <Editor
                value={contentRef.current}
                onChange={(value) => handleChange("content", value)}
                apiKey={TINYMCE_API_KEY}
                onInit={(_evt, editor) => (contentRef.current = editor)}
                initialValue="<p>write whatever you want..</p>"
                init={{
                  height: 300,
                  menubar: false,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "image" +
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
              />
              {error &&
                error["content"].map((message, index) => (
                  <li className="text-red-500 list-none" key={index}>
                    {message}
                  </li>
                ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {images &&
                images.map((image, index) => (
                  <div className="w-40 h-30  relative rounded-lg" key={index}>
                    <img src={image} alt="" className="w-40 h-30" />
                    <button
                      type="button"
                      onClick={() => deleteImage(index)}
                      className="absolute top-0 w-8  h-8 cursor-pointer rounded-full hover:bg-red-500 hover:text-white"
                    >
                      ❌
                    </button>
                  </div>
                ))}
            </div>
            <div className="mt-4 flex items-end justify-end gap-4">
              <div className="">
                <label htmlFor="image">
                  <img
                    src={UploadImageHolder}
                    className="w-40 rounded-md p-4 border h-30 border-gray-300 cursor-pointer  border-dashed "
                  />
                </label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  id="image"
                  hidden
                />
              </div>
            </div>
          </div>
          <div className="mb-2">
            <CustomButton type="submit" label="Create" isLoading={isLoading} />
          </div>
        </form>
      </div>

      {/* ========  category modal  ======== */}
      <CustomModal title="New Category" onSubmit={onSubmit}>
        <CustomInput
          value={category.displayName}
          onChange={(value) => handleCategoryChange("displayName", value)}
        />
        <CustomInput
          value={category.name}
          onChange={(value) => handleCategoryChange("name", value)}
        />
      </CustomModal>
    </div>
  );
}

export default CreatePost;
