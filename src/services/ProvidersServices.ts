import { ProviderObject } from "../state/ObjectsTypes";

export const fetchAllProviders = async () => {
    let response = await fetch("http://localhost:8081/providers")
    let data = response.json()
    return data
};

export const addProvider = async (provider: ProviderObject) => {
    let providerSavedPromise = await fetch("http://localhost:8081/providers",
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

export const updateProvider = async (provider: ProviderObject) => {
    let providerUpdatedPromise = await fetch(`http://localhost:8081/products/${provider.id}`,
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
    let response = await fetch(`http://localhost:8081/products/${id}`,
        {
            method: 'DELETE'
        })
    return response
};



