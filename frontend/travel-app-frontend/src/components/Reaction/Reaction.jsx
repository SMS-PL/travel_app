import React from 'react'
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import ConfettiExplosion from 'react-confetti-explosion';
import { useNavigate, useLocation } from 'react-router-dom';
import {useInfiniteQuery } from "@tanstack/react-query";

function Reaction({postId, likes, hearts}) {
    const [isExploding, setIsExploding] = useState(false);

	const authHeader = useAuthHeader();
    const { toast } = useToast();

    const [isLiked, setIsLiked] = useState(false);              // tutaj wstaw czy polubiony
    const [isHearted, setIsHearted] = useState(false);          // tutaj wstaw czy posercowany

    const [likesCounter, setLikesCounter] = useState(0);
    const [heartsCounter, setHeartsCounter] = useState(0);

    // do poprawnego ładowania postów
    
    useEffect(() => {
        fetchReactionsStatus();
        fetchReactionCounter();
	}, []);

    const fetchReactionCounter = () => {
        fetch(`http://localhost:5000/api/v1/posts/${postId}`, {
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
            setLikesCounter(data.likes);
            setHeartsCounter(data.hearts);
		})
		.catch(error => {
			console.log(error.message);
		});
    };

    const fetchReactionsStatus = () => {
        fetch(`http://localhost:5000/api/v1/posts/${postId}/userReaction`, {
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
            if(data.reaction == 0) {            // jeśli dał like
                setIsLiked(true);               // ustawia że dał like
                setIsHearted(false);            // ustawia że nie dał serca
            } else if (data.reaction == 1) {    // jeśli dał serce
                setIsLiked(false);              // ustawia że nie dał like
                setIsHearted(true);             // ustawia że dał serce
            } else {
                setIsLiked(false);              // ustawia że nie dał like
                setIsHearted(false);            // ustawia że nie dał serce
            }
		})
		.catch(error => {
			console.log(error.message);
		});
    };


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
				throw new Error("Błąd sieci!");
			}
			return response.json();
		})
		.then(data => {

            if(reactionType == 0) {             // like
                setIsLiked(like => !like);
                setIsHearted(false);
                
            } else if(reactionType == 1) {      // heart
                setIsLiked(false);
                setIsHearted(heart => !heart);
                setIsExploding(explode => !explode);
            }
            setLikesCounter(data.like);
            setHeartsCounter(data.heart);
		})
		.catch(error => {
			console.log(error.message);
            toast({
                variant: "destructive",
                title: "You've already used up your daily heart!",
                description: "Try again later!",
            })
		});
    };

    return (
        <div className="flex flex-row gap-3">
            <Button variant="secondary" onClick={() => {onClickLike(0)}}>
                <div className="flex flex-row justify-center items-center gap-2">
                    {isLiked ? <Icons.likeFill className="h-6 w-6 fill-primary" /> : <Icons.likeEmpty className="h-6 w-6 fill-primary" />}
                    {likesCounter}
                </div>
            </Button>
            
            <Button variant="secondary" className="w-max-full w-[75px]" onClick={() => { onClickLike(1) }}>
                <div className="flex flex-row justify-center items-center gap-1">
                    {isHearted ? <Icons.heartFill className="h-6 w-6 fill-red-500" /> : <Icons.heartEmpty className="h-6 w-6 fill-red-500" />}
                    {heartsCounter}
                </div>
            </Button>

            {isExploding && <ConfettiExplosion force={0.4} duration={2000} particleCount={30} height={500} width={300} className="relative left-[-49px]"/>}

        </div>
    )
}

export default Reaction;
