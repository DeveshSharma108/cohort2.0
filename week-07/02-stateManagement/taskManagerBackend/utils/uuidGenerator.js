/**
 * - Incorrect Syntax:
 *   export default const IDgenerator = function() { return uuidv4(); };
 * 
 * - Correct Syntax Options:
 *   (a) Declare first, export later:
 *       const IDgenerator = function() { return uuidv4(); };
 *       export default IDgenerator;
 * 
 *   (b) Inline function export:
 *       export default function IDgenerator() { return uuidv4(); };
 * 
 *   (c) Arrow function export:
 *       const IDgenerator = () => uuidv4();
 *       export default IDgenerator;
 */
import {v4 as uuidv4} from 'uuid'
const IDgenerator = () => uuidv4()
export default IDgenerator;