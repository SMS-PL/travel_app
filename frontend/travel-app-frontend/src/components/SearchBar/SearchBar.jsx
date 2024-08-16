import React from 'react';
import { useState, useEffect, useRef } from 'react';
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

    const searchDiv = useRef();
    const deskoptInput = useRef();
    const mobileInput = useRef();

    const [isLoading, setIsLoading] = useState(true);
    const [usersData, setUsersData] = useState([]);

    const [value, setValue] = useState("");

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
        <div className="max-w-full w-[300px] flex justify-start items-center relative">
            <div className="flex flex-row justify-start items-center">
                {/* DESKOPT */}
                <div className="relative md:grow-0 hidden md:flex" >
                    <Icons.searchEmpty className="absolute fill-current left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder={placeholder}
                        className="rounded-lg backdrop-blur pl-8 w-[225px]"
                        ref={deskoptInput}
                        onChange={(e) => {
                            setIsOpenSearchBar(true)
                            fetchUsers(e.target.value);
                            setValue(e.target.value);
                            e.target.value == "" ? setIsOpenSearchBar(false) : setIsOpenSearchBar(true);
                        }}
                        value={value}
                    />
                </div>
                
                {/* MOBILE */}
                <div className="flex md:hidden">
                    <Popover>
                        <PopoverTrigger 
                            className="flex justify-center items-center" 
                            ref={mobileInput} 
                            onClick={() => {
                                setValue("");
                                setIsOpenSearchBar(false);
                            }}
                        >
                            <Icons.searchEmpty className="fill-current h-5 w-5 text-muted-foreground" />
                        </PopoverTrigger>

                        <PopoverContent 
                            className="absolute top-[-30px] left-[15px] p-0 border-0 w-0"
                            onInteractOutside={(e) => {
                                e.preventDefault();
                                // setIsOpenSearchBar(false);
                                // setValue("");
                            }}
                        >
                            {/* <Icons.searchEmpty className="absolute fill-current left-[20px] top-[26px] z-20 h-4 w-4 text-muted-foreground" /> */}

                            <Input
                                type="search"
                                placeholder={placeholder}
                                className="rounded-lg backdrop-blur block md:hidden w-[215px]"
                                
                                onChange={(e) => {
                                    setIsOpenSearchBar(true)
                                    fetchUsers(e.target.value);
                                    setValue(e.target.value);
                                    e.target.value == "" ? setIsOpenSearchBar(false) : setIsOpenSearchBar(true);
                                    
                                }}
                                value={value}
                            />
                        </PopoverContent>
                    </Popover>    
                </div>
            </div>

            {isOpenSearchBar && (
                <Card 
                    className="absolute top-[35px] left-[25px] p-0 m-0 md:left-[0px] md:top-[37px] w-[215px] md:w-[220px]" 
                    // tabIndex="0"
                    ref={searchDiv}
                >
                    <CardContent className="p-0 m-0">
                        {!isLoading && usersData.content && usersData.content.map((user, i) => (
                                <HoverUserInfo 
                                    userData={user} 
                                    key={`userSearched${user.id}${i}`} 
                                    className="flex " 
                                    onClick={() => {
                                        deskoptInput.current.focus();
                                        mobileInput.current.focus();
                                        
                                        mobileInput.current.click();

                                        setValue("");
                                        setIsOpenSearchBar(false);
                                        
                                    }}
                                >
                                    <FriendshipRowView user={user} />
                                </HoverUserInfo>
                            ))
                        }
                        {!isLoading && usersData.content && usersData.content.length === 0 && (
                            <h1 className="italic text-center py-2 text-gray-500 ">No results...</h1>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default SearchBar;
