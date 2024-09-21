import React, { useState, useEffect, useContext } from "react";
import { Icons } from "@/components/icons";
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
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import BanUserAlert from './BanUserAlert';
import UnbanUserAlert from './UnbanUserAlert';
import UserDetailsAlert from './UserDetailsAlert';

const UserRowView = ({ user }) => {
    const authHeader = useAuthHeader();

    const [isBanUserDialogOpen, setIsBanUserDialogOpen] = useState(false);
    const [isUnbanUserDialogOpen, setIsUnbanUserDialogOpen] = useState(false);
    const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);
    // const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [daysOfBan, setDaysOfBan] = useState(null);

    const banUser = () => {
        if((daysOfBan > 0) && (daysOfBan < 1827)) {
            fetch(`http://localhost:5000/api/v1/users/${user.id}/ban/${daysOfBan}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authHeader,
                },
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Błąd sieci!");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error.message);
            });
        }
    };

    return (
        <TableRow>
            <TableCell className="font-medium">{user.id}</TableCell>
            <TableCell className="font-medium">{user.firstName}</TableCell>
            <TableCell className="font-medium">{user.lastName}</TableCell>
            <TableCell className="font-medium hidden md:table-cell">
                @{user.username}
            </TableCell>
            <TableCell className="font-medium hidden sm:table-cell">
                {user.email}
            </TableCell>
            <TableCell className="font-medium hidden md:table-cell">
                {user.createdAt}
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
                        <DropdownMenuItem onSelect={() => setIsUserDetailsOpen(true)} className=" cursor-pointer">
                            Show details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link to={`/profile/${user.id}`}>Open Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setIsBanUserDialogOpen(true)} className=" cursor-pointer" >
                            Ban user
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setIsUnbanUserDialogOpen(true)} className=" cursor-pointer" >
                            Unban user
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
            
            <UserDetailsAlert user={user} onOpen={isUserDetailsOpen} onClose={() => setIsUserDetailsOpen(false)} />
            <BanUserAlert user={user} onOpen={isBanUserDialogOpen} onClose={() => setIsBanUserDialogOpen(false)} />
            <UnbanUserAlert user={user} onOpen={isUnbanUserDialogOpen} onClose={() => setIsUnbanUserDialogOpen(false)} />

        </TableRow>
                    
    );
};

export default UserRowView;
