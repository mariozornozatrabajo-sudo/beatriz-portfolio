"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type NavTheme = "default" | "inverted";

interface NavContextType {
    theme: NavTheme;
    setTheme: (theme: NavTheme) => void;
}

const NavContext = createContext<NavContextType | undefined>(undefined);

export function NavProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<NavTheme>("default");

    return (
        <NavContext.Provider value={{ theme, setTheme }}>
            {children}
        </NavContext.Provider>
    );
}

export function useNavTheme() {
    const context = useContext(NavContext);
    if (context === undefined) {
        throw new Error("useNavTheme must be used within a NavProvider");
    }
    return context;
}
