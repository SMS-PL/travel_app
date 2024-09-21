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

const PostRowView = ({ post }) => {
    const authHeader = useAuthHeader();

    const [isLoading, setIsLoading] = useState(false);

    const [isPostDetailsOpen, setIsPostDetailsOpen] = useState(false);
    const [isDeletePostDialogOpen, setIsDeletePostDialogOpen] = useState(false);

    console.log(post);

    return (
        <TableRow>
            <TableCell className="w-fit font-medium">
                {/* <Link to={`/post/${post.id}`} className="cursor-pointer w-fit"> */}
                <img 
                    src={post.imageUrl} 
                    alt="" 
                    className="w-[50px] h-[70px]  bg-black object-cover border-2 rounded-lg"
                    loading="lazy" 
                />
                {/* </Link> */}
            </TableCell>
            <TableCell className="w-fit font-medium">{post.id}</TableCell>
            <TableCell className="w-fit font-medium">{post.authorId}</TableCell>
            <TableCell className="w-full cursor-pointer flex justify-end items-center h-full">
                <DropdownMenu>
                    <DropdownMenuTrigger className="cursor-pointer hover:bg-secondary rounded-lg p-1">
                        <MoreHorizontal className="h-5 w-5" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => setIsPostDetailsOpen(true)} className=" cursor-pointer">
                            Show details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link to={`/post/${post.id}`}>Open post</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setIsDeletePostDialogOpen(true)} className=" cursor-pointer" >
                            Delete post
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem onSelect="" className=" cursor-pointer" >
                            Unban user
                        </DropdownMenuItem> */}
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
            
            <DeletePostAlert post={post} onOpen={isDeletePostDialogOpen} onClose={() => setIsDeletePostDialogOpen(false)} />
            <PostDetailsAlert post={post} onOpen={isPostDetailsOpen} onClose={() => setIsPostDetailsOpen(false)} />

            {/* <UnbanUserAlert post={post} onOpen={isUnbanUserDialogOpen} onClose={() => setIsUnbanUserDialogOpen(false)} /> */}

        </TableRow>
                    
    );
};

export default PostRowView;
