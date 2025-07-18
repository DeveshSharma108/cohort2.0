import { useRecoilState } from 'recoil'
import { filterAtoms } from '../../atoms/filterAtom'
export function TaskFilter() {
    const [currentFilter, setCurrentFilter] = useRecoilState(filterAtoms)
    function handleOnChange(e){
        setCurrentFilter(e.target.value)
        //console.log(currentFilter)
        // console.log(e.target.value)
    }
    return (
        <>
            <h1>Choose Tasks</h1>
            {["All", "Pending", "Completed"].map((filter) => (
                <FilterOptions key={filter} input={filter} handleOnChange={handleOnChange} />
            ))}
        </>
    );
}

function FilterOptions({ input, handleOnChange }) {
    return (
        <div>
            <input type="radio" id={input} name="TaskFilter" value={input} onChange={handleOnChange} />
            <label htmlFor={input}>{input}</label>
        </div>
    );
}



// /**
//  * 💡 What is `useRecoilCallback`?
//  * It's like a magic wand that lets you create **custom reusable functions** 
//  * to interact with your Recoil atoms and selectors.
//  * 
//  * - You can READ atom/selector values using `get`.
//  * - You can UPDATE atom/selector values using `set`.
//  * - You can RESET atom values to their default using `reset`.
//  * 
//  * 🚀 Why is it cool?
//  * - You can handle complex Recoil logic (like batching updates).
//  * - It works outside React components, so you can have centralized state logic.
//  * - Great for **async operations**, interacting with **atom families**, or advanced state manipulations.
//  * 
//  * Example Scenario:
//  * Imagine a simple **game** where players collect points, and we need to manage their scores dynamically.
//  */

// import { atom, selector, useRecoilCallback, useRecoilValue } from "recoil";

// // 🟢 Atom to store individual player scores (using player IDs)
// const playerScores = atom({
//     key: "playerScores",
//     default: {}, // Default is an empty object where we'll store scores by player ID
// });

// // 🟢 Selector to calculate the total score of all players
// const totalScoreSelector = selector({
//     key: "totalScore",
//     get: ({ get }) => {
//         const scores = get(playerScores);
//         return Object.values(scores).reduce((total, score) => total + score, 0);
//     },
// });

// /**
//  * 🛠️ Custom callback to manage player scores using `useRecoilCallback`.
//  * It includes the following operations:
//  * - `addPoints`: Add points to a specific player.
//  * - `resetPlayer`: Reset a specific player's score to 0.
//  * - `resetAll`: Reset scores for ALL players.
//  */
// const usePlayerScoreManager = () =>
//     useRecoilCallback(({ get, set, reset }) => {
//         return {
//             addPoints: (playerID, points) => {
//                 // Get the current scores
//                 const scores = get(playerScores);

//                 // Update the score for the given player
//                 set(playerScores, {
//                     ...scores,
//                     [playerID]: (scores[playerID] || 0) + points,
//                 });
//                 console.log(`Added ${points} points to Player ${playerID}!`);
//             },

//             resetPlayer: (playerID) => {
//                 // Reset a specific player's score
//                 const scores = get(playerScores);
//                 const updatedScores = { ...scores };
//                 delete updatedScores[playerID];
//                 set(playerScores, updatedScores);
//                 console.log(`Reset score for Player ${playerID}!`);
//             },

//             resetAll: () => {
//                 // Reset all scores
//                 reset(playerScores);
//                 console.log("Reset all player scores!");
//             },
//         };
//     });

// /**
//  * 🎮 Example Usage in a Game Component
//  * This component lets you update and reset player scores using our custom callback.
//  */
// function Game() {
//     const { addPoints, resetPlayer, resetAll } = usePlayerScoreManager();
//     const totalScore = useRecoilValue(totalScoreSelector);

//     return (
//         <div>
//             <h1>Total Score: {totalScore}</h1>
//             <button onClick={() => addPoints("player1", 10)}>
//                 Add 10 Points to Player 1
//             </button>
//             <button onClick={() => addPoints("player2", 15)}>
//                 Add 15 Points to Player 2
//             </button>
//             <button onClick={() => resetPlayer("player1")}>
//                 Reset Player 1 Score
//             </button>
//             <button onClick={resetAll}>Reset All Scores</button>
//         </div>
//     );
// }

// /**
//  * 📝 Key Points of `useRecoilCallback`:
//  * 1️⃣ **Reusable Logic**: Define state operations once and use them anywhere.
//  * 2️⃣ **Flexible Operations**: Use `get` to read, `set` to update, and `reset` to clear atoms.
//  * 3️⃣ **Centralized State Handling**: Keep state-related logic outside your components for better code structure.
//  * 4️⃣ **Works with Async**: Perfect for handling server calls or other asynchronous tasks.
//  * 
//  * 🚀 This makes Recoil state management much more powerful and maintainable!
//  */
