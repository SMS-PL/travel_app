import React from 'react'
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

function MainContainer({children}) {
    return (
        <div className="flex flex-col items-start min-h-screen">
            <Navbar />
            <main className="container relative mx-auto flex flex-col items-center justify-start py-5 ">
                {children}
            </main>
            <Footer />
        </div>
        
            
        
    )
}

export default MainContainer;
