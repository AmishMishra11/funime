import axios from "axios";

export const editComments = async (postData, PostId) => {
  const encodedToken = localStorage.getItem("token");

  try {
    const res = await axios({
      method: "POST",
      url: `/api/posts/edit/${PostId}`,
      headers: { authorization: encodedToken },
      data: { postData: postData },
    });

    console.log(res.data.comments);
  } catch (e) {
    console.log("error occured: ", e);
  }
};
