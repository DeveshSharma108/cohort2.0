import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function createTodo(userId: number, title: string, description: string) {
    try {
        const newTodo = await prisma.todo.create({
            data:{
                userId,
                title,
                description
            }
        })
        return newTodo
    } catch (error) {
        console.log("Error ",error)
        throw new Error("Todo creation failed")
    }
}
/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function updateTodo(todoId: number) {
    try {
        const updated = await prisma.todo.update({
            where:{id:todoId},
            data:{done:true}
        })
        return updated
    } catch (error) {
        console.log("error while updating the todo",error)
        throw new Error("Todo updation failed")
    }
}

/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */
export async function getTodos(userId: number) {
    try {
        const todos = await prisma.todo.findMany({
            where:{userId:userId}
        })
        return todos
    } catch (error) {
        console.log("Error fetching todos",error)
        throw new Error("Todo fetch failed")
    }
}