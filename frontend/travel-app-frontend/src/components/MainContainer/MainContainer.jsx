import React from 'react'
import Navbar from "@/layouts/Navbar/Navbar";
import Footer from "@/layouts/Footer/Footer";
import Pins from "@/components/Pins/Pins";
import { cn } from "@/lib/utils";

function MainContainer({children, type = "default", setAddNewPost, ...props}) {
    return (
        <div className="flex flex-col items-start min-h-screen w-full" {...props}>
            <Navbar />

            <main className={cn(type == "loginRegister" && "my-auto" ,"w-full flex flex-col justify-center items-center")} >
                <div className="max-w-full w-[660px]">
                    
                    <h2 className={cn(type == "loginRegister" && "hidden" ,"text-center text-2xl font-extrabold tracking-tight md:text-5xl lg:leading-[1.1] py-4 md:py-8 [text-shadow:_0_0_5px_rgb(255_255_255_/_100%)]")} >
                        {type == "homeFeed" && "Home"}
                        {type == "friendsFeed" && "Friends"}
                        {type == "profile" && "Profile"}
                    </h2>
                    
                    {(type == "homeFeed" || type == "friendsFeed") &&  <Pins /> }
                    
                    {children}
                </div>

            </main>

            <Footer />
        </div>
    )
}

export default MainContainer;
