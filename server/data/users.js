import bcrypt from "bcryptjs"

const users = [
  {
    name: "User1",
    email: "user1@gmail.com",
    password: bcrypt.hashSync("123", 10),
    isAdmin: true
  },
  {
    name: "User2",
    email: "user2@gmail.com",
    password: bcrypt.hashSync("1234", 10),
    isAdmin: false
  },
  {
    name: "User3",
    email: "user3@gmail.com",
    password: bcrypt.hashSync("12345", 10),
    isAdmin: false
  },
]

export default users