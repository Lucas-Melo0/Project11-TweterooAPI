import express from "express";
import cors from "cors";
const server = express();

server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(cors());

const users = [];
const tweets = [];

server.post("/sign-up", (req, res) => {
  const user = req.body;
  const { username, avatar } = user;
  if (username.length === 0 || avatar.length === 0) {
    res.status(400).send("Todos os campos precisam ser enviados");
  } else {
    users.push(user);
    res.status(201).send("OK");
  }
});

server.post("/tweets", (req, res) => {
  const message = req.body;
  const { username, tweet } = message;
  if (username.length === 0 || tweet.length === 0) {
    res.status(400).send("Todos os campos precisam ser enviados");
  } else {
    tweets.push(message);
    res.status(201).send("OK");
  }
});

server.get("/tweets", (req, res) => {
  let lastTenTweets = tweets.slice(-10);

  const latestTweets = lastTenTweets.map((value) => {
    const avatar = users.find((user) => {
      return user.username === value.username;
    })?.avatar;
    return { ...value, avatar: avatar };
  });
  res.status(200).send(latestTweets);
});

server.get("/tweets/:user", (req, res) => {
  const { user } = req.params;
  console.log(user);

  const userTweets = tweets.filter((tweet) => {
    if (tweet.username === user) {
      return tweet;
    }
  });
  const userTweetsWithAvatar = userTweets.map((value) => {
    const avatar = users.find((user) => {
      return user.username === value.username;
    })?.avatar;
    return { ...value, avatar: avatar };
  });

  res.status(200).send(userTweetsWithAvatar);
});
console.log(tweets);
server.listen(5000);
