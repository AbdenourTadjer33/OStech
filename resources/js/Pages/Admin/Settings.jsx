import React from "react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import SettingCard from "@/Components/SettingCard";

const Settings = () => {
    return (
        <AdminLayout>
            <Head title="Configuration" />

            <div>
                <h1 className="text-4xl font-bold mb-3">Configuration</h1>

                <div>
                    <h5>
                        Ici vous pouvez configurez votre application.

                    </h5>
                    <div className="mt-3 flex gap-2">
                        <SettingCard
                            link={route("admin.settings.users.index")}
                        >
                            <SettingCard.Title>Administrateur</SettingCard.Title>
                            <SettingCard.Description>
                                Ajouté, Éditer ou Supprimer les administrateur.
                            </SettingCard.Description>
                        </SettingCard>

                        <SettingCard
                            link={route("admin.settings.roles.index")}
                        >
                            <SettingCard.Title>Role</SettingCard.Title>
                            <SettingCard.Description>
                                Ajouté, Éditer ou Supprimer des roles de l'application.
                            </SettingCard.Description>
                        </SettingCard>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Settings;
