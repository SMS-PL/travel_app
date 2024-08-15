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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

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
        <div className="max-w-full w-[300px] flex justify-start items-center">
            <div className="flex flex-row justify-start items-center">
                {/* DESKOPT */}
                <div className="relative md:grow-0 hidden md:flex" >
                    <Icons.searchEmpty className="absolute fill-current left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder={placeholder}
                        className="rounded-lg backdrop-blur pl-8 w-[225px]"
                        onChange={(e) => {
                            e.target.value.length == 0 ? setIsOpenSearchBar(false) : setIsOpenSearchBar(true);
                            fetchUsers(e.target.value);
                        }}
                        onBlur={(e) => {
                            e.target.value = "";
                            setIsOpenSearchBar(false);
                        }}
                    />
                </div>
                
                {/* MOBILE */}
                <div className="flex md:hidden">
                    <Popover>
                        <PopoverTrigger className="flex justify-center items-center">
                            <Icons.searchEmpty className="fill-current h-5 w-5 text-muted-foreground" />
                        </PopoverTrigger>

                        <PopoverContent 
                            className="absolute top-[-30px] left-[15px] p-0 border-0 w-0"
                            
                        >
                            {/* <Icons.searchEmpty className="absolute fill-current left-[20px] top-[26px] z-20 h-4 w-4 text-muted-foreground" /> */}

                            <Input
                                type="search"
                                placeholder={placeholder}
                                className="rounded-lg backdrop-blur block md:hidden w-[215px]"
                                onChange={(e) => {
                                    e.target.value.length == 0 ? setIsOpenSearchBar(false) : setIsOpenSearchBar(true);
                                    fetchUsers(e.target.value);
                                }}
                                onBlur={(e) => {
                                    setIsOpenSearchBar(false);
                                    e.target.value = "";
                                }}
                            />
                        </PopoverContent>
                    </Popover>    
                </div>
            </div>


            {/* <div className="relative ml-auto flex-1 md:grow-0" >
                <Icons.searchEmpty className="absolute fill-current left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder={placeholder}
                    className="rounded-lg backdrop-blur pl-8 w-full "
                    onChange={(e) => {
                        e.target.value.length == 0 ? setIsOpenSearchBar(false) : setIsOpenSearchBar(true);
                        fetchUsers(e.target.value);
                    }}
                />

            </div> */}

            {isOpenSearchBar && (
                <Card className="absolute top-[50px] w-fit" >
                    <CardHeader>
                        <CardTitle>Search Results</CardTitle>
                    </CardHeader>

                    <CardContent>
                        {!isLoading && usersData.content && usersData.content.map((user, i) => (
                                <HoverUserInfo userData={user} key={`userSearched${user.id}${i}`} className="flex">
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
