import { tasksAtom } from './taskAtom'
import { filterAtoms } from './filterAtom'
import { selector } from 'recoil';
import { taskFamily } from './taskAtom';


/*
export const filteredTasksSelector = selector({
    key: 'filteredTasksSelector', // unique ID (with respect to other atoms/selectors)
    get: ({get}) => {
        const tasks = get(tasksAtom) || []
        const filter = get(filterAtoms)

        if (filter === 'Completed') {
            return tasks.filter(task => task.Completed)
        }
        if (filter === 'Pending'){
            return tasks.filter(task => !task.Completed)
        }
        return tasks
    },
  });
*/


// Filtered tasks selector (uses the locally stored tasks)
export const filteredTasksSelector = selector({
    key: 'filteredTasks',
    get: ({ get }) => {
        const taskIDs = get(tasksAtom);
        const filter = get(filterAtoms);

        const tasks = taskIDs.map((id) => get(taskFamily(id))); // Use local state

        if (filter === 'Completed') return tasks.filter((task) => task?.Completed);
        if (filter === 'Pending') return tasks.filter((task) => !task?.Completed);
        return tasks;
    },
});



/*
export const taskStatsSelector = selector({
    key: 'taskStatsSelector', // unique ID (with respect to other atoms/selectors)
    get: ({ get }) => {
        const tasks = get(tasksAtom) || []
        const totalTasks = tasks.length
        const completedTasks = tasks.filter((task) => { return task.Completed }).length
        // return (totalTasks,completedTasks.length) // not a tuple, JS don't have tuples

        // return [totalTasks,completedTasks.length]

        // more descriptive return statement using object 
        return ({
            'totalTasks': totalTasks,
            'completed': completedTasks,
            'pending': totalTasks - completedTasks
        })
    },
});
*/



export const taskStatsSelector = selector({
    key: 'taskStatsSelector',
    get: ({ get }) => {
        const taskIDs = get(tasksAtom) || [];
        const tasks = taskIDs.map(id => get(taskFamily(id))).filter(task => task !== undefined && task !== null);

        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.Completed).length;

        return {
            totalTasks,
            completed: completedTasks,
            pending: totalTasks - completedTasks,
        };
    }
});

