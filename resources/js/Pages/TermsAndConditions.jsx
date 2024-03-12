import React from "react";
import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import Container from "@/Components/Container";
import Heading from "@/Components/Heading";

const TermsAndConditions = () => {
	return (
		<AppLayout>
			<Head title="Les terms et conditions" />

			<Container>
				<div className="space-y-4">
					<Heading level={2} className="text-gray-700">
						Terms et conditions
					</Heading>

					<p className="text-base sm:text-lg font-medium text-gray-600">
						Découvrez les termes et conditions de OStech. Si vous
						avez une question, veuillez{" "}
						<Link
							href="/contact"
							className="text-blue-600 hover:underline"
						>
							nous contacter
						</Link>{" "}
						et nous vous aiderons dès que possible.
					</p>
				</div>

				<hr className="my-10" />

				<div className="space-y-4 text-gray-600">
					<Heading level={4} className="text-gray-700">
						Acceptation des Termes
					</Heading>

					<p>
						En utilisant ce site web ou nos services, vous acceptez
						d'être lié par les présents termes et conditions. Si
						vous n'acceptez pas ces termes, veuillez ne pas utiliser
						notre site web ou nos services.
					</p>

					<Heading level={4} className="text-gray-700">
						Responsabilités de l'Utilisateur
					</Heading>

					<p>
						En tant qu'utilisateur, vous vous engagez à fournir des
						informations exactes et à jour, à respecter les lois et
						règlements en vigueur, ainsi qu'à respecter les droits
						des autres utilisateurs et tiers.
					</p>

					<Heading level={4} className="text-gray-700">
						Inscription au Compte
					</Heading>

					<p>
						Si nécessaire, veuillez suivre le processus
						d'inscription en fournissant des informations exactes et
						en maintenant la sécurité de vos identifiants de
						connexion. Ne partagez pas vos identifiants de compte
						avec d'autres personnes.
					</p>

					<Heading level={4} className="text-gray-700">
						Propriété Intellectuelle
					</Heading>

					<p>
						Tous les droits de propriété intellectuelle liés au
						contenu de notre plateforme sont réservés à OStech ou à
						ses concédants de licence. Vous n'êtes pas autorisé à
						utiliser ce contenu sans autorisation écrite.
					</p>

					<Heading level={4} className="text-gray-700">
						Modification des Termes
					</Heading>

					<p>
						Nous nous réservons le droit de modifier ces termes et
						conditions à tout moment. Toute modification sera
						publiée sur notre site web et prendra effet
						immédiatement après sa publication.
					</p>

					<Heading level={4} className="text-gray-700">
						Coordonnées
					</Heading>

					<p>
						Si vous avez des questions ou des commentaires
						concernant nos termes et conditions, veuillez{" "}
						<Link
							className="text-blue-600 hover:underline"
							href="/contact"
						>
							nous contacter.
						</Link>
					</p>
				</div>

				{/* <div>
					<p className="teext-base text-gray-600 leading-relaxed">
						Ces conditions d'utilisation constituent un accord
						juridiquement contraignant conclu entre vous, que ce
						soit personnellement ou au nom d'une entité (« vous »)
						et Bergside Inc. (« Société », « nous », « notre » ou «
						notre »), concernant votre accès et votre utilisation du
						site Web{" "}
						<Link
							className="text-blue-600 hover:underline"
							href="/"
						>
							https://os-tech.dz
						</Link>{" "}
						ainsi que de toute autre forme médiatique, canal
						médiatique, site Web mobile ou application mobile lié,
						lié ou autrement connecté à celui-ci (collectivement, le
						« Site »). Le Site fournit une place de marché en ligne
						pour les biens, produits et/ou services suivants :
						thèmes et modèles de sites Web (les « Offres de Place de
						Marché »). Afin de contribuer à faire du Site un
						environnement sécurisé pour l'achat et la vente d'Offres
						Marketplace, tous les utilisateurs sont tenus d'accepter
						et de se conformer aux présentes Conditions
						d'utilisation. Vous acceptez qu'en accédant au Site
						et/ou aux Offres Marketplace, vous avez lu, compris et
						acceptez d'être lié par toutes ces Conditions
						d'utilisation. SI VOUS N'ÊTES PAS D'ACCORD AVEC TOUTES
						CES CONDITIONS D'UTILISATION, ALORS IL VOUS EST
						EXPRESSÉMENT INTERDIT D'UTILISER LE SITE ET/OU LES
						OFFRES DU MARKETPLACE ET VOUS DEVEZ CESSER IMMÉDIATEMENT
						DE L'UTILISER.
					</p>
				</div> */}
			</Container>
		</AppLayout>
	);
};

export default TermsAndConditions;
