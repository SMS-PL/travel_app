import React from 'react'
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { useState, useEffect } from 'react';


function Reaction({postId, type, likes}) {
	const authHeader = useAuthHeader();

    //const [isLiked, setIsLiked] = useState(1);              // tutaj wstaw czy polubiony
    const [likesCounter, setLikesCounter] = useState(likes);

    //const [isHearted, setIsHearted] = useState(0);          // tutaj wstaw czy posercowany

    // useEffect(() => {
	// }, [likesCounter]);

    const onClickLike = (reactionType) => {
        fetch(`http://localhost:5000/api/v1/posts/${postId}/${reactionType}`, {
			method: 'POST',
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
            console.log("Zmieniono reakcje!");
            console.log(data);
            //setIsLiked(data.like);
            //setIsHearted(data.love);
            setLikesCounter(data.like);
		})
		.catch(error => {
			console.log(error.message);
		});
    };


    return (
        <>
            {type == "like" ? (
                <Button variant="secondary" onClick={() => {onClickLike(0)}}>
                    <div className="flex flex-row justify-center items-center gap-2">
                        {/* {isLiked ? <Icons.likeEmpty className="h-7 w-7 fill-primary" /> : <Icons.likeFill className="h-7 w-7 fill-primary" />} */}
                        <Icons.likeEmpty className="h-7 w-7 fill-primary" />
                        {likesCounter}
                    </div>
                </Button>

            ) : null}

            {/* {type == "heart" ? (
                <Button variant="secondary" onClick={() => {onClickLike(1)}}>
                    <div className="flex flex-row justify-center items-center gap-2">
                        {isHearted ? (
                            <><Icons.heartEmpty className="h-7 w-7 fill-blue-700" /> 0 </> 
                        ) : (
                            <><Icons.heartFill className="h-7 w-7 fill-red-700" /> 1 </> 
                        )}
                    </div>
                </Button>

            ) : null} */}
        </>
    )
}

export default Reaction;
