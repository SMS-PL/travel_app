import react, { useEffect, useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import AdminContainer from '@/components/AdminContainer/AdminContainer';
import AdminsList from "./AdminsList";
import {
    Package,
    Package2,
    Users2,
} from "lucide-react";

const AdminDashboard = () => {
    const authHeader = useAuthHeader();

    // const token = useAuthHeader();
    // console.log(jwtDecode(token));
    const [isLoading, setIsLoading] = useState(false);
    const [statsData, setStatsData] = useState(null);

    useEffect(() => {
        fetchStats();
    }, []);

    
    const fetchStats = () => {
        setIsLoading(true);
        fetch(`http://localhost:5000/api/v1/admin/dashboard-stats`, {
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
            setStatsData(data);
        })
        .catch(error => {
            console.log(error.message);
        })
        .finally(() => {
            setIsLoading(false);
        });
    };
    return (
        <AdminContainer>
            
            <div className="w-full grid gap-4 md:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 box-border">
                <Card
                    x-chunk="dashboard-01-chunk-2"
                    className=" flex flex-col justify-between col-span-1 p-4 box-border"
                >
                    <CardHeader className="flex flex-row items-center justify-between pb-2 p-0">
                        <CardTitle className="text-base font-bold ">
                            User count
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="p-0 my-4">
                        <div className="flex items-baseline gap-1 text-5xl font-extrabold tabular-nums leading-none mb-2">
                            {(statsData !== null) && statsData.userCount}
                        </div>
                    </CardContent>

                    <CardFooter className="p-0 w-full">
                        <Link to="/admin/users">
                            <Button className="text-white gap-1"  >
                                <Users2 className="h-5 w-5 text-white" />
                                Manage
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>

                 <Card
                    x-chunk="dashboard-01-chunk-2"
                    className="flex flex-col justify-between col-span-1 p-4 box-border"
                >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                        <CardTitle className="text-base font-bold leading-[17px]">
                            Post count
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="p-0 my-4">
                        <div className="flex items-baseline gap-1 text-5xl font-extrabold tabular-nums leading-none mb-2">
                            {(statsData !== null) && statsData.postCount}
                        </div>
                    </CardContent>

                    <CardFooter className="p-0 w-full">
                        <Link to="/admin/posts">
                            <Button className="text-white gap-1"  >
                                <Package className="h-5 w-5 text-white" />
                                Manage
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>

                <Card
                    x-chunk="dashboard-01-chunk-2"
                    className="flex flex-col justify-between col-span-1 p-4 box-border"
                >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                        <CardTitle className="text-base font-bold leading-[17px]">
                            Pin count
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="p-0 my-4">
                        <div className="flex items-baseline gap-1 text-5xl font-extrabold tabular-nums leading-none mb-2">
                            {(statsData !== null) && statsData.pinCount}
                        </div>
                    </CardContent>

                    <CardFooter className="p-0"></CardFooter>
                </Card>

                <Card
                    x-chunk="dashboard-01-chunk-2"
                    className="flex flex-col justify-between col-span-1 p-4 box-border"
                >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                        <CardTitle className="text-base font-bold leading-[17px]">
                            Banned User count
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="p-0 my-4">
                        <div className="flex items-baseline gap-1 text-5xl font-extrabold tabular-nums leading-none mb-2">
                            {(statsData !== null) && statsData.bannedUserCount}
                        </div>
                    </CardContent>
                        
                    <CardFooter className="p-0"></CardFooter>
                </Card>
            </div>

            {/* <div className=""> */}
                <AdminsList />

            {/* </div> */}
        </AdminContainer>
    );
};

export default AdminDashboard;


                // {/* <div className="w-[300px] bg-card p-5 "> */}
                // {/* <Link
                //         href="#"
                //         className="flex items-center gap-3 rounded-[8px] px-3 py-3 text-base text-primary transition-all hover:text-primary bg-muted"
                //     >
                //         <Home className="h-4 w-4" />
                //         Dashboard
                //     </Link>
                //     <Link
                //         href="#"
                //         className="flex items-center gap-3 rounded-[8px] px-3 py-3 text-base text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                //     >
                //         <Users className="h-4 w-4" />
                //         Users management
                //     </Link>
                //     <Link
                //         href="#"
                //         className="flex items-center gap-3 rounded-[8px] px-3 py-3 text-base text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                //     >
                //         <Package className="h-4 w-4" />
                //         Posts management
                //     </Link> */}
                // {/* </div> */}