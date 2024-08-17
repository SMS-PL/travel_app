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

const HoverPopoverInputInfo = ({content}) => {
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
            <Icons.circleInfoFill className="h-4 w-4 fill-gray-500" />
        </Popover.Trigger>
        <Popover.Content
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="w-fit z-50"
        >
            <Card className="p-4 flex flex-col justify-center items-center flex-wrap w-[300px] text-sm bg-primary text-white">
                {content}
            </Card>
            <Popover.Arrow />
        </Popover.Content>
    </Popover.Root>
    );
};

export default HoverPopoverInputInfo;
