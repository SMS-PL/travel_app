import React from 'react';
import Navbar from "@/layouts/Navbar/Navbar";
import Footer from "@/layouts/Footer/Footer";
import Pins from "@/components/Pins/Pins";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import{
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "@/components/ui/tooltip";
import {
    Bell,
    CircleUser,
    Home,
    LineChart,
    Menu,
    Package,
    Package2,
    Search,
    ShoppingCart,
    Users,
    Users2,
    Settings,
} from "lucide-react";
import { useLocation } from 'react-router-dom';

const AdminContainer = ({children, title = "Admin", ...props}) => {
    const location = useLocation();


    return (
        <div className="w-screen flex flex-col justify-center items-center h-screen min-h-screen">
            <Navbar type="admin" />

            <div className="flex flex-row w-full h-full">
                {/* <aside className="fixed w-14 justify-center items-center border-r bg-background h-screen"> */}
                    <nav className="flex flex-col items-center gap-4 px-2 py-4 w-14 border-r bg-background">
                        <TooltipProvider delayDuration={100}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        to="/admin"
                                        className={cn(location.pathname == "/admin" ? "bg-accent text-accent-foreground transition-colors" : "text-muted-foreground", "flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8")}
                                        // "flex h-9 w-9 items-center justify-center rounded-lg bg-accent hover:text-foreground md:h-8 md:w-8"
                                    >
                                        <Home className={cn(location.pathname == "/admin" && "text-primary", "h-5 w-5")} />
                                        <span className="sr-only">
                                            Dashboard
                                        </span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right" className="text-white">
                                    Dashboard
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider delayDuration={100}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        to="/admin/users"
                                        className={cn(location.pathname == "/admin/users" ? "bg-accent text-accent-foreground transition-colors" : "text-muted-foreground", "flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8")}
                                    >
                                        <Users2 className={cn(location.pathname == "/admin/users" && "text-primary", "h-5 w-5")}/>
                                        <span className="sr-only">Orders</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right" className="text-white">
                                    Users management
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider delayDuration={100}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        to="/admin/posts"
                                        className={cn(location.pathname == "/admin/posts" ? "bg-accent text-accent-foreground transition-colors" : "text-muted-foreground", "flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8")}
                                    >
                                        <Package className={cn(location.pathname == "/admin/posts" && "text-primary", "h-5 w-5")} />
                                        <span className="sr-only">
                                            Products
                                        </span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right" className="text-white">
                                    Posts management
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </nav>
                {/* </aside> */}

                <div className="w-full flex flex-col justify-start items-center px-4 md:px-8 ">
                    <h2 className="text-center text-2xl font-extrabold md:text-5xl py-4 md:py-8 [text-shadow:_0_0_5px_rgb(255_255_255_/_100%)]">
                        {title}
                    </h2>
                    
                    {children}
                </div>
                
            </div>
        </div>
    )
}

export default AdminContainer;
