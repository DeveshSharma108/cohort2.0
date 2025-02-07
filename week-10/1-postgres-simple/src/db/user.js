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
exports.createUser = createUser;
exports.getUser = getUser;
/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
const __1 = require("..");
function createUser(username, password, name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `INSERT INTO users(username,password,name)
        VALUES ($1,$2,$3)`;
            const values = [username, password, name];
            yield __1.client.query(query, values);
            console.log("User inserted successfully ✅");
        }
        catch (error) {
            console.error("Error inserting user ❌", error);
        }
    });
}
/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
function getUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `SELECT * FROM users WHERE id = $1`;
            const values = [userId];
            const result = yield __1.client.query(query, values);
            if (result.rows.length > 0) {
                console.log("User found ✅", result.rows[0]);
                return result.rows[0];
            }
            else {
                console.log("User not found ❌");
                return null;
            }
        }
        catch (error) {
            console.error("Error fetching user ❌", error);
            return null;
        }
    });
}
