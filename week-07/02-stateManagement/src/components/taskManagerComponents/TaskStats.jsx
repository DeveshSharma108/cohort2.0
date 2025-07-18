import { useRecoilValue } from "recoil";
import { taskStatsSelector } from "../../atoms/taskSelector";

export function TaskStats() {
    const stats = useRecoilValue(taskStatsSelector);

    return (
        <div style={{ padding: "15px", textAlign: "center" }}>
            <progress
                style={{ width: "100%" }}
                value={stats.totalTasks ? stats.completed : 0}
                max={stats.totalTasks || 1}
            />
            <h4>{stats.completed} of {stats.totalTasks} tasks completed</h4>
        </div>
    );
}
