import React, { useState, useEffect, useContext } from "react";
import { cn } from "@/lib/utils";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

const AdminRowView = ({ admin }) => {
    const authHeader = useAuthHeader();

    return (
        <TableRow>
            <TableCell className="font-medium">{admin.id}</TableCell>
            <TableCell className="font-medium">{admin.firstName}</TableCell>
            <TableCell className="font-medium">{admin.lastName}</TableCell>
            <TableCell className="font-medium hidden md:table-cell">
                @{admin.username}
            </TableCell>
            <TableCell className="font-medium hidden sm:table-cell">
                {admin.email}
            </TableCell>
            <TableCell className="w-fit cursor-pointer flex justify-end">
                <DropdownMenu>
                    <DropdownMenuTrigger className="cursor-pointer hover:bg-secondary rounded-lg p-1">
                        <MoreHorizontal className="h-5 w-5" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect="" className=" cursor-pointer">
                            Show details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link to={`/profile/${admin.id}`}>Open Profile</Link>
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
            
            {/* <UserDetailsAlert admin={admin} onOpen={isUserDetailsOpen} onClose={() => setIsUserDetailsOpen(false)} /> */}

        </TableRow>
                    
    );
};

export default AdminRowView;
