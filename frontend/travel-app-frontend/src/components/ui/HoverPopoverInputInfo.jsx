import React, { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Icons } from "@/components/icons";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const HoverPopoverInputInfo = ({children = null, content, type = "default", ...props}) => {
    const [open, setOpen] = useState(false);

    const handleMouseEnter = () => {
        setOpen(true);
    };

    const handleMouseLeave = () => {
        setOpen(false);
    };

    const username = "Username must be between 6 and 16 characters long. Must consist of lowercase letters and may contain numbers (e.g. josh23, emily421 etc).";
    const firstName = "First name must start with a capital letter and can only consist of letters of the Polish alphabet (e.g. Josh, Emily etc).";
    const lastName = "Last name must start with a capital letter and can only consist of letters of the Polish alphabet (e.g. Brown, Smith etc).";
    const password = "Password must be between 8 and 32 characters long. Must contain upper and lower case letters and at least one number (e.g. J0shBr0wn33, Em11y555 etc).";

    return (
        <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {!children && <Icons.circleInfoFill className="h-4 w-4 fill-gray-500" />}
            {children}
        </Popover.Trigger>
        <Popover.Content
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="w-fit z-10"
        >
            <Card className="p-4 flex-wrap w-[300px] text-sm bg-primary text-white" {...props}>
                {(type == "username") && username}
                {(type == "firstName") && firstName}
                {(type == "lastName") && lastName}
                {(type == "password") && password}
                
                {(type == "default") && content}

            </Card>
            <Popover.Arrow />
        </Popover.Content>
    </Popover.Root>
    );
};

export default HoverPopoverInputInfo;
