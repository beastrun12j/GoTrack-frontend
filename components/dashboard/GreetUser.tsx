'use client';
import { useUser } from "@clerk/nextjs";

export default function GreetUser(){

    const { user, isSignedIn, isLoaded } = useUser();

    return (
        <div>
            {(isSignedIn && isLoaded) ? <h3 className=' text-3xl lg:text-4xl font-bold mb-2'>Good morning, {user?.fullName}!</h3> 
            : ``}
            
        </div>
    );
}; 
