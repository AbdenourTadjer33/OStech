import React from "react";

const Table = ({ className = "", children, ...props }) => {
    return (
        <table
            {...props}
            className={`w-full text-base text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-md ${className}`}
        >
            {children}
        </table>
    );
};

const Head = ({ className = "", children }) => (
    <thead
        className={`text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ${className}`}
    >
        {children}
    </thead>
);

const Body = ({ className = "", children }) => (
    <tbody className={`${className}`}>{children}</tbody>
);

const Foot = ({ className = "", children }) => (
    <tfoot className={`${className}`}>{children}</tfoot>
);

const Row = ({ className = "", children }) => (
    <tr className={`${className}`}>{children}</tr>
);

const Title = ({ className = "", children }) => (
    <th className={`${className}`}>{children}</th>
);

const Column = ({ className = "", children }) => (
    <td className={`${className}`}>{children}</td>
);

Table.Row = Row;
Table.Head = Head;
Table.Body = Body;
Table.Foot = Foot;
Table.Title = Title;
Table.Column = Column;

// whitespace-nowrap;

export default Table;
