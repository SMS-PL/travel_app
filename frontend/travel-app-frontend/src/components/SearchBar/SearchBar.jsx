import React from 'react';
import { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";

const SearchBar = ({...props}) => {
    const authHeader = useAuthHeader();

    const [isLoading, setIsLoading] = useState(true);
    const [usersData, setUsersData] = useState([]);

    const [isOpenSearchBar, setIsOpenSearchBar] = useState(false);

    const fetchUsers = async (searchedText) => {
        setIsLoading(true);
        if(searchedText !== "") {
            fetch(`http://localhost:5000/api/v1/users/search/${searchedText}?pageNumber=0&pageSize=5`, {
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
                setUsersData(data);
                console.log(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error.message);
            });
        }
    };

    return (
        <div className="max-w-full w-[250px]">
            <div className="relative ml-auto flex-1 md:grow-0" >
                <Icons.searchEmpty className="absolute fill-current left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search..."
                    className="rounded-lg bg-background pl-8 w-full"
                    onChange={(e) => {
                        e.target.value.length == 0 ? setIsOpenSearchBar(false) : setIsOpenSearchBar(true);
                        // setUsersData(e.target.value);
                        // console.log(e.target.value)
                        fetchUsers(e.target.value);
                    }}
                />
            </div>

            {isOpenSearchBar &&  
                <Card className="absolute top-[50px] w-fit" {...props}>
                    <CardHeader>
                        <CardTitle>Search Results</CardTitle>
                    </CardHeader>

                    <CardContent>
                        {!isLoading && usersData.content && usersData.content.map((user, i) => (
                                <div key={`userSearched${user.id}${i}`} className="flex flex-row mb-2 hover:bg-secondary p-1 rounded-md">
                                    <Link to={`/profile/${user.id}`} className="flex flex-row items-center" >
                                        <Avatar>
                                            <AvatarImage src={user.profilePicture || "https://picsum.photos/200/200"} alt={`${user.firstName} ${user.lastName}`} />
                                            <AvatarFallback>{`${user.firstName[0]}${user.lastName[0]}`}</AvatarFallback>
                                        </Avatar>
                                    
                                        <div className="px-2">
                                            <CardTitle className="text-sm">{user.firstName} {user.lastName}</CardTitle>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        }
                        {!isLoading && usersData.content && usersData.content.length === 0 && (
                            <h1 className="italic text-gray-500">No results...</h1>
                        )}
                    </CardContent>


                    {/* <CardFooter>

                    </CardFooter> */}
                </Card>
            }
        </div>
    );
};

export default SearchBar;
