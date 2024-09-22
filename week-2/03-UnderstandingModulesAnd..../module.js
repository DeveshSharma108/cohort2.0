/*
module.js:
It defines a greet function that prints a greeting message.
It checks if the module is being run directly or imported somewhere.
If run directly, it logs "This module is being run directly."
If imported, it logs "This module has been imported."
It exports the greet function
We will run this file directly
We will run the main.js file also that has imported the greet() function and see the difference in output
*/

// module.js

function greet() {
    console.log("Hello from the module! This function was created in the module.js");
}

if (require.main === module) {
    // console.log(require.main)
    //console.log(module)
    console.log("This module is being run directly.");
} else {
    console.log("This module has been imported.");
}


module.exports = greet


// I was getting error when I tried to use different syntax like export default greet etc

/*
 * Module Systems in Node.js
 *
 * Node.js primarily uses the CommonJS module system, which utilizes `require` for importing and `module.exports` for exporting.
 *
 * CommonJS Syntax:
 * - `module.exports`: Used to export functions or objects from a module.
 * - Example:
 *   function greet() {
 *       console.log("Hello from the module!");
 *   }
 *   module.exports = greet;
 *
 * ES6 (ECMAScript 2015) introduced a new module syntax that allows for more flexibility:
 * - Default Export: `export default greet;`
 * - Named Export: `export { greet };`
 * - Inline Export: `export function greet() {...}`
 *
 * Differences:
 * - CommonJS is synchronous and loads modules at runtime, while ES6 modules are asynchronous and support static analysis.
 * - Node.js does not natively support ES6 module syntax unless configured to do so (using `.mjs` extension or `"type": "module"` in `package.json`).
 *
 * To use ES6 modules in Node.js:
 * 1. Rename files to `.mjs` or
 * 2. Set `"type": "module"` in `package.json`.
 * 3. Optionally, use a transpiler like Babel for compatibility.
 *
 * Example of ES6 Syntax:
 * // module.mjs
 * export function greet() {
 *     console.log("Hello from the module!");
 * }
 *
 * // main.mjs
 * import { greet } from './module.mjs';
 * greet();
 */
