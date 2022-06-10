export type Product = {
    id:string,
    name:string,
    description:string,
    minimum:number,
    maximum:number,
    currentStock:number,
    price:number,
    provider:ProviderObject
}

export type ProviderObject = {
    id:string,
    name:string,
    phone:string
}

export type Receipt = {
    id:string,
    providerName:string,
    listOfProductsReceived:Product[],
    idProvider:string
}

export type Bill = {
    id:string,
    date:Date,
    clientName:string,
    salePerson:string,
    listOfProductsBought:Product[],
    totalPaid:number
}