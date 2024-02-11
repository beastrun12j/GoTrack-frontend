'use client'
import {useUser} from "@clerk/nextjs";

export function getUserUUID(): string {

    const { user } = useUser();

    const useruuid = user?.id as string;

    return useruuid;
}