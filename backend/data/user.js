import bcrypt from 'bcryptjs'

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true
  },
  {
    name: "Yelmi",
    email: "yelmialmonte@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Karina",
    email: "karinatavera15@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  }
]

export default users
