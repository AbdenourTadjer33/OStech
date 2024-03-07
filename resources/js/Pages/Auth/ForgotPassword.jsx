import InputError from '@/Components/InputError';
import Button from '@/Components/Button';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Container from '@/Components/Container';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
		<AppLayout mainClass={false}>
			<Head title="Forgot Password" />

			<div className="bg-gray-100/50">
				<Container>
					<div className="mx-auto w-full sm:max-w-md px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
						<div className="mb-4 text-sm text-gray-600">
							Mot de passe oublié? Aucun problème. Indiquez-nous
							simplement votre adresse e-mail et nous vous
							enverrons par e-mail un lien de réinitialisation de
							mot de passe qui vous permettra d'en choisir un
							nouveau.
						</div>

						{status && (
							<div className="mb-4 font-medium text-sm text-green-600">
								{status}
							</div>
						)}

						<form onSubmit={submit}>
							<TextInput
								id="email"
								type="email"
								name="email"
								value={data.email}
								className="mt-1 block w-full"
								isFocused={true}
								onChange={(e) =>
									setData("email", e.target.value)
								}
							/>

							<InputError
								message={errors.email}
								className="mt-2"
							/>

							<div className="flex items-center justify-end mt-4">
								<Button className="ms-4" disabled={processing}>
									Email Password Reset Link
								</Button>
							</div>
						</form>
					</div>
				</Container>
			</div>
		</AppLayout>
	);
}
