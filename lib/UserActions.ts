'use server';
import Organisation from "@/interfaces/OrganisationInterface";
import { getAuth } from "@/utils/AuthUtils";


export async function GetOrganisationByUser(): Promise<Organisation|undefined> {


    const auth = getAuth()

    if(!auth){
        return undefined
    }

    // const response = await fetch(`http://localhost:8080/organisations/${auth.userId}`, {
    const response = await fetch(`http://localhost:8080/organisations/1`, {
        headers:{
        'authorization': `Bearer ${auth.token}`
        }
    });


    const organisation: Organisation = await response.json();

    return organisation;

}