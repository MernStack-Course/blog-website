import { useCreatePost } from "../hooks/CreatePost";

function Post() {
  const { posts, isLoading } = useCreatePost();
  if (isLoading) {
    return (
      <div className="w-full text-center  mx-auto mt-10">
        {isLoading && <span>Please wait is loading.... </span>}
      </div>
    );
  }
  return (
    <div className="w-full mx-auto max-w-7xl mt-10">
      <h1 className="flex items-baseline font-bold text-2xl mb-2">
        Recent Posts{" "}
      </h1>
      <hr className="bg-blue-600 rounded-full h-1" />

      <div className=" grid grid-cols-4 gap-3 mt-10">
        {posts &&
          posts.map((post, index) => (
            <div  key={index} className="border border-blue-500 h-[350px] rounded-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out">
              <div className="bg-gray-500 w-full h-40"></div>
              <div className="w-full px-2">
                <h1 className="font-bold text-lg mb-2">{post.title}</h1>
                <p dangerouslySetInnerHTML={{__html: post.content}}></p>
                <div>
                  <span></span>
                  {/* <span>{post?.user.name}</span> */}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Post;
