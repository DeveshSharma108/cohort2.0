

// The following code was used in the initial versions of project but the complexity of project increased overtime as I have to learn about slightly advance topics like atomFamily, getting async data for atoms, selector family etc.. Also the global ID logic was not good so used uuid instead 
/*
import {atom} from 'recoil'

export const tasksAtom = atom({
    key:'tasksAtom',
    default:[{'ID':1,'TaskName':'Iol','Completed':false},{'ID':2,'TaskName':'poli','Completed':true},{'ID':3,'TaskName':'tony','Completed':false}]
}
)
*/


// Atoms or atom families cannot directly have an async function as their default value.
// However, we can handle async data fetching using selectors, which are designed to support asynchronous operations.
// For our case, an alternative approach could have been:
// 1. Set a default (empty) value for the atom.
// 2. Use React's useEffect hook to fetch the data asynchronously after the component mounts.
// 3. Update the atom using Recoil hooks like useRecoilState or useSetRecoilState.
// This approach, however, would cause a blank screen initially until the data is fetched and updated, leading to a less seamless user experience.
// Instead, we use a selector to fetch the data asynchronously, which ensures the atom or atom family always reflects the updated value seamlessly.
// Additional benefits of using a selector for async fetching:
// - It integrates async fetching directly into Recoil's state management.
// - It allows us to use `useRecoilValueLoadable` and `useRecoilStateLoadable`, which provide better control over loading, success, and error states of async operations.


/*
Selector itself is a function which has properties such as key and get.
Key property stores string value to identify the selector.
get property stores a function in it. Recoil passes another object as parameter to the function, it's common to extract the get function from the passed parameter because it helps to get the value of the target atom or selector.
*/


/*

Commented this code because we are using atom family and selector family for fine grain control
import {atom, selector} from 'recoil'

const tasksFetcherSelector = selector({
    key:'tasksFetcher',
    get: async ()=>{
        try {
            const response = await fetch('http://localhost:3000/tasks')
            const tasks = await response.json()
            return tasks
        } catch (error) {
            console.error('Error fetching tasks:', error)
            return []
        }
    }
})

export const tasksAtom = atom({
    key:'tasksAtom',
    default:tasksFetcherSelector
}
)
*/


import { selectorFamily, atomFamily, atom, selector } from 'recoil';

// Fetch task IDs from the backend
export const tasksAtom = atom({
    key: 'tasksAtom',
    default: selector({
        key: 'tasksFetcher',
        get: async () => {
            try {
                const response = await fetch('http://localhost:3000/tasks');
                const tasks = await response.json();
                return tasks.map((task) => task.ID);
            } catch (error) {
                console.error('Error fetching tasks:', error);
                return [];
            }
        },
    }),
});

// WE CAN GET RID OF taskFetcherSelector and directly fetch tasks from backend in taskAtom.How? atom's default value can't be async ?? 
// like this [IIF]
/*

import { atom } from 'recoil';

export const tasksAtom = atom({
  key: 'tasksAtom',
  default: (async () => {
    try {
      const response = await fetch('http://localhost:3000/tasks');
      const tasks = await response.json();
      return tasks;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return [];
    }
  })(), // Immediately invoke the async function
});


*/




/**
 * JavaScript Array `reduce` Method - Summary and Examples
 * --------------------------------------------------------
 * The `reduce` method executes a reducer function on each element of the array,
 * resulting in a single output value (e.g., number, object, array).
 *
 * Syntax:
 * array.reduce((accumulator, currentValue, index, array) => {
 *    // logic to update accumulator
 *    return updatedAccumulator;
 * }, initialValue);
 *
 * Parameters:
 *  - accumulator: Value carried over between iterations (starts as `initialValue`).
 *  - currentValue: Current element being processed.
 *  - index: (Optional) Index of the current element.
 *  - array: (Optional) The array being processed.
 *  - initialValue: Initial value of the accumulator (important for initialization).
 *
 * Examples:
 *
 * 1. Summing Numbers:
 * const numbers = [1, 2, 3, 4];
 * const sum = numbers.reduce((total, num) => total + num, 0); // Initial total = 0
 * console.log(sum); // Output: 10
 *
 * 2. Counting Occurrences:
 * const fruits = ['apple', 'banana', 'apple', 'orange'];
 * const fruitCount = fruits.reduce((count, fruit) => {
 *     count[fruit] = (count[fruit] || 0) + 1;
 *     return count;
 * }, {});
 * console.log(fruitCount); // Output: { apple: 2, banana: 1, orange: 1 }
 *
 * 3. Grouping Items:
 * const items = [
 *     { name: 'Milk', category: 'Dairy' },
 *     { name: 'Apple', category: 'Fruit' },
 *     { name: 'Cheese', category: 'Dairy' },
 * ];
 * const grouped = items.reduce((groups, item) => {
 *     const category = item.category;
 *     if (!groups[category]) groups[category] = [];
 *     groups[category].push(item);
 *     return groups;
 * }, {});
 * console.log(grouped);
 * // Output: { Dairy: [...], Fruit: [...] }
 *
 * 4. Building a Key-Value Object (Our Use Case):
 * const tasks = [
 *     { ID: '1', title: 'Task 1', completed: false },
 *     { ID: '2', title: 'Task 2', completed: true },
 * ];
 * const tasksById = tasks.reduce((acc, task) => {
 *     acc[task.ID] = task; // Use task ID as key
 *     return acc;
 * }, {});
 * console.log(tasksById);
 * // Output: { '1': {...}, '2': {...} }
 */


// using atomFamily to lazy load required task 

// Fetch a task from the backend
export const taskSelectorFamily = selectorFamily({
    key: 'taskSelectorFamily',
    get: (taskID) => async () => {
        try {
            const response = await fetch(`http://localhost:3000/tasks/${taskID}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch task with ID ${taskID}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching task ${taskID}:`, error);
            return null; // Fallback
        }
    },
});

// Store each task as an atom, but initialize it from taskSelectorFamily
export const taskFamily = atomFamily({
    key: 'taskFamily',
    default: selectorFamily({
        key: 'taskInitializer',
        get: (taskID) => ({ get }) => {
            return get(taskSelectorFamily(taskID)); // Load initial value from backend
        },
    }),
});