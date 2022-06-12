import React, { useEffect, useState } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchAllProducts, fetchProductById, updateProduct } from '../../services/ProductsServices'
import { fetchAllProviders } from '../../services/ProvidersServices'
import { addReceipt } from '../../services/ReceiptServices'
import { Product, Receipt } from '../../state/ObjectsTypes'
import { getAllProducts, updateProductState } from '../../state/ProductSlice'
import { getAllProviders } from '../../state/ProviderSlice'
import { saveReceipt } from '../../state/ReceiptSlice'
import { stateType } from '../../state/Store'
import '../styles/receiptsForm.css'

function ReceiptForm() {

    const navigate = useNavigate()
    const { listOfProducts } = useSelector((state: stateType) => state.product)
    const { listOfProviders } = useSelector((state: stateType) => state.provider)
    const [listOfProductsAdded, setListOfProductsAdded] = useState<Product[]>([])
    const [listOfProductsAvailable, setListOfProductsAvailable] = useState<Product[]>(listOfProducts)
    const [productId, setProductId] = useState("")
    const [stock, setStock] = useState<number>(0)
    const [providerId, setProviderId] = useState("")
    const dispatch = useDispatch()

    useEffect(() => {
        fetchAllProducts().then(
            products => {
                dispatch(getAllProducts(products))
            }
        )
        fetchAllProviders().then(
            providers => {
                dispatch(getAllProviders(providers))
            }
        )
    }, [])

    const pushProducts = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        let product = await fetchProductById(productId)
        if (stock !== 0) {
            if (product.maximum >= product.stock + stock) {
                let newProduct = {
                    productId: product.productId,
                    name: product.name,
                    description: product.description,
                    minimum: product.minimum,
                    maximum: product.maximum,
                    stock: product.stock + stock,
                    price: product.price,
                    provider: {
                        providerId: product.provider.providerId,
                        name: product.provider.name,
                        phone: product.provider.phone
                    }
                }
                setListOfProductsAdded([...listOfProductsAdded, newProduct])
                selectProduct() 
            } else {
                alert("You are receiving more stock of this product that you can")
            }
        }else{
            alert("you can not add a null stock or equal to 0")
        }
    }

    const editProductId = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setProductId(event.target.value)
    }

    const editProviderId = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setProviderId(event.target.value)
    }

    const cleanStates = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setProductId("")
        setStock(0)
        setProviderId("")
        event.preventDefault()
    }

    const cleanList = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log(listOfProductsAdded);
        setListOfProductsAvailable(listOfProducts)
        setListOfProductsAdded([])
        event.preventDefault()
    }

    const selectProduct = () => {
        setListOfProductsAvailable(listOfProductsAvailable.filter(product => product.productId !== productId))
        setProductId("")
    }

    const removeProduct = (id: string | undefined) => {
        setListOfProductsAdded(listOfProductsAdded.filter(product => product.productId !== id))
        const productRemoved = listOfProductsAdded.filter(product => product.productId === id)[0]
        setListOfProductsAvailable([...listOfProductsAvailable, productRemoved])
    }

    //function to create the receipt!
    const onAddReceipt = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        if(listOfProductsAdded.length !== 0){
            let dateNumber = new Date()
            let dd = String(dateNumber.getDate()).padStart(2, '0')
            let mm = String(dateNumber.getMonth() + 1).padStart(2, '0')
            let yyyy = dateNumber.getFullYear()
            const receiptToAdd:Receipt = {
                name: listOfProductsAdded[0].provider.name,
                productsReceived: listOfProductsAdded,
                providerId: providerId,
                date: yyyy+'-'+mm+'-'+dd
            }
            let receiptAdded = await addReceipt(receiptToAdd)
            dispatch(saveReceipt(receiptAdded))
            listOfProductsAdded.map(async product => {
                let productUpdated = await updateProduct(product)
                dispatch(updateProductState(productUpdated))
            })
            navigate('/receipts')
        }else{
            alert("you can not add a empty receipt")
        }
    }

    return (
        <div>
            <div>
                <form>
                    <div className='receipt-form'>
                        <div className="form-group">
                            <label>Provider</label>
                            <select className="form-control" onChange={editProviderId} disabled={providerId !== ""}>
                                <option selected value="">choose provider</option>
                                {listOfProviders.map(provider => {
                                    return <option value={provider.providerId}>{provider.name}</option>
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Product</label>
                            <select className="custom-select" onChange={editProductId} disabled={providerId === ""}>
                                <option selected>choose product</option>
                                {listOfProductsAvailable.map(product => {
                                    if (product.provider !== null) {
                                        if (product.provider.providerId == providerId) {
                                            return <option value={product.productId}>{product.name}</option>
                                        }
                                    }
                                })}
                            </select>
                        </div>
                        <div className='form-group'>
                            <label>Stock</label>
                            <input type="number" disabled={providerId === ""} className="form-control" placeholder='stock to receive' onChange={(e) => setStock(parseInt(e.target.value))} />
                        </div>
                        <div>
                            <button type="submit" className="btn btn-success organize-buttons" onClick={(e) => pushProducts(e)}>Add Product</button>
                            <button type="submit" className="btn btn-primary organize-buttons" onClick={onAddReceipt} >Save</button>
                            <button type="submit" className="btn btn-danger organize-buttons" onClick={() => navigate('/receipts')}>Cancel</button>
                            <button type="submit" className="btn btn-secondary organize-buttons" disabled={listOfProductsAdded.length !== 0} onClick={(e) => cleanStates(e)}>Choose a different provider</button>
                            <button type="submit" className="btn btn-secondary organize-buttons" onClick={(e) => cleanList(e)}>Clean list</button>
                        </div>
                    </div>
                </form>
            </div>
            <br /><br /><br /><br />
            <div className="table-responsive center-table">
                <table className="table">
                    <thead className='thead-dark'>
                        <tr>
                            <th scope='col'>Product id</th>
                            <th scope='col'>Name</th>
                            <th scope='col'> Stock</th>
                            <th scope='col'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listOfProductsAdded.map(product => {
                            return <tr>
                                <td>{product.productId}</td>
                                <td>{product.name}</td>
                                <td>{product.stock}</td>
                                <td><button type="submit" className="btn btn-danger" onClick={() => removeProduct(product.productId)}>X</button></td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ReceiptForm