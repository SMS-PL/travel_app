import React from "react";
import Navbar from "@/layouts/Navbar/Navbar";
import MainContainer from "@/components/MainContainer/MainContainer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function ErrorPage() {
    return (
        <MainContainer>
            {/* <h1 className="font-bold text-3xl">404 - Not Found</h1> */}
            <div className="flex flex-col items-center justify-center min-h-[80vh]">
                <h1 className="text-center font-extrabold tracking-tight text-5xl lg:leading-[1.1] py-2 [text-shadow:_0_0_5px_rgb(255_255_255_/_100%)]">
                    Oops!
                </h1>

                <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                    The page you're looking for was not found.
                </p>

                <Link
                    to="/"
                    className="mt-3"
                >
                    <Button variant="default" className="text-white">
                        Return to Homepage
                    </Button>
                </Link>

            </div>
        </MainContainer>
    );
}

export default ErrorPage;
