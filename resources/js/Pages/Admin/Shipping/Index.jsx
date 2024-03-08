import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";

import AdminLayout from "@/Layouts/AdminLayout";
import Button from "@/Components/Button";
import { FaSearch } from "react-icons/fa";
import Table from "@/Components/Table";
import TextInput from "@/Components/TextInput";

const Index = ({ shippings }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredData, setFilteredData] = useState(shippings);

	const handleSearch = (e) => {
		const query = e.target.value;
		setSearchQuery(query);

		const filtered = shippings.filter(
			(record) =>
				record.wilaya_name
					.toLowerCase()
					.includes(query.toLowerCase()) ||
				record.wilaya_id.toString().includes(query.toLowerCase())
		);

		setFilteredData(filtered);
	};

	return (
		<AdminLayout>
			<Head title="Livraison" />
			<h1 className="text-4xl font-bold mb-3">Livraison</h1>

			<div className="w-full">
				<div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-visible">
					<div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
						<div className="w-full md:w-1/2">
							<div className="flex items-center">
								<div className="relative w-full">
									<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
										<FaSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
									</div>
									<input
										type="text"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
										placeholder="Search"
										value={searchQuery}
										onChange={handleSearch}
									/>
								</div>
							</div>
						</div>
					</div>

					<div className="overflow-x-auto">
						<Table>
							<Table.Head>
								<Table.Row>
									<Table.Title className="px-4 py-3">
										N°
									</Table.Title>
									<Table.Title className="px-4 py-3">
										Nom
									</Table.Title>
									<Table.Title className="px-4 py-3">
										Delai
									</Table.Title>
									<Table.Title className="px-4 py-3">
										Tarif à domicile
									</Table.Title>
									<Table.Title className="px-4 py-3">
										Tarif stop desk
									</Table.Title>
									<Table.Title></Table.Title>
								</Table.Row>
							</Table.Head>
							<Table.Body>
								{filteredData.map((shipping) => (
									<Table.Row
										key={shipping.id}
										className="border-b dark:border-gray-600 "
									>
										<TableRecord
											wilayaId={shipping.wilaya_id}
											wilayaName={shipping.wilaya_name}
											delay={shipping.delay || ""}
											costHome={shipping.cost_home || ""}
											costStopDesk={
												shipping.cost_stop_desk || ""
											}
										/>
									</Table.Row>
								))}
							</Table.Body>
						</Table>
					</div>
					<nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"></nav>
				</div>
			</div>
		</AdminLayout>
	);
};

const TableRecord = ({
	wilayaId,
	wilayaName,
	delay,
	costHome,
	costStopDesk,
}) => {
	const { data, setData, post, errors, clearErrors } = useForm({
		delay: delay,
		cost_home: costHome,
		cost_stop_desk: costStopDesk,
	});
   

	const edit = () => {
		// if (
		// 	data.delay == delay &&
		// 	data.cost_home == costHome &&
		// 	data.cost_stop_desk == costStopDesk
		// ) {
		// 	return;
		// }
		post(route("admin.shipping.update", { wilayaId }), {
			preserveScroll: true,
		});
	};

	return (
		<>
			<Table.Column className="px-4 py-2">{wilayaId}</Table.Column>
			<Table.Column className="px-4 py-2">{wilayaName}</Table.Column>
			<Table.Column className="px-4 py-2">
				<TextInput
					placeholder="Délai de livraison"
					value={data.delay}
					onChange={(e) => {
						setData("delay", e.target.value);
						clearErrors("delay");
					}}
					style={{
						border: `${
							errors.delay ? "1px solid rgb(224, 36, 36)" : ""
						}`,
					}}
				/>
			</Table.Column>
			<Table.Column className="px-4 py-2">
				<TextInput
					placeholder="Tarif à domicile"
					value={data.cost_home}
					onChange={(e) => {
						setData("cost_home", e.target.value);
						clearErrors("cost_home");
					}}
					style={{
						border: `${
							errors.cost_home ? "1px solid rgb(224, 36, 36)" : ""
						}`,
					}}
				/>
			</Table.Column>
			<Table.Column className="px-4 py-2">
				<TextInput
					placeholder="Tarif stop desk"
					value={data.cost_stop_desk}
					onChange={(e) => {
						setData("cost_stop_desk", e.target.value);
						clearErrors("decost_stop_desklay");
					}}
					style={{
						border: `${
							errors.cost_stop_desk
								? "1px solid rgb(224, 36, 36)"
								: ""
						}`,
					}}
				/>
			</Table.Column>
			<Table.Column className="px-4 py-2 space-x-2">
				<Button onClick={edit}>Save</Button>
			</Table.Column>
		</>
	);
};

export default Index;
