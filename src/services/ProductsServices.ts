import { Product } from "../state/ObjectsTypes";

export const fetchAllProducts = async () => {
    let response = await fetch("http://localhost:8081/products")
    let data = response.json()
    return data
}

export const fetchProductById = async (id:string) => {
    let response = await fetch(`http://localhost:8081/products/${id}`)
    let data = response.json()
    return data
}


export const addProduct = async (product: Product) => {
    let productSavedPromise = await fetch("http://localhost:8081/products",
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
    let productUpdatedPromise = await fetch(`http://localhost:8081/products/${product.productId}`,
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
    let response = await fetch(`http://localhost:8081/products/${id}`,
        {
            method: 'DELETE'
        })
    return response
};


