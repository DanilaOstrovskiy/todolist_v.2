import {TasksStateType} from "../AppWithReducers";
import {v1} from "uuid";

export type RemoveTaskAT = {
    type: "REMOVE-TASK"
    taskId: string
    todoListId: string
}

export type AddTaskAT = {
    type: "ADD-TASK"
    todoListId: string
    title: string
}

export type ChangeTaskStatusAT = {
    type: "CHANGE-TASK-STATUS"
    taskId: string
    todoListId: string
    isDone: boolean
}

export type ChangeTaskTitleAT = {
    type: "CHANGE-TASK-TITLE"
    taskId: string
    todoListId: string
    title: string
}

export type ActionTaskType = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT |  ChangeTaskTitleAT


export const tasksReducer = (state: TasksStateType, action: ActionTaskType) => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state,
            [action.todoListId]: state[action.todoListId].filter(task => task.id !== action.taskId)}
        case "ADD-TASK":
            return {...state,
            [action.todoListId]: [{id: v1(), title: action.title, isDone: false}]}
        case "CHANGE-TASK-STATUS":
            return {...state,
                [action.todoListId]: state[action.todoListId].map(task =>
                task.id === action.taskId ? {...task, isDone: action.isDone} : task)}
        case "CHANGE-TASK-TITLE":
            return  {...state, [action.todoListId]: state[action.todoListId].map(task => task.id === action.taskId ? {...task, title: action.title} : task)}

    }
}

export const RemoveTaskAC = (taskId: string, todoListId: string) => ({type: "REMOVE-TASK", taskId, todoListId})

export const AddTaskAC = (title: string, todoListId: string) => ({type: "ADD-TASK", title, todoListId

})

export const ChangeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string) => ({type: "CHANGE-TASK-STATUS", taskId, isDone, todoListId
})

export const ChangeTaskTitleAC = (taskId: string, title:string, todoListId: string) => ({
    type: "CHANGE-TASK-TITLE", taskId, title, todoListId
})

