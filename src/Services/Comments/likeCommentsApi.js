import axios from "axios";

export const likeComments = async (postID, id) => {
  const encodedToken = localStorage.getItem("token");

  try {
    const res = await axios({
      method: "POST",
      url: `/api/comments/upvote/${postID}/${id}`,
      headers: { authorization: encodedToken },
    });

    console.log(res.data.comments);
  } catch (e) {
    console.log("error occured: ", e);
  }
};
