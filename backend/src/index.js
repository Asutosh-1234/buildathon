import app from "./server.js";
import dotenv from "dotenv";
import connectDb from "./db/index.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 3000;

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port no http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("There is a mongoBd Error", err);
  });
