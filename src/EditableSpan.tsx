import React, {ChangeEvent, FC, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
    spanClasses?: string
    inputClasses?: string
}

const EditableSpan: FC<EditableSpanPropsType> = (
    {
        title,
        changeTitle,
        spanClasses
    }) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [localTitle, setLocalTitle] = useState<string>(title)
    const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalTitle(e.currentTarget.value)
    }
    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
        changeTitle(localTitle)
    }

    return (
        editMode
            ? <input value={localTitle}
                     onChange={changeLocalTitle}
                     autoFocus={true}
                     onBlur={offEditMode}
            />
            : <span onDoubleClick={onEditMode}
                    className={spanClasses}>{title}</span>
    );
};

export default EditableSpan;