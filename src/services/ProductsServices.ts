import { Product } from "../state/ObjectsTypes";

const URL = "https://enterpriseapp-backend.herokuapp.com/products"

export const fetchAllProducts = async () => {
    let response = await fetch(URL)
    let data = response.json()
    return data
}

export const fetchProductById = async (id:string) => {
    let response = await fetch(URL+"/"+id)
    let data = response.json()
    return data
}


export const addProduct = async (product: Product) => {
    let productSavedPromise = await fetch(URL,
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(product)
        })
    let productSaved = await productSavedPromise.json()
    return productSaved
};

export const updateProduct = async (product: Product) => {
    let productUpdatedPromise = await fetch(URL+"/"+product.productId,
        {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(product)
        })
    let productUpdated = await productUpdatedPromise.json()
    return productUpdated
};

export const deleteProduct = async (id: string) => {
    let response = await fetch(URL+"/"+id,
        {
            method: 'DELETE'
        })
    return response
};


