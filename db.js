import mongoose from "mongoose";
const URL =
  "mongodb+srv://ritvek2302:1234@cluster0.o0d1p5f.mongodb.net/AUTHENTICATION?retryWrites=true&w=majority";

mongoose.set("strictQuery", false);

const mongodb = async () => {
  await mongoose.connect(URL, (err, result) => {
    if (err) console.log(err);
    else {
      console.log("Connected Successfully!");
    }
  });
};

export default mongodb;