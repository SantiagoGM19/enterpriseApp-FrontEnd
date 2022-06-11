import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchAllProducts, fetchProductById, updateProduct } from '../../services/ProductsServices'
import { Product } from '../../state/ObjectsTypes'
import { getAllProducts, updateProductState } from '../../state/ProductSlice'
import { stateType } from '../../state/Store'
import '../styles/receiptsForm.css'

function ReceiptForm() {

    const navigate = useNavigate()
    const { listOfProducts } = useSelector((state: stateType) => state.product)
    const [listOfProductsAdded, setListOfProductsAdded] = useState<Product[]>([{
        productId: "",
        name: "",
        description: "default description",
        minimum: 0,
        maximum: 0,
        stock: 0,
        price: 0.0,
        provider: {
            providerId: "",
            name: "",
            phone: ""
        }
    }])
    const [productId, setProductId] = useState("")
    const [stock, setStock] = useState(0)
    const dispatch = useDispatch()

    useEffect(() => {
        fetchAllProducts().then(
            products => {
                dispatch(getAllProducts(products))
            }
        )
    }, [])

    const pushProducts = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {   
        e.preventDefault()
        let product = await fetchProductById(productId)
        if (product.maximum >= stock) {
            let newProduct = {
                productId: product.productId,
                name: product.name,
                description: product.description,
                minimum: product.minimum,
                maximum: product.maximum,
                stock: stock,
                price: product.price,
                provider:{
                    providerId: product.provider.providerId,
                    name: product.provider.name,
                    phone: product.provider.phone
                }
            }
            setListOfProductsAdded([...listOfProductsAdded, newProduct])
            console.log(listOfProductsAdded);
        } else {
            alert("You are receiving more stock of this product that you can")
        }
    }

    const editProductId = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setProductId(event.target.value)
    }

    return (
        <div>
            <div>
                <form>
                    <div className='receipt-form'>
                        <div className="form-group">
                            <label>Product</label>
                            <select className="custom-select" onChange={editProductId}>
                                <option selected>choose product</option>
                                {listOfProducts.map(product => {
                                    return <option value={product.productId}>{product.name}</option>
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Stock</label>
                            <input type="number" className="form-control" placeholder='stock to receive' />
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary organize-buttons" onClick={(e) => pushProducts(e)}>Save</button>
                            <button type="submit" className="btn btn-secondary organize-buttons" onClick={() => navigate('/receipts')}>Go back</button>
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
                        </tr>
                    </thead>
                    <tbody>
                        {listOfProductsAdded.map(product => {
                            return <tr>
                                <td>{product.productId}</td>
                                <td>{product.name}</td>
                                <td>{product.stock}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ReceiptForm