import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

function Pins() {
    const auth = useAuthUser();

    return (
        <Card className="w-full">
            <CardHeader className="flex flex-col p-3">

                <h3 className="text-center scroll-m-20 text-md tracking-tight m-0 font-semibold">
                    Tell us <span className="text-primary font-extrabold">where</span> are you?
                </h3>
            </CardHeader>
            <CardContent className="flex flex-row gap-2 justify-center " >
                <Avatar className="w-[50px] h-[50px]">
                    <AvatarImage src="https://picsum.photos/200/200" alt="stock img" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <Avatar className="w-[50px] h-[50px]">
                    <AvatarImage src="https://picsum.photos/200/200" alt="stock img" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar className="w-[50px] h-[50px]">
                    <AvatarImage src="https://picsum.photos/200/200" alt="stock img" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar className="w-[50px] h-[50px]">
                    <AvatarImage src="https://picsum.photos/200/200" alt="stock img" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar className="w-[50px] h-[50px]">
                    <AvatarImage src="https://picsum.photos/200/200" alt="stock img" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar className="w-[50px] h-[50px]">
                    <AvatarImage src="https://picsum.photos/200/200" alt="stock img" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </CardContent>
            {/* <CardFooter className="flex justify-between">

            </CardFooter> */}
        </Card>
    )
}

export default Pins
