import { useNavigate } from 'react-router-dom';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import Navbar from "../../components/Navbar/Navbar";
import MainContainer from "@/components/MainContainer/MainContainer";

const Home = () => {

    return (
        <MainContainer >
            <h3 className="font-black text-2xl">HOME</h3>
        </MainContainer>
    )
}

export default Home

{/* <div className="p-4">
    <button type='submit' className='p-2 border rounded-md bg-cyan-700 hover:bg-cyan-900 text-white' onClick={()=> navigate('/login')}>Go to Login</button>
    <button type='submit' className='p-2 border rounded-md bg-red-500 hover:bg-red-700 text-white' onClick={()=> navigate('/secure')}>GO to Secure Dashboard</button>
</div> */}