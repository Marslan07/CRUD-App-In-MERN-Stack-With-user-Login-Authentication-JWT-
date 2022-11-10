import Jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  // const token= req.body;
  let user_data=req.body;
  try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];

      if (!token) {
        return await res.status(401).json({ message: "user/token not found" });
      }

      // Authenticate token
      try {
        const user = Jwt.verify(token, process.env.JWT);

        if (user) {
          req.user=user;
          if(req.body){
            req.body=user_data;
          }
          next();
        } else {
          return res.status(401).json({ errors: "token is not verified" });
        }
      } catch (error) {
        res.status(401).json({ errors: "Invalid token" });
      }
    
  } catch (error) {
    res.status(500).json(error.message);
  }
};
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next);
}