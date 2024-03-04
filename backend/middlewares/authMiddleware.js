import ErrorObject from "../utils/ErrorObject";
import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[0];
    if (!token) {
      throw new Error('Not Authenticated')
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.userId
    next()
  } catch (err) {
    next(new ErrorObject(401, 'fail', err))
  }
};
