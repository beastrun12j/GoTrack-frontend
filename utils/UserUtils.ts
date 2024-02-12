'use client'
import {useUser} from "@clerk/nextjs";

export default function getUserUUID(): string {

    const { user } = useUser();

    const useruuid = user?.id as string;

    return useruuid;
}