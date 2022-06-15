import axios from "axios";

export const getBookmarks = async () => {
  const encodedToken = localStorage.getItem("token");
  try {
    const res = await axios({
      method: "GET",
      url: "/api/users/bookmark",
      headers: { authorization: encodedToken },
    });
    return res.data.bookmarks;
  } catch (e) {
    console.log("error occured: ", e);
  }
};
