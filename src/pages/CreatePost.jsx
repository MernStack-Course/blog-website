import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { environments } from "../environments/env.development";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useCreatePost } from "../hooks/CreatePost";

function CreatePost() {
  const TINYMCE_API_KEY = environments.TINYMCE_API_KEY;
  const contentRef = useRef("");
  const { postSchema, isLoading, createPost } = useCreatePost();
  const [post, setPost] = useState({
    title: "",
    content: "",
  });

  const [error, setErrors] = useState({ title: [], content:[]});

  const handleChange = async (fieldName, value) => {
    setPost((prev) => ({
      ...prev,
      [fieldName]:
        fieldName === "content" ? contentRef.current.getContent() : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await postSchema.validate(post, { abortEarly: false });
      const postObject = {
           title: post.title, 
           content: post.content, 
           slug: post.title + Date.now(), 
           user: localStorage.getItem('user') ? localStorage.getItem('user') : ''
      }
      await createPost(postObject)
      contentRef.current.setContent('')
      setPost({title:'', content:''})
      setErrors({title:[], content:[]})
    } catch (validateError) {
      let newErrors = { title: [], content: [] };
      validateError.inner.forEach((err) => {
        newErrors[err.path] = [...newErrors[err.path], err.message];
      });
      setErrors(newErrors);
    }
  };

  return (
    <div>
      <div className="max-w-4xl mt-10 mx-auto border border-gray-300 rounded-lg  px-4 py-6">
        <h1 className="mb-4 font-bold text-xl">Create New Post </h1>
        <form onSubmit={handleSubmit}>
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
                <li className="text-red-500 list-none" key={index}>{message}</li>
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
                <li className="text-red-500 list-none" key={index}>{message}</li>
              ))}
            </div>
          </div>
          <div className="mb-2">
            <CustomButton type="submit" label="Create"  isLoading={isLoading} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
