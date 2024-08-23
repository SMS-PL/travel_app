import RoutesPage from "./RoutesPage";
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";
import { ThemeProvider } from "@/components/ThemeProvider"
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { useState, createContext } from "react";
import { RefreshFriendshipContext } from '@/contexts/RefreshFriendshipContext';
import { cn } from '@/lib/utils';

TimeAgo.addDefaultLocale(en);

const store = createStore({
    authName: "_auth",
    authType: "cookie",
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === "https:",
});

const queryClient = new QueryClient();

function App() {

    const [globalRefreshFriendship, setGlobalRefreshFriendship] = useState(false);

    return (
        <>
            <div className="fixed top-0 z-[-2] h-screen w-screen bg-[#000000] dark:bg-[radial-gradient(#fff1111f_1px,#000001_1px)] bg-[radial-gradient(#dbdbdb_1px,#ffffff_1px)] bg-[size:20px_20px]" ></div>
            <div className="fixed top-0 right-[10%] z-[-1] bg-primary w-[400px] h-[300px] rounded-full blur-[290px] "></div>
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                <AuthProvider store={store}>
                    <QueryClientProvider client={queryClient}>
                        <RefreshFriendshipContext.Provider value={{globalRefreshFriendship, setGlobalRefreshFriendship}}>
                            <RoutesPage />
                            <Toaster />
                        </RefreshFriendshipContext.Provider>
                    </QueryClientProvider>
                </AuthProvider>
            </ThemeProvider>
        </>
    );
}

export default App;
