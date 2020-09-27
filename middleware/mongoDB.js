import { MongoClient } from "mongodb";
import nextConnect from "next-connect";
const MONGO_URI = process.env.MONGO_URI;

const client = new MongoClient(
  "mongodb+srv://testwork:rYwei7nrOAlqW3F8@cluster0.njnup.mongodb.net/workTest?retryWrites=true&w=majority",
  {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  }
);

async function database(req, res, next) {
  // console.log(client);
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db("workTest");
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
