import { AuthDTO } from "../utils/validation/auth";
import getDB from "../db/db";
import { user } from "../db/models";
import { eq } from "drizzle-orm";
import { sign } from "hono/jwt";

class AuthService {
  async signup(authDTO: AuthDTO, dbURL: string, jwtSecret: string) {
    const db = getDB(dbURL);

    const isUsernameExist = await db
      .select()
      .from(user)
      .where(eq(user.username, authDTO.username));

    if (!isUsernameExist.length)
      throw new CustomError(402, "Username not available", "/v1/auth/signup");

    const dbUser = await db
      .insert(user)
      .values({ username: authDTO.username, password: authDTO.password })
      .returning({ username: user.username });

    return await sign(dbUser[0], jwtSecret, "HS256");
  }

  signing(authDTO: AuthDTO) {}
}
export default AuthService;
