import React, {
    useContext,
    useEffect,
    useState,
} from "react";

import { EditProductFormContext } from "../EditForm";
import { MdOpenInNew, MdDelete, MdModeEdit } from "react-icons/md";
import InlineButton from "@/Components/InlineButton";
import Button from "@/Components/Button";
import { TbGridDots } from "react-icons/tb";
const EditImages = () => {
    const { data, setData, errors } = useContext(EditProductFormContext);
    const [collapse, setCollapse] = useState(false);
    const [draggedRow, setDraggedRow] = useState(null);
    const [dragOverRow, setDragOverRow] = useState(null);

    const handleDragStart = (e, row) => {
        e.dataTransfer.effectAllowed = "move";
        setDraggedRow(row);
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        setDragOverRow(index);
    };

    const handleDrop = (e, index) => {
        e.preventDefault();
        handleRowDrag(draggedRow, index);
        setDraggedRow(null);
        setDragOverRow(null);
    };

    const handleRowDrag = (draggedRow, newIndex) => {
        const newTableData = [...data.images];
        const draggedRowIndex = newTableData.findIndex(
            (row) => row === draggedRow
        );
        newTableData.splice(draggedRowIndex, 1);
        newTableData.splice(newIndex, 0, draggedRow);
        setData("images", newTableData);
    };

    return (
        <>
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-3xl">Images</h2>
            </div>


            {data.images.length > 0 && (
                <div
                    className={`${
                        collapse ? "max-h-[25rem]" : "h-full"
                    } overflow-auto rounded-lg`}
                >
                    <div className="bg-gray-50 dark:bg-gray-700 shadow-md py-3 px-4 flex justify-end">
                        <Button
                            type="button"
                            onClick={() => setCollapse(!collapse)}
                        >
                            {collapse ? "Expand" : "Collapse"}
                        </Button>
                    </div>
                    <table className="w-full">
                        <tbody>
                            {data.images?.map((image, idx) => (
                                <tr
                                    draggable
                                    onDragStart={(e) =>
                                        handleDragStart(e, image)
                                    }
                                    onDragOver={(e) => handleDragOver(e, idx)}
                                    onDrop={(e) => handleDrop(e, idx)}
                                    key={idx}
                                    className={`px-5 py-2 bg-gray-50 border border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-opacity-75 ${
                                        idx === dragOverRow
                                            ? "border-t-2 border-blue-500 dark:border-blue-700"
                                            : ""
                                    } `}
                                >
                                    <td className="py-2 w-16 cursor-move">
                                        <button
                                            type="button"
                                            className="w-full cursor-move inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                                        >
                                            <TbGridDots className="w-5 h-5 mx-auto" />
                                        </button>
                                    </td>
                                    <td className="pe-4 py-2">
                                        <img
                                            className="w-16 md:w-28 max-h-full"
                                            src={"/media/" + image.file_path}
                                        />
                                    </td>
                                    <td className="px-4 py-2 space-x-4 text-center">
                                        <InlineButton
                                            btn="primary"
                                            // onClick={(e) => {
                                            //     setImg(url);
                                            //     openSeeModal();
                                            // }}
                                            className="capitalize"
                                        >
                                            <MdOpenInNew className="w-5 h-5 md:hidden" />
                                            <span className="hidden md:block">
                                                voir
                                            </span>
                                        </InlineButton>
                                        <InlineButton
                                            btn="info"
                                            // onClick={(e) => {
                                            //     setImg(url);
                                            //     openEditModal();
                                            // }}
                                            className="capitalize"
                                        >
                                            <MdModeEdit className="w-5 h-5 md:hidden" />
                                            <span className="hidden md:block">
                                                éditer
                                            </span>
                                        </InlineButton>
                                        <InlineButton
                                            btn="danger"
                                            // onClick={(e) => {
                                            //     setImg(url);
                                            //     deleteImg();
                                            // }}
                                            className="capitalize"
                                        >
                                            <MdDelete className="w-5 h-5 md:hidden" />
                                            <span className="hidden md:block">
                                                Supprimer
                                            </span>
                                        </InlineButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default EditImages;
