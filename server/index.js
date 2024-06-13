import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import todoRouter from "./Route/routesToDo.js";

const app = express();
const PORT = 9988;
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});

// const connectToDatabase = async () => {
//   try {
//     await mongoose.connect(
//       "mongodb+srv://admin:admin@todolist.3nqdzfj.mongodb.net/todoList",
//       {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       }
//     );
//   } catch (error) {
//     console.error("Error connecting to MongoDB Atlas:", error);
//   }
// };
// connectToDatabase();

mongoose
  .connect("mongodb://127.0.0.1:27017/todo-list")
  .then(() => console.log("DB connected"))
  .catch((error) => console.log(error));

app.use(todoRouter);
