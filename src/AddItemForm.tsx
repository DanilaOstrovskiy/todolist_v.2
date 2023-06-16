import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

type AddItemFormType = {
    addNewItem: (title: string) => void
}

const AddItemForm:FC<AddItemFormType> = ({

                                             addNewItem
}) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>)=>{
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            addNewItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

    const onKeyDownAddItem = (e: KeyboardEvent<HTMLInputElement>)=> e.key === "Enter" && addItem()

    const userErrorMessage = error && <div style={{color: "hotpink"}}>Title is required!</div>
    const isAddBtnDisabled = !title.length  || error
    const userMaxLengthMessage =  <div style={{color: "hotpink"}}>Task title is to long!</div>
    const inputErrorClasses = error ? "input-error" : ""
    const onKeyDownHandler = isAddBtnDisabled ? undefined : onKeyDownAddItem
    const isInputShowError =  error
    const helperText = (error && "Title is required!") || ("Task title is to long!")

    return (
        <div>
            {/*<input ref={addTaskInput}/>*/}
            {/*<button onClick={addTask}>+</button>*/}
            <TextField
                size={"small"}
                value={title}
                placeholder="Please, enter title"
                onChange={changeLocalTitle}
                onKeyDown={onKeyDownHandler}
                className={inputErrorClasses}
                error={isInputShowError}
                helperText={helperText}
            />


            <IconButton
                size={"small"}
                disabled={isAddBtnDisabled}
                onClick={addItem}>
                <AddCircleOutlineIcon />
            </IconButton>
{/*            {userMaxLengthMessage}
            {userErrorMessage}*/}
        </div>
    );
};

export default AddItemForm;