import Login from "@/Pages/Auth/Login";
import React, { useState } from "react";
import { useEffect } from "react";
import {
    MdAdd,
    MdModeEdit,
    MdDelete,
    MdOutlineModeEditOutline,
    MdOutlineCancelPresentation,
} from "react-icons/md";

const CategoryItem = ({ category }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [editedName, setEditedName] = useState(category.name);

    const editCategory = () => {
        setIsEdit(true);
    };

    const cancelEdit = () => {
        console.log(category.name)
        setEditedName(category.name);
        setIsEdit(false);
    };

    useEffect(() => {
        console.log(editedName)
    }, [editedName])

const handleNameChange = (e) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const startOffset = range.startOffset;
    setEditedName(e.target.innerText);
    // Restore cursor position
    setTimeout(() => {
        range.setStart(range.startContainer, startOffset);
        range.setEnd(range.endContainer, startOffset);
        selection.removeAllRanges();
        selection.addRange(range);
    });
};

    const saveChanges = () => {
        // Save the changes made to the category name
        console.log("New category name:", editedName);
        // Assuming there's a function to update the category name in the database
        // updateCategoryName(category.id, editedName);
        setIsEdit(false);
    };

    return (
        <div className="w-full flex items-center justify-between px-4 py-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h2
                contentEditable={isEdit}
                suppressContentEditableWarning={true}
                className={`${
                    isEdit && "focus:border-none focus:outline-none"
                } text-xl font-bold tracking-tight text-gray-900 dark:text-white`}
                onBlur={saveChanges}
                onInput={handleNameChange}
            >
                {editedName}
            </h2>

            <div className="flex items-center gap-1">
                {isEdit ? (
                    <>
                        <div
                            onClick={saveChanges}
                            className="text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer">
                            <MdOutlineModeEditOutline className="w-6 h-6" />
                        </div>
                        <div
                            onClick={cancelEdit}
                            className="text-gray-900 dark:text-white hover:text-red-600 dark:hover:text-red-400 cursor-pointer"
                        >
                            <MdOutlineCancelPresentation className="w-6 h-6" />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer">
                            <MdAdd className="w-6 h-6" />
                        </div>
                        <div
                            onClick={editCategory}
                            className="text-gray-900 dark:text-white hover:text-info-600 dark:hover:text-info-400 cursor-pointer"
                        >
                            <MdModeEdit className="w-5 h-5" />
                        </div>
                        <div className="text-gray-900 dark:text-white hover:text-red-600 dark:hover:text-red-400 cursor-pointer">
                            <MdDelete className="w-5 h-5" />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CategoryItem;
