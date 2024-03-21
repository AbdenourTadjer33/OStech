import React, {
	useState,
	useEffect,
	useContext,
	createContext,
	useRef,
} from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Button from "@/Components/Button";
import { FaCheck, FaFilter, FaSearch } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import Pagination from "@/Components/Pagination";
import Table from "@/Components/Table";
import { Dropdown } from "flowbite-react";
import Accordion from "@/Components/Accordion";
import { debounce, hasObjectWithKeyValue } from "@/Logic/helper";
import { Search } from "@/Components/InputSearch";
import {
	OrderRow,
	OrderTitleRow,
} from "@/Components/Section/Admin/Order/OrderRow";
import Heading from "@/Components/Heading";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { HiMiniChevronUpDown } from "react-icons/hi2";
import RadioInput from "@/Components/RadioInput";
import { RangeSlider } from "@/Components/TextInput";
import useUrlParam from "@/Logic/useUrlParamState";
import {
	intervalOptions,
	statusOptions,
	onlineOptions,
} from "@/Logic/OrderOptions";
import Checkbox from "@/Components/Checkbox";

const OrderIndexContext = createContext();

const Index = ({ orders }) => {
	const {
		data,
		current_page,
		next_page_url,
		prev_page_url,
		links,
		per_page,
		total,
		last_page,
	} = orders;

	const { url } = usePage();
	const [filteredData, setFilteredData] = useState(data);
	const [searchQuery, setSearchQuery] = useState("");
	const [interval, setInterval] = useUrlParam(
		intervalOptions[0].name,
		"interval",
		intervalOptions,
		"name"
	);

	const [selectedStatus, setSelectedStatus] = useUrlParam(
		[],
		"status",
		statusOptions,
		"value"
	);

	const [online, setOnline] = useUrlParam(
		"all",
		"online",
		onlineOptions,
		"value"
	);

	const handleSearch = (e) => {
		const query = e.target.value.toLowerCase();
		setSearchQuery(query);

		const filtered = data.filter(
			(record) =>
				record.ref.toLowerCase().includes(query) ||
				record?.client?.name.toLowerCase().includes(query)
		);

		setFilteredData(filtered);
	};

	useEffect(() => {
		setFilteredData(orders.data);
	}, [orders]);

	return (
		<OrderIndexContext.Provider
			value={{
				url,
				intervalOptions,
				statusOptions,
				onlineOptions,
				selectedStatus,
				setSelectedStatus,
				online,
				setOnline,
				interval,
				setInterval,
			}}
		>
			<AdminLayout>
				<Head title="Gestion de ventes" />
				<Heading level={3} className="mb-5">
					Commande et ventes
				</Heading>

				<div className="w-full">
					<div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-visible">
						<div className="p-4">
							<h4 className="text-xl">
								Total commande : <span>{total}</span>
							</h4>
						</div>

						<hr className="h-px mb-2 bg-gray-200 border-0 dark:bg-gray-700 mx-4" />

						<div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
							<div className="w-full md:w-1/2">
								<form className="flex items-center">
									<div className="relative w-full">
										<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
											<FaSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
										</div>
										<Search
											value={searchQuery}
											onChange={handleSearch}
										/>
									</div>
								</form>
							</div>
							<div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
								<div className="flex items-center space-x-3 w-full md:w-auto">
									<Filter />
								</div>

								<Link href={"/"}>
									<Button btn="primary" type="button">
										Créer une commande
									</Button>
								</Link>
							</div>
						</div>

						<hr className="h-px mb-2 bg-gray-200 border-0 dark:bg-gray-700 mx-4" />

						<div className="px-4 py-2 flex flex-col sm:flex-row items-center justify-end gap-4">
							<div className="w-full sm:max-w-xs">
								<IntervalSelection />
							</div>
						</div>

						<div className="overflow-x-auto" id="table-container">
							<Table className="table-auto">
								<OrderTitleRow />
								<Table.Body>
									{filteredData.map((record) => {
										return (
											<OrderRow
												key={record.ref}
												record={record}
											/>
										);
									})}
								</Table.Body>
							</Table>
						</div>

						<nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4">
							<Pagination
								currentPage={current_page}
								next={next_page_url}
								prev={prev_page_url}
								links={links}
								perPage={per_page}
								total={total}
								last_page={last_page}
							/>
						</nav>
					</div>
				</div>
			</AdminLayout>
		</OrderIndexContext.Provider>
	);
};

export default Index;

const StatusSelection = () => {};

const IntervalSelection = () => {
	const {
		url,
		interval,
		setInterval,
		intervalOptions: options,
	} = useContext(OrderIndexContext);

	const isFirstRender = useRef(true);
	useEffect(() => {
		if (!isFirstRender.current) {
			const debouncedApiCall = debounce(() => {
				router.visit(url, {
					method: "get",
					preserveScroll: true,
					preserveState: true,
					data: {
						interval,
					},
					only: ["orders"],
				});
			}, 250);

			debouncedApiCall();

			return () => debouncedApiCall.cancel();
		}
		isFirstRender.current = false;
	}, [interval]);

	return (
		<Listbox value={interval} onChange={(e) => setInterval(e)}>
			<div className="relative">
				<Listbox.Button className="relative w-full p-2.5 text-sm sm:text-base text-start font-medium text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
					<span className="block truncate">
						{
							options.find((option) => option.name === interval)
								?.label
						}
					</span>
					<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
						<HiMiniChevronUpDown className="w-5 h-5 text-gray-400" />
					</span>
				</Listbox.Button>
				<Transition
					as={Fragment}
					leave="transition ease-in duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<Listbox.Options className="absolute mt-1.5 max-h-60 w-full overflow-auto rounded-md bg-gray-50 dark:bg-gray-700 py-1 text-base sm:text-lg shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
						{options.map(({ name, label }, idx) => (
							<Listbox.Option
								key={idx}
								className={({ active, selected }) =>
									`relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900 dark:text-white  ${
										active
											? " bg-gray-100 dark:bg-gray-500"
											: ""
									}
									${" "}
									${selected ? "bg-gray-100 dark:bg-gray-500/75" : ""}
									`
								}
								value={name}
							>
								{({ selected }) => (
									<>
										<span
											className={`block truncate ${
												selected
													? "font-medium"
													: "font-normal"
											}`}
										>
											{label}
										</span>
										{selected ? (
											<span className="absolute inset-y-0 left-0 flex items-center pl-3">
												<FaCheck className="h-5 w-5" />
											</span>
										) : null}
									</>
								)}
							</Listbox.Option>
						))}
					</Listbox.Options>
				</Transition>
			</div>
		</Listbox>
	);
};

const Filter = () => {
	const {
		url,
		selectedStatus,
		setSelectedStatus,
		online,
		setOnline,
		onlineOptions,
		statusOptions,
	} = useContext(OrderIndexContext);
	const [pagination, setPagination] = useState(15);

	const submitHandler = (e) => {
		e.preventDefault();
		router.visit(url, {
			method: "get",
			preserveScroll: true,
			preserveState: true,
			data: {
				status: selectedStatus.toString(),
				online,
				pagination,
			},
			only: ["orders"],
		});
	};

	return (
		<Dropdown
			label=""
			dismissOnClick={false}
			renderTrigger={() => (
				<button
					className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
					type="button"
				>
					<FaFilter className="h-4 w-4 mr-2 text-gray-400" />
					Filter
					<MdKeyboardArrowDown className="-mr-1 ml-1.5 w-5 h-5" />
				</button>
			)}
		>
			<form className="block w-80" onSubmit={submitHandler}>
				<Dropdown.Header>
					<span className="text-base font-medium text-gray-900 dark:text-white">
						Filter
					</span>
				</Dropdown.Header>

				<Accordion title="Status">
					<Accordion.Body>
						{statusOptions.map((option, idx) => (
							<Dropdown.Item
								key={idx}
								as="label"
								htmlFor={"status" + idx}
							>
								<RadioInput
									id={"status" + idx}
									name="status"
									value={option.value}
									checked={selectedStatus == option.value}
									onChange={(e) =>
										setSelectedStatus(e.target.value)
									}
								/>
								<span className="ml-2 text-sm sm:text-base font-medium text-gray-900 dark:text-gray-100">
									{option.label}
								</span>
							</Dropdown.Item>
						))}
					</Accordion.Body>
				</Accordion>

				<Dropdown.Divider />

				<Accordion title="Online">
					<Accordion.Body>
						{onlineOptions.map((option, idx) => (
							<Dropdown.Item
								key={idx}
								as="label"
								htmlFor={"online" + idx}
							>
								<RadioInput
									id={"online" + idx}
									name="online"
									checked={online == option.value}
									value={option.value}
									onChange={(e) => setOnline(e.target.value)}
								/>
								<span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
									{option.label}
								</span>
							</Dropdown.Item>
						))}
					</Accordion.Body>
				</Accordion>

				<Dropdown.Divider />

				<Accordion title="Pagination" state>
					<Accordion.Body>
						<Dropdown.Item>
							<RangeSlider
								name="pagination"
								min="10"
								step="1"
								max="50"
								className="me-2"
								value={pagination}
								onChange={(e) => setPagination(e.target.value)}
							/>
							<span>{pagination}</span>
						</Dropdown.Item>
					</Accordion.Body>
				</Accordion>

				<Dropdown.Divider />

				<div className="flex justify-center py-2">
					<Button>Filtré les résultat</Button>
				</div>
			</form>
		</Dropdown>
	);
};
