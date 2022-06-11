import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: "1",
    fullName: "Amish Mishra",
    username: "AmishM",
    email: "amishmishra@gmail.com",
    password: "Amish@12345",
    profileImg: "https://avatars.githubusercontent.com/u/76205249?v=4",
    profileBackgroundImg: "",
    about: "Learning webDev from neoG camp",
    portfolio: "https://amishmishra.netlify.app",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },

  {
    _id: "2",
    fullName: "Prabhav Sharma",
    username: "PrabhavS",
    email: "prabhav@gmail.com",
    password: "Prabhav@123",
    profileImg: "https://avatars.githubusercontent.com/u/88072012?v=4",
    profileBackgroundImg: "",
    about: "neoG Team captain 🚀• Learning React • MERN Stack Web Developer",
    portfolio: "https://prabhavsharma.netlify.app/",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },

  {
    _id: "3",
    fullName: "Sukanya Sen",
    username: "SukanyaS",
    email: "sukanya@gmail.com",
    password: "Sukanya@123",
    profileImg: "https://avatars.githubusercontent.com/u/76467704?v=4",
    profileBackgroundImg: "",
    about: "Learning webDev from NeogCamp",
    portfolio: "https://sukanyasenportfolio-1.netlify.app/index.html#home",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },

  {
    _id: "4",
    fullName: "Chirag Gupta",
    username: "ChiragG",
    email: "Chirag@gmail.com",
    password: "Chirag@123",
    profileImg: "https://avatars.githubusercontent.com/u/51075671?v=4",
    profileBackgroundImg: "",
    about: "Learning webDev from NeogCamp",
    portfolio: "https://portfolio-chiraggupta.netlify.app",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },

  {
    _id: "5",
    fullName: "Prathmesh Jagtap",
    username: "PrathmeshJ",
    email: "prathmesh@gmail.com",
    password: "Prathmesh@123",
    profileImg: "https://avatars.githubusercontent.com/u/65167693?v=4",
    profileBackgroundImg: "",
    about: "Learning webDev from NeogCamp",
    portfolio: "https://prathmesh-jagtap.netlify.app",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },

  {
    _id: "6",
    fullName: "Tanishk Sharma",
    username: "TanishkS",
    email: "tanishk@gmail.com",
    password: "Tanishk@123",
    profileImg: "https://avatars.githubusercontent.com/u/90030549?v=4",
    profileBackgroundImg: "",
    about: "Learning webDev from NeogCamp",
    portfolio: "",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: "7",
    fullName: "Guest User",
    username: "GuestU",
    email: "guest@gmail.com",
    password: "Guest@123",
    profileImg:
      "https://res.cloudinary.com/amish11/image/upload/v1654875318/social%20media/guest_ob9mu4.png",
    profileBackgroundImg: "",
    about: "",
    portfolio: "https://github.com/AmishMishra11",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
