import React from "react";
import { Head, useForm } from "@inertiajs/react";
import Container from "@/Components/Container";
import Heading from "@/Components/Heading";
import InputError from "@/Components/InputError";
import Label from "@/Components/Label";
import { Input } from "@/Components/TextInput";
import AppLayout from "@/Layouts/AppLayout";
import { IndigoButton } from "@/Components/Button";

const Contact = () => {
	const { post, data, setData, errors, reset } = useForm({
		name: "",
		phone: "",
		email: "",
		subject: "",
		message: "",
	});

	const submitHandler = (e) => {
		e.preventDefault();

        post(route("contact.store"), {
            onSuccess: () => reset(),
        });
	};

	return (
		<AppLayout>
			<Head title="Nous contactez" />
			<Container>
				<section>
					<div className="px-4 mx-auto max-w-screen-md">
						<Heading
							level={2}
							className="text-center tracking-tight mb-4 text-gray-800"
						>
							Contactez Nous
						</Heading>

						<p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
							Vous avez un problème technique ? Vous souhaitez
							envoyer des commentaires sur quelque chose ? Besoin
							de détails sur notre plan Business ? Faites le nous
							savoir.
						</p>

						<form className="space-y-8" onSubmit={submitHandler}>
							<div>
								<Label htmlFor="email" className="mb-2">
									Adresse e-mail
								</Label>
								<Input
									id="email"
									name="email"
									type="email"
									value={data.email}
									onChange={(e) =>
										setData("email", e.target.value)
									}
								/>
								<InputError
									message={errors.email}
									className="mt-2"
								/>
							</div>

							<div className="grid sm:grid-cols-2 gap-4">
								<div>
									<Label htmlFor="name" className="mb-2">
										Nom prénom
									</Label>
									<Input
										id="name"
										name="name"
										value={data.name}
										onChange={(e) =>
											setData("name", e.target.value)
										}
									/>
									<InputError
										message={errors.name}
										className="mt-2"
									/>
								</div>
								<div>
									<Label htmlFor="phone" className="mb-2">
										N° tél
									</Label>
									<Input
										id="phone"
										name="phone"
										value={data.phone}
										onChange={(e) =>
											setData("phone", e.target.value)
										}
									/>
									<InputError
										message={errors.phone}
										className="mt-2"
									/>
								</div>
							</div>

							<div>
								<Label htmlFor="subject" className="mb-2">
									Sujet
								</Label>

								<Input
									id="subject"
									name="subject"
									value={data.subject}
									onChange={(e) =>
										setData("subject", e.target.value)
									}
								/>

								<InputError message={errors.subject} />
							</div>

							<div className="sm:col-span-2">
								<Label className="mb-2" htmlFor="message">
									Votre message
								</Label>

								<textarea
									id="message"
									rows="6"
									className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-info-500 focus:border-info-500"
									placeholder="laissez un commentaire..."
									value={data.message}
									onChange={(e) =>
										setData("message", e.target.value)
									}
								></textarea>
							</div>
							<div className="flex justify-center">
								<IndigoButton>Envoyer</IndigoButton>
							</div>
						</form>
					</div>
				</section>
			</Container>
		</AppLayout>
	);
};

export default Contact;
