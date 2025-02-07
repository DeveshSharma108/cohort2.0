"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTodo = createTodo;
exports.updateTodo = updateTodo;
exports.getTodos = getTodos;
const __1 = require("..");
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
function createTodo(userId, title, description) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `
            INSERT INTO todos(user_id, title, description) 
            VALUES ($1, $2, $3) 
            RETURNING *;`;
            const values = [userId, title, description];
            const result = yield __1.client.query(query, values);
            return result.rows[0] || null;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    });
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
function updateTodo(todoId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `
            UPDATE todos
            SET done = TRUE
            WHERE id = $1
            RETURNING *;`;
            const values = [todoId];
            const result = yield __1.client.query(query, values);
            return result.rows[0] || null; // Return updated todo or null
        }
        catch (error) {
            console.error("Error updating todo:", error);
            return null;
        }
    });
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
function getTodos(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `SELECT * FROM todos WHERE user_id = $1;`;
            const values = [userId];
            const result = yield __1.client.query(query, values);
            return result.rows; // Returns an array of todos
        }
        catch (error) {
            console.error("Error fetching todos:", error);
            return [];
        }
    });
}
