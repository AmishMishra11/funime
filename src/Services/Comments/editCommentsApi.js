import axios from "axios";

export const editComments = async (commentData, PostId, commentId) => {
  const encodedToken = localStorage.getItem("token");

  try {
    const res = await axios({
      method: "POST",
      url: `/api/comments/edit/${PostId}/${commentId}`,
      headers: { authorization: encodedToken },
      data: { commentData: commentData },
    });

    console.log(res.data.comments);
  } catch (e) {
    console.log("error occured: ", e);
  }
};
