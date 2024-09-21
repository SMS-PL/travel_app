import react, { useEffect } from "react";
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

const AdminDashboard = () => {
    // const token = useAuthHeader();
    // console.log(jwtDecode(token));

    useEffect(() => {
        // console.log(token);
    }, []);

    return (
        <AdminContainer>
            
            <div className="w-full grid gap-4 md:gap-8 grid-cols-4">
                <Card
                    x-chunk="dashboard-01-chunk-2"
                    className="w-full flex flex-col justify-between col-span-1 sm:col-span-1 p-4 "
                >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                        <CardTitle className="text-base font-bold leading-[17px]">
                            Registered users
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="p-0 my-4">
                        <div className="flex items-baseline gap-1 text-5xl font-extrabold tabular-nums leading-none mb-2">
                            4129
                        </div>
                    </CardContent>

                    <CardFooter className="p-0 w-full"></CardFooter>
                </Card>

                <Card
                    x-chunk="dashboard-01-chunk-2"
                    className="w-full flex flex-col justify-between col-span-1 p-4"
                >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                        <CardTitle className="text-base font-bold leading-[17px]">
                            Banned users
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="p-0 my-4">
                        <div className="flex items-baseline gap-1 text-5xl font-extrabold tabular-nums leading-none mb-2">
                            38
                        </div>
                    </CardContent>

                    <CardFooter className="p-0 w-full"></CardFooter>
                </Card>

                <Card
                    x-chunk="dashboard-01-chunk-2"
                    className="w-full flex flex-col justify-between col-span-1 p-4 "
                >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                        <CardTitle className="text-base font-bold leading-[17px]">
                            Count of posts
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="p-0 my-4">
                        <div className="flex items-baseline gap-1 text-5xl font-extrabold tabular-nums leading-none mb-2">
                            8231
                        </div>
                    </CardContent>

                    <CardFooter className="p-0"></CardFooter>
                </Card>

                {/* History */}
                <Card
                    x-chunk="dashboard-01-chunk-2"
                    className="w-full flex flex-col justify-between col-span-1 p-4 "
                >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                        <CardTitle className="text-base font-bold leading-[17px]">
                            Count of pins
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="p-0 my-4">
                        <div className="flex items-baseline gap-1 text-5xl font-extrabold tabular-nums leading-none mb-2">
                            11543
                        </div>
                    </CardContent>
                        
                    <CardFooter className="p-0"></CardFooter>
                </Card>
            </div>
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