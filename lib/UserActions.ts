'use server'
import Organisation from "@/interfaces/OrganisationInterface";

export async function GetOrganisationByUser(useruuid: string, authToken: string|undefined): Promise<Organisation> {

    const response = await fetch(`http://localhost:8080/organisations/${useruuid}`, {
        headers:{
        'authorization': `Bearer ${authToken}`
        }
    });

    const organisation: Organisation = await response.json();

    return organisation;

}