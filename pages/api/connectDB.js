import { ObjectId } from "mongodb";
import nextConnect from "next-connect";
import middleware from "../../middleware/mongoDB";
const UserModel = require("../../schemas/user.model");
const bcript = require("bcryptjs");
const jwt = require("jsonwebtoken");

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  try {
    const id = req.query.userId;
    let data = await req.db.collection("users").findOne({ _id: ObjectId(id) });
    await res.json(data);
  } catch (error) {
    console.log(error);
  }
});

handler.post(async (req, res) => {
  try {
    const { email, password, userId, click } = JSON.parse(req.body);
    const data = await req.db.collection("users").findOne({ email });
    console.log(click);
    console.log(req.body);

    switch (req.query.base) {
      case "/auth/register":
        if (data) {
          return res.json({});
        }
        const hashPassword = await bcript.hash(password, 5);
        const newUser = UserModel({
          email: email,
          password: hashPassword,
          clicks: { button1: 0, button2: 0, button3: 0 },
        });
        const user = await req.db.collection("users").insertOne(newUser);
        res.json(user);
        return;
      case "/auth/login":
        if (!data) {
          return res.json({});
        }
        const isMatch = await bcript.compare(password, data.password);
        if (!isMatch) {
          return res.json({});
        }
        const token = jwt.sign({ userId: data._id }, "jwtSecret", {
          expiresIn: "1h",
        });
        res.json({ token, userId: data._id });
      case "/":
        console.log(click);
        const userClick = await req.db.collection("users").updateOne(
          userId,
          {
            clicks: { ...clicks, [click.button]: clicks[click.button] + 1 },
          },
          { new: true }
        );
        console.log(userClick);
        res.json(userClick);
        return;
      default:
        break;
    }
    // if (!data) {
    //   return res.json({});
    // }
    // await res.json(data);
    // return data;

    // const isMatch = await bcript.compare(password, data.password);
    // const hashPassword = await bcript.hash(password, 5);
    // const newUser = UserModel({
    //   email: email,
    //   password: hashPassword,
    //   clicks: { button1: 0, button2: 0, button3: 0 },
    // });
    // const data = await req.db.collection("users").insertOne(newUser);

    // res.json(data);
  } catch (error) {
    console.log(error);
  }
});

export default handler;
