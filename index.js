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
  console.log(tweets);
  res.send("OK");
});
server.get("/tweets", (req, res) => {
  let lastTenTweets = [];
  for (let i = tweets.length - 1; i > tweets.length - 11; i--) {
    lastTenTweets.push(tweets[i]);
    console.log(lastTenTweets);
  }
  const latestTweets = lastTenTweets.map((value) => {
    const avatar = users.find((user) => {
      return user.username === value.username;
    })?.avatar;
    return { ...value, avatar: avatar };
  });
  res.send(latestTweets);
});
console.log(tweets);
server.listen(5000);
