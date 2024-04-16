import { useNavigate } from 'react-router-dom';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import MainContainer from "@/components/MainContainer/MainContainer";
import { useState, useEffect } from 'react';

import Post from "@/components/Post/Post";
import AddPost from "@/components/AddPost/AddPost";

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination"
  
const Home = () => {
	const [posts, setPosts] = useState([]);
	const authHeader = useAuthHeader();
	const navigate = useNavigate();

    useEffect(() => {
		fetch("http://localhost:5000/api/v1/posts/feed?feedType=home&pageSize=10&pageNumber=0", {
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
			setPosts(data.content);
		})
		.catch(error => {
			console.log(error.message);
			navigate("/");
		});

	}, []);


    return (
        <MainContainer >
            <div className="max-w-full w-[650px]">

                <AddPost />

                {posts.map((post) => 
                    (
                        <Post
                            className="mt-10"
                            key={post.id}
                            id={post.id}
                            content={post.content}
                            countryId={post.countryId}
                            imageUrl={post.imageUrl}
                            authorId={post.authorId}
                            createdAt={post.createdAt}
                            lastUpdated={post.lastUpdated}
                        />
                    )
                )}

				{/* <Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious href="#" />
						</PaginationItem>

						<PaginationItem>
							<PaginationLink href="#">1</PaginationLink>
						</PaginationItem>

						<PaginationItem>
							<PaginationLink href="#">2</PaginationLink>
						</PaginationItem>

						<PaginationItem>
							<PaginationLink href="#">3</PaginationLink>
						</PaginationItem>

						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>

						<PaginationItem>
							<PaginationNext href="#" />
						</PaginationItem>

					</PaginationContent>
				</Pagination> */}
                
            </div>
        </MainContainer>
    )
}

export default Home

{/* <div className="p-4">
    <button type='submit' className='p-2 border rounded-md bg-cyan-700 hover:bg-cyan-900 text-white' onClick={()=> navigate('/login')}>Go to Login</button>
    <button type='submit' className='p-2 border rounded-md bg-red-500 hover:bg-red-700 text-white' onClick={()=> navigate('/secure')}>GO to Secure Dashboard</button>
</div> */}