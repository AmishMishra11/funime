import axios from "axios";
import { editPostCall } from "../../Redux/Features/postSlice";

export const editPost = async (postData, PostId, dispatch) => {
  const encodedToken = localStorage.getItem("token");

  try {
    const res = await axios({
      method: "POST",
      url: `/api/posts/edit/${PostId}`,
      headers: { authorization: encodedToken },
      data: { postData: postData },
    });

    dispatch(editPostCall(res.data.posts));
  } catch (e) {
    console.log("error occured: ", e);
  }
};
