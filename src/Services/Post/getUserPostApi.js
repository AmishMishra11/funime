import axios from "axios";

export const getUserPosts = async (userName) => {
  const res = await axios({
    method: "GET",
    url: `/api/posts/user/${userName}`,
  });

  return res.data.posts;
};
