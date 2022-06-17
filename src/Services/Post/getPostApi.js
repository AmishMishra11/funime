import axios from "axios";

export const getPosts = async (id) => {
  try {
    const res = await axios({
      method: "GET",
      url: `/api/posts/${id}`,
    });

    return res.data.post;
  } catch (e) {
    console.log("error occured: ", e);
  }
};
