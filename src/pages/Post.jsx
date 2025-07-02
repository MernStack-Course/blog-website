
import { useCreatePost } from "../hooks/CreatePost";
import {useUnsplash} from '../hooks/Unsplash'
function Post() {
  const { posts, isLoading } = useCreatePost();
  const { images  } = useUnsplash()

 
  
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
          posts.map((post, index)  => (
            <div  key={index} className="border border-blue-500 h-[350px] rounded-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out">
              <div className="w-full h-40">
                  {/* { images && images.map((image) =>    <img src={image.urls.raw} alt={image.slug} key={image.id} />) }  */}
              </div>
              <div className="w-full px-2">
                <h1 className="font-bold text-lg mb-2">{post.title}</h1>
                <p dangerouslySetInnerHTML={{__html: post.content}}></p>
                <div>
                  <span></span>
                  {/* <span>{post?.user.name}</span> */}
                  {/* <img src={environments.UNSPLASH_URL+'a-fluffy-bird-perches-on-a-branch-QQ2UBKYS85o'+`?client_id=${environments.UNSPLASH_ACCESS_KEY}`} className="w-40" alt="" /> */}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Post;
