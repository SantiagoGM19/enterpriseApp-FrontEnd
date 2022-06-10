import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from '../services/ProductsServices'
import { Product } from '../state/ObjectsTypes'
import { getAllProducts } from '../state/ProductSlice'
import { stateType } from '../state/Store'
import "./styles/products.css"

function Products() {

    const { listOfProducts } = useSelector((state: stateType) => state.product)
    const dispatch = useDispatch()


    useEffect(() => {
        let listOfProductsFetched = fetchAllProducts().then(
            products => {
                dispatch(getAllProducts(products))
            }
        )
    }, [])

    return (
        <div>
            <h1>Your products</h1>
            <div className='products-container' >
                {listOfProducts.map((product: Product) => {
                    return <div className="card border-dark mb-3 product" style={{ maxWidth: '18rem;', border: 'solid' }}>
                        <div className="card-header bg-transparent">
                            <button type="button" className="btn btn-danger" style={{ fontWeight: 'bold', fontSize: '15px' }}>
                                X
                            </button>
                        </div>
                        <div className="card-body text-dark">
                            <h5 className="card-title">{product.name}</h5>
                            <ul>
                                <li>{product.description}</li>
                                <li>{product.minimum}</li>
                                <li>{product.maximum}</li>
                                <li>{product.stock}</li>
                                <li>${product.price}</li>
                            </ul>
                        </div>
                        <div className="card-footer bg-transparent border-dark">
                            <button type="button" className="btn btn-primary" style={{ fontWeight: 'bold', fontSize: '15px' }}>
                                Modify
                            </button>
                        </div>
                    </div>
                })}
                <button type="button" className="btn btn-success add-product">
                    +
                </button>
            </div>
        </div>
    )
}

export default Products