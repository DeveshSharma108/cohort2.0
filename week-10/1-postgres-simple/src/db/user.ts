
/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
import {client} from '..'
export async function createUser(username: string, password: string, name: string) {
    try {
        
        const query = `INSERT INTO users(username,password,name)
        VALUES ($1,$2,$3)`
        const values = [username,password,name]

        await client.query(query,values)
        console.log("User inserted successfully ✅");
    } catch (error) {
        console.error("Error inserting user ❌", error)
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
        const query = `SELECT * FROM users WHERE id = $1`
        const values = [userId]

        const result = await client.query(query,values)

        if (result.rows.length > 0) {
            console.log("User found ✅", result.rows[0])
            return result.rows[0]
        } else {
            console.log("User not found ❌");
            return null
        }
    } catch (error) {
        console.error("Error fetching user ❌", error);
        return null
    } 
}
