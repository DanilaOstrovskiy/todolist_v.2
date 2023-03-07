import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";


// CRUD
// R - filter, sort, search

export type FilterValuesType = "all" | "active" | "completed"

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [todoListsId: string]: Array<TaskType>
}

type TodoListsStateType = Array<TodoListType>


function App(): JSX.Element {
    //BLL:
    const todoListsId_1 = v1()
    const todoListsId_2 = v1()
    const [todoLists, setTodoLists] = useState<TodoListsStateType>([
        {id: todoListsId_1, title: "What to learn", filter: "all"},
        {id: todoListsId_2, title: "What to buy", filter: "all"}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListsId_1]: [
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "ES6 & TS", isDone: true},
            {id: v1(), title: "React & Redux", isDone: false},
        ],
        [todoListsId_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bred", isDone: true},
            {id: v1(), title: "MEAT", isDone: false},
    ]
})

    //BLL:

    const removeTask = (taskId: string, todoListId: string) => {
/*
        const tasksForUpdate = tasks[todoListId]
        const updatedTasks = tasksForUpdate.filter(t => t.id !== taskId)
        const copyTasks = {...tasks}
        copyTasks[todoListId]= updatedTasks
        setTasks(copyTasks)
*/

        setTasks({...tasks,
            [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})
    }

    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const tasksForUpdate = tasks[todoListId]
        const updatedTasks = [newTask, ...tasksForUpdate]
        const copyTasks = {...tasks}
        copyTasks[todoListId]= updatedTasks
        setTasks(copyTasks)

        setTasks({...tasks, [todoListId]: [newTask, ...tasksForUpdate]})
    }

    const changeTaskStatus = (taskId: string, newIsDone: boolean, todoListId: string) => {
/*        const tasksForUpdate = tasks[todoListId]
        const updatedTasks = tasksForUpdate.map(t => t.id === taskId? {...t, isDone: newIsDone}: t)
        const copyTasks = {...tasks}
        copyTasks[todoListId]= updatedTasks
        setTasks(copyTasks)*/
        //
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId? {...t, isDone: newIsDone}: t)})
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId? {...t, title: newTitle}: t)})
    }
    const changeTodoListTitle = (title: string, todoListId: string) => {
        setTodoLists(todoLists.map(tl=> tl.id === todoListId ? {...tl, title: title} : tl))
    }



    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(tl=> tl.id === todoListId ? {...tl, filter: filter} : tl))
    }


    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        const copyTasks = {...tasks}
        delete copyTasks[todoListId]
        setTasks(copyTasks)
        //delete tasks[todoListId]
    }
    const addTodoList = (title: string) => {
        const newTodoListId = v1()
        const newTodoList: TodoListType = {
            id:newTodoListId,
            title:title,
            filter:'all'
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListId]: []})
    }

    const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
        switch (filter) {
            case "active":
                return tasks.filter(t => t.isDone === false)
            case "completed":
                return tasks.filter(t => t.isDone === true)
            default:
                return tasks
        }
    }

    const todoListsComponents = todoLists.map(tl => {
        const filteredTasks: Array<TaskType> = getFilteredTasks(tasks[tl.id], tl.filter)
        return (
            <TodoList
                key={tl.id}
                todoListId={tl.id}
                title={tl.title}
                tasks={filteredTasks}
                filter={tl.filter}

                removeTask={removeTask}
                addTask={addTask}

                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
                changeTodoListTitle={changeTodoListTitle}

                changeTodoListFilter={changeTodoListFilter}
                removeTodoList={removeTodoList}
            />
        )
    })

    //UI:
    return (
        <div className="App">
            <AddItemForm maxLengthUserMessage={15} addNewItem={addTodoList}/>
            {todoListsComponents}
        </div>
    );
}

export default App;
