import express from "express";

const server = express();

server.use(express.urlencoded({ extended: false }));
server.use(express.json());
const users = [];
const tweets = [];

server.post("/sign-up", (req, res) => {
  const user = req.body;
  users.push(user);
  res.send("OK");
});

server.post("/tweets", (req, res) => {
  const tweet = req.body;
  tweets.push(tweet);
  res.send("OK");
});

server.listen(5000);
