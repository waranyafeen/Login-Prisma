import prisma from "../config/prisma.js";
import createError from "../utils/createError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// logic ของ endpoint
export const register = async (req, res, next) => {
  try {
    // 1. validate check body
    const { email, password, name } = req.body;
    //console.log(email, password, name);

    // 2. check email in database
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (user) {
      createError(400, "Email is already exist!!!");
    }
    //console.log(user)

    // 3. encrypt password -> ด้วย bcrypt ทำให้ password ที่เราสมัครใช้งานปลอดภัยมากขึ้น
    const hashPassword = await bcrypt.hash(password, 10);

    // 4. insert into DB
    const result = await prisma.user.create({
      data: {
        email: email,
        password: hashPassword,
        name: name,
      },
    });
    //console.log(result);

    // 5. response
    res.json({ message: "Register successfully!!!" });
  } catch (err) {
    next(err); // next คือการโยนให้ไปใช้ err ที่ไฟล์ server
  }
};

export const login = async (req, res, next) => {
  try {
    // 1. validate
    const { email, password } = req.body;

    // 2. check email
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      createError(400, "Email or Password is Invalid!!");
    }

    // 3. check password
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      createError(400, "Email or Password is Invalid!!");
    }

    // 4. generate token
    const payload = {
      id: user.id,
      name: user.name,
      role: user.role
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    console.log(token);

    // 5. response
    res.json({ message: "Login successfully", payload: payload, token:token });
  } catch (err) {
    next(err);
  }
};
