import axios from "axios";

export const getComments = async (id) => {
  console.log("api");
  try {
    const res = await axios({
      method: "GET",
      url: `/api/comments/${id}`,
    });
    console.log(res.data.comments);
  } catch (e) {
    console.log("error occured: ", e);
  }
};
