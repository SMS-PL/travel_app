import { CalendarIcon } from "@radix-ui/react-icons";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Link } from "react-router-dom";
import FriendshipButton from '@/components/Friendships/FriendshipButton';

const HoverUserInfo = ({children, userData, ...props}) => {

    return (
        
        <HoverCard >
            <HoverCardTrigger asChild>
                <Link to={`/profile/${userData.id}`} className="flex flex-row" {...props}>
                    {children}
                </Link>
            </HoverCardTrigger>
            <HoverCardContent className="w-80" asChild>
                <div className="flex flex-col justify-center items-start">
                    <Link to={`/profile/${userData.id}`} className="flex flex-row">
                        <div className="flex flex-row gap-3 justify-center items-center">
                            <Avatar className="w-[70px] h-[70px]">
                                <AvatarImage src="https://picsum.photos/200/200" />
                                <AvatarFallback>VC</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col justify-center items-start">
                                <h4 className="text-xl font-bold">{userData.firstName} {userData.lastName}</h4>
                                <h3 className="text-md font-semibold text-gray-500">@{userData.username}</h3>
                            </div>
                        </div>
                    </Link>
                    <div className="w-full flex justify-center items-center">
                        <FriendshipButton userId={userData.id} />
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
       
    );
};

export default HoverUserInfo;
