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

const HoverPopoverInputInfo = ({children = null, content, ...props}) => {
    const [open, setOpen] = useState(false);

    const handleMouseEnter = () => {
        setOpen(true);
    };

    const handleMouseLeave = () => {
        setOpen(false);
    };

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
                {content}
            </Card>
            <Popover.Arrow />
        </Popover.Content>
    </Popover.Root>
    );
};

export default HoverPopoverInputInfo;
