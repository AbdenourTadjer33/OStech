import React from "react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import SettingCard from "@/Components/SettingCard";
import SettingsData from "@/Logic/SettingsData";
const Settings = () => {
    return (
        <AdminLayout>
            <Head title="Configuration" />

            <div>
                <h1 className="text-4xl font-bold mb-3">Configuration</h1>

                <div>
                    <h5>Ici vous pouvez configurez votre application.</h5>

                    <div className="grid gap-4 my-5 lg:grid-cols-4">
                        {SettingsData.map((setting, idx) => (
                            <SettingCard key={idx} link={route(setting.route)}>
                                <SettingCard.Title>
                                    {setting.title}
                                </SettingCard.Title>
                                <SettingCard.Description>
                                    {setting.description}
                                </SettingCard.Description>
                            </SettingCard>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Settings;
