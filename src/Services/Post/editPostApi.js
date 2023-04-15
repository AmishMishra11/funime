import { editPostCall } from "../../Redux/Features/postSlice";
import { toast } from "react-toastify";
import { secureAxiosInstance } from "../apiInterceptor";

export const editPost = async (postData, PostId, dispatch) => {
  const encodedToken = localStorage.getItem("token");

  try {
    const res = await secureAxiosInstance({
      method: "POST",
      url: `/posts/edit/${PostId}`,
      headers: { authorization: encodedToken },
      data: { postData: postData },
    });

    if (res.status === 201) dispatch(editPostCall(res.data.posts));
  } catch (e) {
    toast.error(e.response.data.message);
    console.log("error occured: ", e);
  }
};
