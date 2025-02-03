import express from 'express'
import mainRouter from './routes/main.route.js';
import cors from 'cors'
const app = express();
app.use(express.json())
app.use(cors())
app.use('/api/v1',mainRouter)
export{app}



// 1️⃣ Named Export: Exporting an existing variable or function
// export { app };
// - You must import it using the same name: `import { app } from './file';`
// - You can export multiple named exports from the same file.
// - Destructuring-style import is required.

// 2️⃣ Named Export: Declaring and exporting a constant in one step
// export const a = 7;
// - Same import rule applies: `import { a } from './file';`
// - Multiple named exports can coexist in the same file.

// 3️⃣ Default Export: Exporting a single value as the module's default export
// export default double;
// - When importing, you can rename it: `import anyName from './file';`
// - A file can only have one default export.
// - Default exports do not require curly braces when importing.


