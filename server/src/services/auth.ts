import { AuthDTO } from "../utils/validation/auth";
import getDB from "../db/db";
import { user } from "../db/models";
import { eq } from "drizzle-orm";
import { sign } from "hono/jwt";
import CustomError from "../errors/custom-error";

class AuthService {
  async signup(authDTO: AuthDTO, dbURL: string, jwtSecret: string) {
    const db = getDB(dbURL);

    const isUsernameExist = await db
      .select()
      .from(user)
      .where(eq(user.username, authDTO.username));
    console.log({ isUsernameExist: isUsernameExist });

    if (isUsernameExist.length)
      throw new CustomError(400, "Username not available", "/v1/auth/signup");

    const dbUser = await db
      .insert(user)
      .values({ username: authDTO.username, password: authDTO.password })
      .returning({ username: user.username });

    return sign(dbUser[0], jwtSecret, "HS256");
  }

  async signing(authDTO: AuthDTO, dbURL: string, jwtSecret: string) {
    const db = getDB(dbURL);
    const isUserExits = await db
      .select()
      .from(user)
      .where(eq(user.username, authDTO.username));

    if (!isUserExits.length)
      throw new CustomError(401, "Username doesn't exit", "/v1/auth/signing");

    if (isUserExits[0].password != authDTO.password)
      throw new CustomError(401, "Incorrect credentials", "/v1/auth/signing");

    const payload = {
      username: isUserExits[0].username,
    };

    return sign(payload, jwtSecret, "HS256");
  }
}
export default AuthService;
