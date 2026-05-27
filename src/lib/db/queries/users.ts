import { eq } from "drizzle-orm";
import { db } from "../index";
import { users } from "../schema";

export async function createUser(name: string) {
    const [result] = await db.insert(users).values({name: name}).returning();
    return result;
}

export async function getUserByName(name: string) {
    const [user] = await db
                    .select()
                    .from(users)
                    .where(eq(users.name, name));
    return user;
}

export async function getAllUsersName() {
    const result = await db.select({
        name: users.name
    }).from(users);
    return result;
}