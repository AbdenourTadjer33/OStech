import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichEditor = ({...props}) => {


    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, false] }],
            ["bold", "italic", "underline", "blockquote"],
            [{ color: [] }],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            ["link"],
        ],
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "blockquote",
        "color",
        "list",
        "bullet",
        "indent",
        "link",
    ];

    return (
		<>
			<ReactQuill
				{...props}
				spellCheck={false}
				modules={modules}
				formats={formats}
				theme="snow"
				className="bg-gray-100 text-gray-900 w-full"
			/>
		</>
	);
};

export default RichEditor;
