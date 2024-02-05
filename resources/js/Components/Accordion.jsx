import React, { createContext, useContext, useState } from "react";
import {
    MdKeyboardArrowDown as AD,
    MdKeyboardArrowUp as AT,
} from "react-icons/md";

const AccordionContext = createContext();

const Accordion = ({ children, title, state = false }) => {
    const [open, setOpen] = useState(state);
    return (
        <AccordionContext.Provider value={{ setOpen, open }}>
            <div
                onClick={(e) => setOpen(!open)}
                className={`flex items-center justify-between p-4 dark:bg-gray-600 rounded-lg ${
                    open && "rounded-b-none"
                } select-none cursor-pointer`}
            >
                <h3 className="text-3xl">{title}</h3>
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
                className={`p-4  ${className}`}
            >
                {children}
            </div>
        );
    }
};

Accordion.Body = Body;

export default Accordion;
