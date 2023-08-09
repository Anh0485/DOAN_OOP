import bcrypt from "bcryptjs"
const users = [
    {
        name:"Admin",
        email:'admin@gmail.com',
        password: bcrypt.hashSync("123456",10),
        isAdmin: true,
    },
    {
        name:"Pham Anh",
        email: "anh0485@gmail.com",
        password: bcrypt.hashSync("123456",10),
    }
]

export default users