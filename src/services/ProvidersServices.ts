import { ProviderObject } from "../state/ObjectsTypes";

const URL = "https://enterpriseapp-backend.herokuapp.com/providers"

export const fetchAllProviders = async () => {
    let response = await fetch(URL)
    let data = response.json()
    return data
};

export const saveProvider = async (provider: ProviderObject) => {
    let providerSavedPromise = await fetch(URL,
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(provider)
        })
    let providerSaved = await providerSavedPromise.json()
    return providerSaved
};

export const updateProvider = async (provider: ProviderObject, providerId:string) => {
    let providerUpdatedPromise = await fetch(URL+"/"+providerId,
        {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(provider)
        })
    let providerUpdated = await providerUpdatedPromise.json()
    return providerUpdated
};

export const deleteProvider = async (id: string) => {
    let response = await fetch(URL+"/"+id,
        {
            method: 'DELETE'
        })
    return response
};



