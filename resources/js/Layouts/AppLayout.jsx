import React, { createContext } from "react";
import NavBar from "@/Components/Section/Client/NavBar";

export const AppLayoutContext = createContext();

const AppLayout = ({ children }) => {
    return (
        <AppLayoutContext.Provider value={{}}>
            <div className="bg-gray-50 w-full min-h-screen">
                <NavBar />

                <main>{children}</main>
            </div>
        </AppLayoutContext.Provider>
    );
};

export default AppLayout;
