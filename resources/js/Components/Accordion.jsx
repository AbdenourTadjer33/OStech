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
                className={`flex items-center justify-between px-4 py-1 select-none cursor-pointer`}
            >
                <h3 className="text-base">{title}</h3>
                {open ? <AD className="w-4 h-4" /> : <AT className="w-4 h-4" />}
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
                className={`p-1 ${className}`}
            >
                {children}
            </div>
        );
    }
};

Accordion.Body = Body;

export default Accordion;
