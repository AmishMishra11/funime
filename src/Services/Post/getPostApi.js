import axios from "axios";

export const getPosts = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "/api/posts",
    });

    return res.data.posts;
  } catch (e) {
    console.log("error occured: ", e);
  }
};
