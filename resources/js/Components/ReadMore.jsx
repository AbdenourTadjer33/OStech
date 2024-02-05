import React, { useState } from "react";

const ReadMore = ({ content, min = 30 }) => {
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

    return (
        <>
            {isReadMore ? content.slice(0, min) : content}
            <span className="text-sm text-blue-600 cursor-pointer ms-1" onClick={toggleReadMore}>
                {isReadMore ? "...plus" : "moin"}
            </span>
        </>
    );
};

export default ReadMore;
