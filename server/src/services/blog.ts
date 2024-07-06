import { eq } from "drizzle-orm";
import getDB from "../db/db";
import { blog } from "../db/models";
import type { blogDTO } from "../utils/validation/blog";

class BlogService {
  async getBlog(id: string, dbURL: string) {
    const db = getDB(dbURL);
    return db.select().from(blog).where(eq(blog.id, id));
  }

  async createBlog(blogDTO: blogDTO, dbURL: string) {
    const db = getDB(dbURL);
    return db.insert(blog).values(blogDTO);
  }

  async updateBlog(id: string, dbURL: string) {
    const db = getDB(dbURL);
    return db.select().from(blog).where(eq(blog.id, id));
  }
  async deleteBlog(id: string, dbURL: string) {
    const db = getDB(dbURL);
    return db.delete(blog).where(eq(blog.id, id));
  }
}
export default BlogService;
