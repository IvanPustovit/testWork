import nextConnect from "next-connect";
import middleware from "../../middleware/mongoDB";
const handler = nextConnect();

handler.use(middleware);
