import React, {ChangeEvent, FC} from 'react';
import {FilterValuesType} from "./AppWithRedux";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "./state/tasks-reducer";
import {Delete} from "@mui/icons-material";


type TodoListPropsType = {
    todoListId: string
    title: string
    filter: FilterValuesType

    changeTodoListTitle: (title: string, todoListId: string) => void

    changeTodoListFilter: (todoListId: string, filter: FilterValuesType) => void
    removeTodoList: (todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean

}

export const TodoList = (props: TodoListPropsType) => {

    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.todoListId])
    const dispatch = useDispatch()


  /*  const handlerCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(props.todoListId, filter)*/
    const removeTodoList = () => props.removeTodoList(props.todoListId)
    const changeTodoListTitle = (title:string) => props.changeTodoListTitle(title, props.todoListId)

    const onAllClickHandler = () => props.changeTodoListFilter( props.todoListId, "all",);
    const onActiveClickHandler = () => props.changeTodoListFilter(props.todoListId,"active");
    const onCompletedClickHandler = () => props.changeTodoListFilter( props.todoListId, "completed",);


/*    return (
        <div className={"todolist"}>
            <Typography
            variant={"h5"}
            align={'center'}
            fontWeight={'bold'}
            gutterBottom={true}
            ><EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton
                    size={"small"}
                    onClick={removeTodoList}>
                    <HighlightOffIcon />
                </IconButton>
            </Typography>
            <AddItemForm maxLengthUserMessage={15} addNewItem={addTask}/>
            <TasksList
                changeTaskTitle={props.changeTaskTitle}
                todoListId={props.todoListId}
                tasks={props.tasks}
                removeTask={props.removeTask}
                changeTaskStatus={props.changeTaskStatus}
            />
            <div className="filter-btn-container">
                <Button
                    size={'small'}
                    variant={'contained'}
                    disableElevation
                    color={props.filter ==="all" ? "secondary" : "primary"}
                    onClick={handlerCreator('all')}
                >All</Button>
                <Button
                    size={'small'}
                    variant={'contained'}
                    disableElevation
                    color={props.filter ==="active" ? "secondary" : "primary"}
                    onClick={handlerCreator('active')}
                >Active</Button>
                <Button
                    size={'small'}
                    variant={'contained'}
                    disableElevation
                    color={props.filter ==="completed" ? "secondary" : "primary"}
                    onClick={handlerCreator("completed")}
                >Completed</Button>
            </div>
        </div>
    );
};*/


    return <div>
        <h3> <EditableSpan title={props.title} changeTitle={changeTodoListTitle} />
            <IconButton onClick={removeTodoList}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addNewItem={(title) => {
            dispatch(AddTaskAC(title, props.todoListId));
        }}/>
        <div>
            {
                tasks.map(t => {
                    const onClickHandler = () => dispatch(RemoveTaskAC(t.id, props.todoListId));
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(ChangeTaskStatusAC(t.id, newIsDoneValue, props.todoListId))
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        dispatch(ChangeTaskTitleAC(t.id, newValue, props.todoListId));
                    }


                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                            checked={t.isDone}
                            color="primary"
                            onChange={onChangeHandler}
                        />

                        <EditableSpan title={t.title} changeTitle={onTitleChangeHandler} />
                        <IconButton onClick={onClickHandler}>
                            <Delete />
                        </IconButton>
                    </div>
                })
            }
        </div>
        <div>
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
}

export default TodoList;