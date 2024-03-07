import React from "react";
import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import Container from "@/Components/Container";

const TermsAndConditions = () => {
	return (
		<AppLayout>
			<Head title="Les terms et conditions" />

			<Container>
				<div className="space-y-4">
					<h1 className="text-4xl font-semibold text-gray-700">
						Terms et conditions
					</h1>

					<p className="text-base sm:text-lg font-medium text-gray-600">
						Découvrez les termes et conditions de Os-tech. Si vous
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
				<hr className="my-12" />
				<div>
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
				</div>
			</Container>
		</AppLayout>
	);
};

export default TermsAndConditions;
