import nextConnect from "next-connect";
import middleware from "../../middleware/mongoDB";
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
export default handler;
