const express = require("express");
const NckuStudy = require("./router/NckuStudy/app");

const app = express();
const port = 3000;

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.socket.remoteAddress);
  next();
});
//middleware can block some attack here
app.use("/", NckuStudy);
app.listen(port, console.log(`starting listen at port ${port}`));
