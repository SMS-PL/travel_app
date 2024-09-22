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
import PostDetailsAlert from "./PostDetailsAlert";
import DeletePostAlert from "./DeletePostAlert";

const PostRowView = ({ post, onOpenDelete, onOpenDetails }) => {
    const authHeader = useAuthHeader();

    return (
        <TableRow>
            <TableCell className="font-medium">
                <img 
                    src={post.imageUrl} 
                    alt="" 
                    className="w-[100px] h-[70px]  bg-black object-cover border-2 rounded-lg"
                    loading="lazy" 
                />
            </TableCell>
            <TableCell className="w-fit font-medium">{post.id}</TableCell>
            <TableCell className="w-fit font-medium">{post.authorId}</TableCell>
            <TableCell className="w-full cursor-pointer flex justify-end items-center h-full">
                <DropdownMenu>
                    <DropdownMenuTrigger className="cursor-pointer hover:bg-secondary rounded-lg p-1">
                        <MoreHorizontal className="h-5 w-5" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={onOpenDetails} className=" cursor-pointer">
                            Show details
                        </DropdownMenuItem>
                        <DropdownMenuItem >
                            <Link to={`/post/${post.id}`} className="w-full">Open post</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={onOpenDelete} className=" cursor-pointer" >
                            Delete post
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem onSelect="" className=" cursor-pointer" >
                            Unban user
                        </DropdownMenuItem> */}
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>         
    );
};

export default PostRowView;
