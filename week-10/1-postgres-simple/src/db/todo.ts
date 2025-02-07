import { client } from "..";
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
        const query = `
            INSERT INTO todos(user_id, title, description) 
            VALUES ($1, $2, $3) 
            RETURNING *;`
        const values = [userId,title,description]
        const result = await client.query(query, values)
        return result.rows[0] || null
    } catch (error) {
        console.log(error)
        return null
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
        const query = `
            UPDATE todos
            SET done = TRUE
            WHERE id = $1
            RETURNING *;`;
        const values = [todoId];

        const result = await client.query(query, values);
        return result.rows[0] || null; // Return updated todo or null
    } catch (error) {
        console.error("Error updating todo:", error);
        return null;
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
        const query = `SELECT * FROM todos WHERE user_id = $1;`;
        const values = [userId];

        const result = await client.query(query, values);
        return result.rows; // Returns an array of todos
    } catch (error) {
        console.error("Error fetching todos:", error);
        return [];
    }
}
