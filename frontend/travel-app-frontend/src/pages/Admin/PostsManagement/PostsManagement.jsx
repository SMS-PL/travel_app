import React, { useState, useEffect } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import AdminContainer from '@/components/AdminContainer/AdminContainer';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
    Search,
    ChevronLeftIcon,
    ChevronRightIcon,
    Ellipsis,
    CircleOff
} from "lucide-react";
import { Button } from '@/components/ui/button';
import SpinLoading from '@/components/ui/SpinLoading';
import PostRowView from './PostRowView/PostRowView';
import { cn } from '@/lib/utils';
import DeletePostAlert from './PostRowView/DeletePostAlert';
import PostDetailsAlert from './PostRowView/PostDetailsAlert';

const PostsManagement = () => {
	const authHeader = useAuthHeader();

    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [authorData, setAuthorData] = useState(null);

    const [postsData, setPostsData] = useState(null);

    const [selectedPost, setSelectedPost] = useState(null);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [isDetailsAlertOpen, setIsDetailsAlertOpen] = useState(false);

    // paginacja
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [refetchData, setRefetchData] = useState(false);

    const fetchPosts = () => {
        if(inputValue != "") {
            setIsLoading(true);

            fetch(`http://localhost:5000/api/v1/posts/user/${inputValue}?pageSize=${pageSize}&pageNumber=${currentPage}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json', 
                    "Authorization": authHeader,
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Błąd sieci!');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                if(data.totalPages == 0) {
                    setTotalPages(1);
                } else {
                    setTotalPages(data.totalPages);
                }
                setPostsData(data.content);                
            })
            .catch(error => {
                setPostsData(null);
                console.log(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
        }
    };

    const nextPage = () => {
        if(currentPage < (totalPages-1)) {
            setPostsData(null);
            setCurrentPage(prev => prev + 1);
            setRefetchData(true);
        }
    };

    const prevPage = () => {
        if(currentPage > 0) {
            setPostsData(null);
            setCurrentPage(prev => prev - 1);
            setRefetchData(true);
        }
    };

    const openDeleteAlert = (post) => {
        setSelectedPost(post);
        setIsDeleteAlertOpen(true);
    };

    const openDetailsAlert = (post) => {
        setSelectedPost(post);
        setIsDetailsAlertOpen(true);
    };

    return (
        <AdminContainer title="Posts management">

            <div className="bg-card px-5 md:px-10 py-6 md:py-8 rounded-[20px] border flex flex-row justify-center items-center gap-5 w-full max-w-[900px]">
                <form 
                    className="relative w-full"
                    
                    onSubmit={(e) => {
                        e.preventDefault();
                        fetchPosts();
                    }}
                >
                    
                    <Input
                        type="search"
                        placeholder="Search posts by userID..."
                        className="w-full appearance-none pr-12 shadow-none bg-secondary"
                        onChange={(e) => setInputValue(e.target.value)}
                        value={inputValue}
                    />
                    <Button 
                        className="absolute top-0 right-0 text-white w-fit p-3 rounded-s-none" 
                        type="submit"
                    >
                        <Search className="h-4 w-4 " />
                    </Button>
                </form>

            </div>


            <div className="mt-4 md:mt-8 w-full max-w-[900px] h-full">
                <h2 className="font-extrabold text-xl pb-5 text-center" >
                    Results
                </h2>

                <Table className="h-full overflow-hidden">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px] text-[13px] sm:text-sm">Image</TableHead>
                            <TableHead className="w-[60px] sm:w-[75px] text-[13px] sm:text-sm">PostID</TableHead>
                            <TableHead className="w-[60px] sm:w-[75px] text-[13px] sm:text-sm">AuthorID</TableHead>
                            <TableHead className="w-fit text-right text-[13px] sm:text-sm"></TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {postsData && postsData.length != 0 && (postsData.map((post, i) => {
                            return (
                                <PostRowView 
                                    key={`userManagementAdmin${post.id}${i}`}
                                    post={post}
                                    onOpenDelete={() => openDeleteAlert(post)}
                                    onOpenDetails={() => openDetailsAlert(post)}
                                />
                            )
                        }))}
                    </TableBody>

                </Table>

                {selectedPost && (
                    <>
                        <DeletePostAlert
                            post={selectedPost}
                            onOpen={isDeleteAlertOpen}
                            onClose={() => setIsDeleteAlertOpen(false)}
                        />
                        <PostDetailsAlert
                            post={selectedPost}
                            onOpen={isDetailsAlertOpen}
                            onClose={() => setIsDetailsAlertOpen(false)}
                        />
                    </>
                )}

                {!isLoading && (postsData === null) && (
                    <div className="w-full text-center mt-5" >
                        <span className="text-base text-muted-foreground">Start your search...</span>
                    </div>
                )}

                {!isLoading && (postsData !== null) && (postsData.length == 0) && (
                    <div className="text-gray-400 flex flex-col justify-center items-center leading-[140px] mt-5 relative">
                        <CircleOff className="h-[100px] w-[100px]" color="hsl(var(--muted-foreground))"/>
                        <span className="text-base mt-2 text-muted-foreground">No results</span>                                    
                    </div>
                )}

                {isLoading && <SpinLoading className="w-full flex justify-center items-center" /> }
                
                <div className={cn("w-full flex flex-row justify-center items-center gap-1", (totalPages == 1) && "hidden")} >
                    <Button 
                        onClick={() => prevPage()} 
                        variant="secondary"
                        className="w-fit"
                        disabled={currentPage == 0}
                    >
                        <ChevronLeftIcon className="h-6 w-6 cursor-pointer rounded-md" />
                    </Button>
                    
                    <div className="text-sm text-gray-400">{`${currentPage+1}/${totalPages}`}</div>

                    <Button 
                        onClick={() => nextPage()}
                        variant="secondary"
                        className="w-fit"
                        disabled={currentPage == (totalPages-1)}
                    >
                        <ChevronRightIcon className="h-6 w-6 cursor-pointer rounded-md"/>
                    </Button>
                </div>
            </div>
            

            

        </AdminContainer>

    );
};

export default PostsManagement;
