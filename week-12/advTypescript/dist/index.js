"use strict";
/*
Challenge: TypeScript Utility Types & Zod Validation
Scenario: You are building a user management system where users have different roles and permissions. Your task is to implement various TypeScript utility types and validate user data using Zod
*/
Object.defineProperty(exports, "__esModule", { value: true });
const users = [
    { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin', permissions: ['manage_users'] },
    { id: 2, name: 'Bob', email: 'bob@example.com', role: 'editor', permissions: ['edit_posts'] },
    { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'viewer', permissions: ['view_posts'] },
];
const userMap = new Map(users.map((user) => [user.id, user]));
// console.log(userMap.get(1))
const zod_1 = require("zod");
const userSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string().min(3),
    email: zod_1.z.string().email(),
    role: zod_1.z.enum(["admin", "editor", "viewer"]),
    permissions: zod_1.z.array(zod_1.z.string())
});
function filterNonAdmins(users) {
    const nonAdminUsers = [];
    users.filter((user) => user.role != "admin");
    return nonAdminUsers;
}
// The .refine() method in Zod allows you to add custom validation logic beyond the built-in schema rules
// Suppose we want, Admin can have empty permissions and Editors/Viewers must have at least one permission.
// syntax 
/*
schema.refine((data) => condition, {
  message: "Custom error message",
  path: ["fieldName"],
});

data → The validated object.
Condition ((data) => condition):
Returns true ✅ → The data passes validation.
Returns false ❌ → The data fails validation.
message → Custom error message.
path → Specifies which field the error is related to.

*/
const RefinedSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string().min(3),
    email: zod_1.z.string().email(),
    role: zod_1.z.enum(["admin", "editor", "viewer"]),
    permissions: zod_1.z.array(zod_1.z.string())
}).refine((user) => user.role === "admin" || (user.permissions && user.permissions.length > 0), {
    message: "Non-admin users must have at least one permission",
    path: ["permissions"]
});
const res1 = RefinedSchema.safeParse({ id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin', permissions: ['manage_users'] });
const res2 = RefinedSchema.safeParse({ id: 1, name: 'Alice', email: 'alice@example.com', role: 'editor', permissions: [] });
if (!res1.success) {
    console.log(res1.error.message);
}
if (!res2.success) {
    console.log(res2.error.message);
}
