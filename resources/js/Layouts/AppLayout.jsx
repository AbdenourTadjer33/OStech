import React, { createContext } from "react";

export const AppLayoutContext = createContext();

const AppLayout = ({ children }) => {
    return (
        <AppLayoutContext.Provider value={{}}>
            <main>{children}</main>
        </AppLayoutContext.Provider>
    );
};

export default AppLayout;
