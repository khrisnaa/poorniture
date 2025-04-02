import { createContext, ReactNode, useContext, useState } from 'react';

interface ViewContextProps {
    activeView: number;
    setActiveView: (view: number) => void;
}

// Create Context
const ViewContext = createContext<ViewContextProps | undefined>(undefined);

// Provider Component
export function ViewProvider({ children }: { children: ReactNode }) {
    const [activeView, setActiveView] = useState(3);

    return <ViewContext.Provider value={{ activeView, setActiveView }}>{children}</ViewContext.Provider>;
}

// Custom Hook for Using Context
export function useViewContext() {
    const context = useContext(ViewContext);
    if (!context) {
        throw new Error('useViewContext must be used within a ViewProvider');
    }
    return context;
}
