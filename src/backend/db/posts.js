import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    content: "Sukuna",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "AmishM",
    userId: "1",
    userImage: "https://avatars.githubusercontent.com/u/76205249?v=4",
    postImg:
      "https://res.cloudinary.com/amish11/image/upload/v1655103095/social%20media/Sukuna_ymwwuu.jpg",

    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: [],
  },
  {
    _id: uuid(),
    content: "Goku",
    likes: {
      likeCount: 5,
      likedBy: [],
      dislikedBy: [],
    },
    username: "AmishM",
    userId: "1",
    userImage: "https://avatars.githubusercontent.com/u/76205249?v=4",
    postImg:
      "https://res.cloudinary.com/amish11/image/upload/v1655103535/social%20media/Goku_jd4gau.jpg",

    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: [],
  },
  {
    _id: uuid(),
    content: "Solo Leveling",
    likes: {
      likeCount: 2,
      likedBy: [],
      dislikedBy: [],
    },
    username: "PrabhavS",
    userId: "2",
    userImage: "https://avatars.githubusercontent.com/u/88072012?v=4",
    postImg:
      "https://res.cloudinary.com/amish11/image/upload/v1655037143/social%20media/Solo-Leveling-Anime_yyo0sb.jpg",

    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: [
      {
        _id: uuid(),
        username: "shubhamsoni",
        text: "Interesting",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "sohamshah",
        text: "Wow!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
  },

  {
    _id: uuid(),
    content: "💕",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "SukanyaS",
    userId: "3",
    userImage: "https://avatars.githubusercontent.com/u/76467704?v=4",
    postImg:
      "https://res.cloudinary.com/amish11/image/upload/v1655040004/social%20media/Tengen-Uzui_pywsks.webp",

    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: [],
  },

  {
    _id: uuid(),
    content: "Goat",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "ChiragG",
    userId: "4",
    userImage: "https://avatars.githubusercontent.com/u/51075671?v=4",
    postImg:
      "https://res.cloudinary.com/amish11/image/upload/v1655040116/social%20media/Itachi_dzcrnc.webp",

    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: [],
  },

  {
    _id: uuid(),
    content: "✨Bukkorosu✨",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "GuestU",
    userId: "7",
    userImage:
      "https://res.cloudinary.com/amish11/image/upload/v1654875318/social%20media/guest_ob9mu4.png",
    postImg:
      "https://res.cloudinary.com/amish11/image/upload/v1655044544/social%20media/gojo_r9i9xp.jpg",

    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: [],
  },

  {
    _id: uuid(),
    content: "Naruto and Jaraya",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "Hokage",
    userId: "8",
    userImage:
      "https://res.cloudinary.com/amish11/image/upload/v1655123320/social%20media/naruto_gj7vua.webp",
    postImg:
      "https://res.cloudinary.com/amish11/image/upload/v1655103096/social%20media/Naruto_Jaraya_yi6xgf.jpg",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: [],
  },
  {
    _id: uuid(),
    content: "Naruto and Hinata",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "Hokage",
    userId: "8",
    userImage:
      "https://res.cloudinary.com/amish11/image/upload/v1655123320/social%20media/naruto_gj7vua.webp",
    postImg:
      "https://res.cloudinary.com/amish11/image/upload/v1655103095/social%20media/naruto_hinata_pncne8.jpg",

    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: [],
  },

  {
    _id: uuid(),
    content: "Demon Slayer",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "Tanjiro",
    userId: "9",
    userImage:
      "https://res.cloudinary.com/amish11/image/upload/v1655123320/social%20media/tanjiro_k5e5gm.jpg",
    postImg:
      "https://res.cloudinary.com/amish11/image/upload/v1654963577/social%20media/wallpaper_u37qn8.png",

    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: [
      {
        _id: uuid(),
        username: "shubhamsoni",
        text: "Interesting",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "sohamshah",
        text: "Wow!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
  },

  {
    _id: uuid(),
    content: "nezuko",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "Tanjiro",
    userId: "9",
    userImage:
      "https://res.cloudinary.com/amish11/image/upload/v1655123320/social%20media/tanjiro_k5e5gm.jpg",
    postImg:
      "https://res.cloudinary.com/amish11/image/upload/v1655103095/social%20media/Nezuko_hbsjmn.jpg",

    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: [],
  },
];
