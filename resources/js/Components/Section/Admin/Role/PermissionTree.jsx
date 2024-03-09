import React, { useState } from "react";
import Checkbox from "@/Components/Checkbox";
import InputLabel from "@/Components/InputLabel";
import {
	MdKeyboardArrowDown as AD,
	MdKeyboardArrowRight as AR,
} from "react-icons/md";

const PermissionTree = ({ data, setData }) => {
	const permissions = [
		{ Dashboard: [] },
		{ Product: ["create", "edit", "read", "delete"] },
		{ Section: ["create", "edit", "read", "delete"] },
		{ Category: ["create", "edit", "read", "delete"] },
		{ Brand: ["create", "edit", "read", "delete"] },
	];

	const handleParentPermissionToggle = (e) => {
		const permissions = [...data.permissions];
		const parent = e.target;

		const parentIndex = permissions.findIndex((p) => p == parent.value);
		if (parentIndex == -1) {
			permissions.push(parent.value);
		} else {
			permissions.splice(parentIndex, 1);
		}

		document
			.querySelectorAll(`[data-child=${parent.value}]`)
			.forEach((childEl) => {
				const childValue = childEl.value;

				const childIndex = permissions.findIndex(
					(p) => p == childValue
				);

				if (parentIndex == -1) {
					permissions.push(childValue);
				} else {
					permissions.splice(childIndex, 1);
				}
			});

		setData("permissions", permissions);
	};

	const handleChildPermissionToggle = (e) => {
		const permissions = [...data.permissions];
		const child = e.target;
		const parentEl = document.querySelector(`#${child.dataset.child}`);

		const permissionIndex = permissions.findIndex((p) => p == child.value);
		if (permissionIndex == -1) {
			permissions.push(child.value);
		} else {
			permissions.splice(permissionIndex, 1);
		}

		const pIndex = permissions.findIndex((p) => p == parentEl.value);
		if (pIndex == -1) {
			permissions.push(parentEl.value);
		} else {
			let uncheckedChilds = true;

			document
				.querySelectorAll(`[data-child=${child.dataset.child}]`)
				.forEach((child) => {
					const childIndex = permissions.findIndex(
						(p) => p == child.value
					);
					if (childIndex != -1) uncheckedChilds = false;
				});

			if (uncheckedChilds) {
				permissions.splice(pIndex, 1);
			}
		}
		setData("permissions", permissions);
	};

	return (
		<>
			{permissions.map((permission, permissionIndex) => {
				const key = Object.keys(permission)[0];
				const [open, setOpen] = useState(true);
				return (
					<div key={permissionIndex}>
						<PermissionParent
							open={open}
							setOpen={setOpen}
							objKey={key}
							changeHandler={handleParentPermissionToggle}
							permissions={data.permissions}
						/>
						<div className={`ml-7 ${open ? "" : "hidden"}`}>
							{permission[key].map((action) => {
								return (
									<div
										key={crypto.randomUUID()}
										className="flex items-center ms-7"
									>
										<PermissionChild
											objKey={key}
											action={action}
											changeHandler={
												handleChildPermissionToggle
											}
											permissions={data.permissions}
										/>
									</div>
								);
							})}
						</div>
					</div>
				);
			})}
		</>
	);
};

const PermissionParent = ({
	open,
	setOpen,
	objKey,
	changeHandler,
	permissions,
}) => (
	<div className="flex items-center">
		<span
			className="me-1 text-sm text-gray-500 dark:text-gray-400"
			onClick={(e) => setOpen(!open)}
		>
			{open ? <AD className={`w-6 h-6`} /> : <AR className={`w-6 h-6`} />}
		</span>
		<Checkbox
			name="permission[]"
			value={objKey}
			id={objKey}
			onChange={changeHandler}
			checked={permissions.some((p) => p === objKey)}
		/>
		<InputLabel className="select-none" htmlFor={objKey} value={objKey} />
	</div>
);

const PermissionChild = ({ objKey, action, changeHandler, permissions }) => (
	<>
		<Checkbox
			data-child={objKey}
			name="permission[]"
			value={`${objKey}.${action}`}
			id={`${objKey}.${action}`}
			onChange={changeHandler}
			checked={permissions.some((p) => p == `${objKey}.${action}`)}
		/>
		<InputLabel
			className="select-none"
			value={action}
			htmlFor={`${objKey}.${action}`}
		/>
	</>
);

export default PermissionTree;
