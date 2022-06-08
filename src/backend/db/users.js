import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    fullName: "Amish Mishra",
    username: "AmishM",
    email: "amishmishra@gmail.com",
    password: "MishraAmish",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },

  {
    _id: uuid(),
    fullName: "Guest User",
    username: "GuestU",
    email: "guest@gmail.com",
    password: "UserGuest",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
