import { toast } from "react-toastify";
import { secureAxiosInstance } from "../apiInterceptor";
export const dislike = async (id) => {
  const encodedToken = localStorage.getItem("token");
  const userDetailsString = localStorage.getItem("userDetails");
  const userDetails = JSON.parse(userDetailsString);
  try {
    const res = await secureAxiosInstance({
      method: "POST",
      headers: { authorization: encodedToken },
      url: `/posts/dislike/${id}`,
      data: {
        userId: userDetails._id,
      },
    });

    if (res.status === 201) {
      const allPosts = res.data.posts;
      const myPost = res.data.posts?.filter((item) => item.userId === id);
      return { allPosts: allPosts, myPost: myPost };
    }
  } catch (e) {
    toast.error("Failed to dislike Post");
    console.log("error occured: ", e);
  }
};
