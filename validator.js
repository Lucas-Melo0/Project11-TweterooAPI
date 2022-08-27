import Joi from "joi";
const validator = (schema) => (payload) => schema.validate(payload);

const signupSchema = Joi.object({
  username: Joi.string().required(),
  avatar: Joi.string().required(),
});

const tweetsSchema = Joi.object({
  username: Joi.string().required(),
  tweet: Joi.string().required(),
});

const validateSignup = validator(signupSchema);
const validateTweets = validator(tweetsSchema);

export { validateSignup, validateTweets };
