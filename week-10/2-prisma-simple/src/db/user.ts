import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function createUser(username: string, password: string, name: string){
    try {
        const newUser = await prisma.user.create({
            data:{
                username,
                password,
                name
            }
        })
        return newUser
    } catch (error) {
        console.log("Error creating user",error)
        throw new Error("User creation failed")
    }
}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function getUser(userId: number) {
    try {
        const user = await prisma.user.findUnique({
            where:{id:userId}
        })
        return user
    } catch (error) {
        console.log("Error finding user with given id",error)
        throw new Error("User search failed")
    }
}
