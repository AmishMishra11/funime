import axios from "axios";

export const removeComments = async (PostId, commentId) => {
  const encodedToken = localStorage.getItem("token");

  try {
    const res = await axios({
      method: "POST",
      url: `/api/comments/delete/${PostId}/${commentId}`,
      headers: { authorization: encodedToken },
    });

    console.log(res.data.comments);
  } catch (e) {
    console.log("error occured: ", e);
  }
};
