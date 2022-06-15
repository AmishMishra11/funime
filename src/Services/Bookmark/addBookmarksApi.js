import axios from "axios";

export const addBookmarks = async (id) => {
  const encodedToken = localStorage.getItem("token");
  try {
    const res = await axios({
      method: "POST",
      url: `/api/users/bookmark/${id}`,
      headers: { authorization: encodedToken },
    });

    return res.data.bookmarks;
  } catch (e) {
    console.log("error occured: ", e);
  }
};
