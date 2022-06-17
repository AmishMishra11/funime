import axios from "axios";

export const addComments = async (commentData, id) => {
  const encodedToken = localStorage.getItem("token");

  try {
    const res = await axios({
      method: "POST",
      url: `/api/comments/add/${id}`,
      headers: { authorization: encodedToken },
      data: { commentData: commentData },
    });

    console.log(res.data.comments);
  } catch (e) {
    console.log("error occured: ", e);
  }
};
