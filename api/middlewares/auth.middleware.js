import { User } from "../models/user.model.js";
import { verifyAccessToken } from "../const/jwt.const.js";

export const authValidator = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.sendStatus(204);

    const token = authHeader.split(" ")[1];

    if (!token) return res.sendStatus(403);

    const { userId } = verifyAccessToken(token);

    const foundUser = await User.findById(userId);

    if (!foundUser) return res.sendStatus(403);

    if (foundUser.refreshTokens.length === 0) return res.sendStatus(403);

    req.user = foundUser;

    next();
  } catch (error) {
    res.sendStatus(403);
  }
};
