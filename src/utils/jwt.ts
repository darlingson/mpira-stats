import jwt from "jsonwebtoken";

export const createJwt = (payload: object, secret: string): string => {
  return jwt.sign(payload, secret, { expiresIn: "1h" });
};

export const verifyJwt = (token: string, secret: string): object | null => {
  try {
    const decoded = jwt.verify(token, secret);
    return typeof decoded === "object" ? decoded : null;
  } catch (error) {
    return null;
  }
};
