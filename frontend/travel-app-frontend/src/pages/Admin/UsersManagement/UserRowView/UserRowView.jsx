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
import BanUserAlert from './BanUserAlert';
import UnbanUserAlert from './UnbanUserAlert';
import UserDetailsAlert from './UserDetailsAlert';

const UserRowView = ({ user, onOpenDetails, onOpenBan, onOpenUnban, onOpenAdminOrUser }) => {

    return (
        <TableRow className={cn(user.banned && "bg-red-600 bg-opacity-40 hover:bg-red-900 ")}>
            <TableCell className="font-medium">{user.id}</TableCell>
            <TableCell className="font-medium">
                {(user.roles[1] != null) ? user.roles[1].name.split("_")[1] : user.roles[0].name.split("_")[1]  }
            </TableCell>
            <TableCell className="font-medium">{user.firstName}</TableCell>
            <TableCell className="font-medium">{user.lastName}</TableCell>
            <TableCell className="font-medium hidden md:table-cell">
                @{user.username}
            </TableCell>
            <TableCell className="font-medium hidden sm:table-cell">
                {user.email}
            </TableCell>
            <TableCell className="w-fit cursor-pointer flex justify-end">
                <DropdownMenu>
                    <DropdownMenuTrigger className="cursor-pointer hover:bg-secondary rounded-lg p-1">
                        {/* <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                        > */}
                            <MoreHorizontal className="h-5 w-5" />
                        {/* </Button> */}
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={onOpenDetails}>
                            Show details
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={onOpenBan}>
                            Ban user
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={onOpenUnban}>
                            Unban user
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={onOpenAdminOrUser}>
                            Make admin/user
                        </DropdownMenuItem>
                        
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    );
};

export default UserRowView;
