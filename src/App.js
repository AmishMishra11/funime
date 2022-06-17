import { Route, Routes } from "react-router";
import "./App.css";

import Login from "./Pages/Login";
import Singup from "./Pages/Singup";
import Home from "./Pages/Home";

import {
  Bookmarks,
  Explore,
  Feed,
  PeopleProfile,
  Profile,
  PostPage,
  Search,
} from "./Components";
import RequiresAuth from "./RequiresAuth";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<Singup />} />

        <Route element={<RequiresAuth />}>
          <Route path="home" element={<Home />}>
            <Route index element={<Feed />} />
            <Route path="feed" element={<Feed />} />
            <Route path="search" element={<Search />} />
            <Route path="explore" element={<Explore />} />
            <Route path="bookmarks" element={<Bookmarks />} />
            <Route path="profile" element={<Profile />} />
            <Route
              path="peopleprofile/:peopleprofileID"
              element={<PeopleProfile />}
            />
            <Route path="post/:postID" element={<PostPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
