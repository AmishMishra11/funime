import axios from "axios";

export const removePost = async (PostId) => {
  const encodedToken = localStorage.getItem("token");

  try {
    const res = await axios({
      method: "DELETE",
      url: `/api/posts/${PostId}`,
      headers: { authorization: encodedToken },
    });

    console.log(res.data.posts);
  } catch (e) {
    console.log("error occured: ", e);
  }
};
