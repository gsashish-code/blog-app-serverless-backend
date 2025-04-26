import { JWTPayload } from "hono/utils/jwt/types";
export type Environment = {
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    jwtPayload: JWTPayload;
    userId: string;
  };
};
