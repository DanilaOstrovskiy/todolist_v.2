import {TasksStateType} from "../AppWithReducers";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./todolists-reducer";

export type RemoveTaskAT = ReturnType<typeof RemoveTaskAC>

export type AddTaskAT = ReturnType<typeof AddTaskAC>

export type ChangeTaskStatusAT = ReturnType<typeof ChangeTaskStatusAC>

export type ChangeTaskTitleAT = ReturnType<typeof ChangeTaskTitleAC>

export type ActionsType = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT |  ChangeTaskTitleAT | AddTodoListAT | RemoveTodoListAT

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType) => {
    ///need to fix
    switch (action.type) {
        case "REMOVE-TASK":{
            const stateCopy = {...state};
            const tasks = state[action.todoListId];
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todoListId] = filteredTasks;
            return stateCopy;
        }
        case "ADD-TASK": {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todoListId];
            const newTask = {id: v1(), title: action.title, isDone: false};
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todoListId] = newTasks;
            return stateCopy;
        }
        case "CHANGE-TASK-STATUS":{
                const stateCopy = {...state};
                let tasks = stateCopy[action.todoListId];
                stateCopy[action.todoListId] = tasks.map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
                return stateCopy;
            }
        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state};
            let tasks = stateCopy[action.todoListId];
            // найдём нужную таску:
            let task = tasks.find(t => t.id === action.taskId);
            //изменим таску, если она нашлась
            if (task) {
                task.title = action.title;
            }
            return stateCopy;
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state};
            stateCopy[action.todolistId] = [];
            return stateCopy;
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.id]
            return stateCopy;
        }
        default:
            return state
    }
}

export const RemoveTaskAC = (taskId: string, todoListId: string) => ({type: "REMOVE-TASK", taskId, todoListId}) as const

export const AddTaskAC = (title: string, todoListId: string) => ({type: "ADD-TASK", title, todoListId

}) as const

export const ChangeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string) => ({type: "CHANGE-TASK-STATUS", taskId, isDone, todoListId
}) as const

export const ChangeTaskTitleAC = (taskId: string, title:string, todoListId: string) => ({
    type: "CHANGE-TASK-TITLE", taskId, title, todoListId
}) as const

