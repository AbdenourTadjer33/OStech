import React, { createContext, useContext, useState } from "react";
import {
    MdKeyboardArrowDown as AD,
    MdKeyboardArrowUp as AT,
} from "react-icons/md";

const AccordionContext = createContext();

const Accordion = ({ children, title, state = false, className }) => {
    const [open, setOpen] = useState(state);
    return (
        <AccordionContext.Provider value={{ setOpen, open }}>
            <div
                onClick={(e) => setOpen(!open)}
                className={`flex items-center justify-between p-4 bg-gray-200 hover:bg-opacity-70 dark:bg-gray-600 dark:hover:bg-opacity-70 rounded-lg ${
                    open && "rounded-b-none"
                } shadow select-none cursor-pointer ${className}`}
            >
                <h3 className="text-2xl">{title}</h3>
                {open ? <AD className="w-6 h-6" /> : <AT className="w-6 h-6" />}
            </div>
            {children}
        </AccordionContext.Provider>
    );
};

const Body = ({ children, className }) => {
    const { open, setOpen } = useContext(AccordionContext);

    if (open) {
        return (
            <div
                className={`p-4 border border-gray-200 dark:border-gray-600 ${className}`}
            >
                {children}
            </div>
        );
    }
};

Accordion.Body = Body;

export default Accordion;
