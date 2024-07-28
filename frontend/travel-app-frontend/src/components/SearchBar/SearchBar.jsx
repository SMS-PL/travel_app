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
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import FriendshipRowView from "@/components/SearchBar/FriendshipRowView";
import HoverUserInfo from "@/components/ui/HoverUserInfo";

const SearchBar = ({placeholder, ...props}) => {
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
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error.message);
            });
        }
    }; 

    return (
        <div className="max-w-full w-[200px]">
            <div className="relative ml-auto flex-1 md:grow-0" >
                <Icons.searchEmpty className="absolute fill-current left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder={placeholder}
                    className="rounded-lg bg-background pl-8 w-full"
                    onChange={(e) => {
                        e.target.value.length == 0 ? setIsOpenSearchBar(false) : setIsOpenSearchBar(true);
                        // setUsersData(e.target.value);
                        // console.log(e.target.value)
                        fetchUsers(e.target.value);
                    }}
                />
            </div>

            {isOpenSearchBar && (
                <Card className="absolute top-[50px] w-fit" {...props}>
                    <CardHeader>
                        <CardTitle>Search Results</CardTitle>
                    </CardHeader>

                    <CardContent>
                        {!isLoading && usersData.content && usersData.content.map((user, i) => (
                                <HoverUserInfo userData={user} key={`userSearched${user.id}${i}`}>
                                    <FriendshipRowView user={user} />
                                </HoverUserInfo>
                            ))
                        }
                        {!isLoading && usersData.content && usersData.content.length === 0 && (
                            <h1 className="italic text-gray-500">No results...</h1>
                        )}
                    </CardContent>


                    {/* <CardFooter>

                    </CardFooter> */}
                </Card>
            )}
        </div>
    );
};

export default SearchBar;
