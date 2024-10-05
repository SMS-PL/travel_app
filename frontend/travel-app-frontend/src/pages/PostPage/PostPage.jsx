import React, {useState, useEffect} from 'react';
import MainContainer from "@/components/MainContainer/MainContainer";
import Post from "@/layouts/Feed/Post/Post";
import { useParams, useNavigate } from "react-router-dom";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import SpinLoading from '@/components/ui/SpinLoading';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

const PostPage = () => {
	const { postId, commentId } = useParams();
	const authHeader = useAuthHeader();

	const [postData, setPostData] = useState(null);
	const [refetchPosts, setRefetchPosts] = useState(false);

	const [isPostError, setIsPostError] = useState(false);
	const [isCommentError, setIsCommentError] = useState(false);

    useEffect(() => {
		getPostData();
		if(refetchPosts) setRefetchPosts(false);

	}, [postId, refetchPosts]);

	const getPostData = () => {
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
			setPostData(data);
			setIsPostError(false);
		})
		.catch(error => {
			console.log(error.message);
			// navigate("/");
			setPostData(null);
			setIsPostError(true);
		});
	};

    return (
        <MainContainer type="postPage">
			{!postData && !isPostError && <SpinLoading className="w-full flex justify-center items-center py-5" />}

			{isPostError && (
				<Alert variant="destructive" className="bg-card">
					<ExclamationTriangleIcon className="h-4 w-4 fill-red-500" />
					<AlertTitle className="text-red-500">Error</AlertTitle>
					<AlertDescription className="text-red-500">
						Sorry, but this post has been deleted!
					</AlertDescription>
				</Alert>
			)}

            {postData && 
                <Post
                    postData={postData}
					isCommentsOpenFeature={true}
					setRefetchPosts={setRefetchPosts}
                />
            }
        </MainContainer>
    );
};

export default PostPage;