import { capitalize } from "@/Logic/helper";
import React from "react";

const Step = ({ cpt, title, description, active }) => (
    <li
        className={`flex items-center ${
            active ? "text-info-600" : "text-gray-500"
        } space-x-2.5`}
    >
        <span
            className={`flex items-center justify-center w-8 h-8 border ${
                active ? "border-info-600" : "border-gray-500"
            } rounded-full shrink-0`}
        >
            {cpt}
        </span>
        <span>
            <h3 className="font-medium leading-tigh">{capitalize(title)}</h3>
            <p className="text-sm ">{capitalize(description)}</p>
        </span>
    </li>
);

const Stepper = ({ steps, currentStep }) => {
    return (
        <ol className="items-center w-full space-y-4 md:flex md:space-x-8 md:space-y-0">
            {steps.map(({title, description}, idx) => (
                <Step
                    key={idx}
                    cpt={idx + 1}
                    title={title}
                    description={description}
                    active={currentStep === idx}
                />
            ))}
        </ol>
    );
};

export default Stepper;
