import express from "express";
import cors from "cors";

import { validateSignup, validateTweets } from "./validator.js";
const server = express();

server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(cors());

const users = [];
const tweets = [];

server.post("/sign-up", (req, res) => {
  const user = req.body;

  const { error } = validateSignup(user);
  if (error) {
    res.status(400).send("Todos os campos precisam ser enviados");
  } else {
    users.push(user);
    res.status(201).send("OK");
  }
});

server.post("/tweets", (req, res) => {
  const tweet = req.body;

  const { error } = validateTweets(tweet);
  if (error) {
    res.status(400).send("Todos os campos precisam ser enviados");
  } else {
    tweets.push(tweet);
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

server.listen(5000);
