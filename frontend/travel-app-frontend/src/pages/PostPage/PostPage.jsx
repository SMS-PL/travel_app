import React, {useState, useEffect} from 'react';
import MainContainer from "@/components/MainContainer/MainContainer";
import Post from "@/layouts/Feed/Post/Post";
import { useParams } from "react-router-dom";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import SpinLoading from '@/components/ui/SpinLoading';

const PostPage = () => {
	const { postId } = useParams();
	const authHeader = useAuthHeader();

	const [postData, setPostData] = useState(null);
	const [refetchPosts, setRefetchPosts] = useState(false);

    useEffect(() => {
		getPostData();

		if(refetchPosts) {
			setRefetchPosts(false);
		}
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
		})
		.catch(error => {
			console.log(error.message);
		});
	};
	
    return (
        <MainContainer type="postPage">
			{!postData && <SpinLoading className="w-full flex justify-center items-center py-5" />}
			{console.log(postData)}
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