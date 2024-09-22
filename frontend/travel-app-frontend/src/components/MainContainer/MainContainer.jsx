import React from 'react';
import Navbar from "@/layouts/Navbar/Navbar";
import Footer from "@/layouts/Footer/Footer";
import Pins from "@/components/Pins/Pins";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import{
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

function MainContainer({children, type = "default", setAddNewPost, ...props}) {

    return (
        <div className="flex flex-col items-start min-h-screen w-full" {...props}>
            <Navbar />

            <main className={cn((type == "loginRegister") && "my-auto","w-full flex flex-col justify-center items-center")} >
                <div className="max-w-full w-[660px]">
                    
                    <h2 className={cn(
                        ((type == "loginRegister") || type == "postPage") && "hidden",
                        "text-center text-2xl font-extrabold tracking-tight md:text-5xl lg:leading-[1.1] py-4 md:py-8 [text-shadow:_0_0_5px_rgb(255_255_255_/_100%)]",
                        type == "postPage" && "pb-0 md:pb-4",
                    )} >
                        {type == "homeFeed" && "Home"}
                        {type == "friendsFeed" && "Friends"}
                        {type == "profile" && "Profile"}
                        {type == "settings" && "Settings"}
                    </h2>

                    {type == "postPage" && (
                        <div className="grid grid-cols-3">
                            <div className=" col-span-1 self-center justify-center">
                                <Link to="/">
                                    <Button 
                                        variant="link"
                                        className="w-fit pr-4 pl-2"
                                        to={"/"}
                                    >
                                        <ChevronLeftIcon className="h-6 w-6 cursor-pointer rounded-md w-full" />
                                        Back home
                                    </Button>
                                </Link>
                            </div>

                            <div className="col-span-1 ">
                                <h2 className="text-center text-2xl font-extrabold tracking-tight md:text-5xl py-4 md:py-8 [text-shadow:_0_0_5px_rgb(255_255_255_/_100%)]" >
                                    Post
                                </h2>
                            </div>
                            <div className=" col-span-1"></div>

                            <div></div>
                        </div>
                    )}
                    
                    
                    {(type == "homeFeed" || type == "friendsFeed") &&  <Pins /> }
                    
                    {children}
                </div>

            </main>

            <Footer />
        </div>
    )
}

export default MainContainer;
