import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { environments } from "../environments/env.development";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

function CreatePost() {
  const TINYMCE_API_KEY = environments.TINYMCE_API_KEY;
  const contentRef = useRef("");
  return (
    <div>
      <div className="max-w-4xl mt-10 mx-auto border border-gray-300 rounded-lg  px-4 py-6">
        <h1 className="mb-4 font-bold text-xl">Create New Post </h1>
        <form action="">
          <div className="mb-2">
            <CustomInput
              type="text"
              label="Post title"
              placeholder="post title ..."
            />
          </div>
          <div className="mb-1">
            <label htmlFor="conttent" className="font-bold text-md mb-1">
              Post Content
            </label>
            <div className="mb-1">
              <Editor
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
            </div>
          </div>
          <div className="mb-2">
            <CustomButton label="Create" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
