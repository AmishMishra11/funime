import axios from "axios";

export const dislikeComments = async (postID, id) => {
  const encodedToken = localStorage.getItem("token");

  try {
    const res = await axios({
      method: "POST",
      url: `/api/comments/downvote/${postID}/${id}`,
      headers: { authorization: encodedToken },
    });

    console.log(res.data.comments);
  } catch (e) {
    console.log("error occured: ", e);
  }
};
