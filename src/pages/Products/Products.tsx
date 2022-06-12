import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts, addProduct, deleteProduct } from '../../services/ProductsServices'
import { Product } from '../../state/ObjectsTypes'
import { deleteProductState, getAllProducts, saveProduct } from '../../state/ProductSlice'
import { stateType } from '../../state/Store'
import "../styles/products.css"
import { Modal, ModalBody, ModalHeader, FormGroup, ModalFooter, Button } from 'reactstrap'
import { fetchAllProviders } from '../../services/ProvidersServices'
import { getAllProviders } from '../../state/ProviderSlice'
import { useForm } from 'react-hook-form'

function Products() {

    const [modalUpdateOpen, setModalUpdateOpen] = useState(false)
    const [product, setProduct] = useState<Product>({
        name: "",
        description: "",
        minimum: 0,
        maximum: 0,
        stock: 0,
        price: 0.0,
        provider: {
            providerId: "",
            name: "",
            phone: ""
        }
    })
    const [isUpdating, setIsUpdating] = useState(false)
    const [areFieldsEmpty, setAreFieldsEmpty] = useState(false)
    const [providerValues, setProviderValues] = useState<string[]>([])
    const [fields, setFields] = useState<any[]>([])
    const { register } = useForm()
    const { listOfProducts } = useSelector((state: stateType) => state.product)
    const { listOfProviders } = useSelector((state: stateType) => state.provider)
    const dispatch = useDispatch()


    useEffect(() => {
        let listOfProductsFetched = fetchAllProducts().then(
            products => {
                dispatch(getAllProducts(products))
            }
        )
        fetchAllProviders().then(
            providers => {
                dispatch(getAllProviders(providers))
            }
        )
    }, [listOfProducts])

    useEffect(() => {
        const newProviderObject = {
            providerId: providerValues[0],
            name: providerValues[1],
            phone: providerValues[2]
        }
        setProduct({ ...product, provider: { ...newProviderObject } })
    }, [listOfProducts])


    const cleanFields = () => {
        setProduct({
            name: "",
            description: "",
            minimum: 0,
            maximum: 0,
            stock: 0,
            price: 0.0,
            provider: {
                providerId: "",
                name: "",
                phone: ""
            }
        })
        setProviderValues([])
    }

    const onAddProduct = async () => {
        verifyEmptyFields()
        if (!areFieldsEmpty) {
            let productAdded = await addProduct(product)
            dispatch(saveProduct(productAdded))
        }
        cleanFields()
    }

    const verifyEmptyFields = () => {
        fields.map(field => {
            if(field === 0 || field === "" || field === 0.0 || field === undefined){
                setAreFieldsEmpty(true)
            }
        })
        providerValues.map(providerValue => {
            if(providerValue === ""){
                setAreFieldsEmpty(true)
            }
        })
    }

    const onUpdateProduct = () => {

    }

    const onDeleteProduct = async (id: string | undefined) => {
        if (id !== undefined) {
            let response = await deleteProduct(id)
            if (response.status === 200) {
                dispatch(deleteProductState(id))
            }
        }
    }

    const setValues = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const listProviderValues = event.target.value.split(",")
        setProviderValues([...listProviderValues])
    }

    return (
        <div>
            <h1>Your products</h1>
            <div className='container' >
                {listOfProducts.map((product: Product) => {
                    return <div className="card border-dark mb-3 product" key={product.productId} style={{ maxWidth: '18rem', border: 'solid' }}>
                        <div className="card-header bg-transparent">
                            <button type="button" className="btn btn-danger" style={{ fontWeight: 'bold', fontSize: '15px' }} onClick={() => onDeleteProduct(product.productId)}>
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
                                <li>{product.provider.name}</li>
                            </ul>
                        </div>
                        <div className="card-footer bg-transparent border-dark">
                            <button type="button" className="btn btn-primary" style={{ fontWeight: 'bold', fontSize: '15px' }} onClick={() => {
                                setIsUpdating(true);
                                setModalUpdateOpen(true);
                                setProduct({
                                    name: product.name,
                                    description: product.description,
                                    minimum: product.minimum,
                                    maximum: product.maximum,
                                    stock: product.stock,
                                    price: product.price,
                                    provider: {
                                        providerId: "",
                                        name: "",
                                        phone: ""
                                    }
                                })
                            }}>
                                Modify
                            </button>
                        </div>
                    </div>
                })}
                <button type="button" className="btn btn-success add-product" onClick={() => { setIsUpdating(false); setModalUpdateOpen(true) }}>
                    +
                </button>
                {listOfProducts.length !== 0 ?
                    <div></div> :
                    <div style={{ marginTop: '16%' }}><h1 style={{ color: 'white' }}>Add a new product!</h1></div>}
            </div>
            <Modal isOpen={modalUpdateOpen}>
                <ModalHeader>
                    <div><h3>Form</h3></div>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <label>Name</label>
                        <input required type="text" className='form-control' onChange={(e) => {setProduct({ ...product, name: e.target.value }); setFields([...fields, e.target.value])}} />
                        <label>Description</label>
                        <input required type="text" className='form-control' onChange={(e) => {setProduct({ ...product, description: e.target.value }); setFields([...fields, e.target.value])}} />
                        <label>minimum</label>
                        <input type="number" min={0} className='form-control' onChange={(e) => {setProduct({ ...product, minimum: parseInt(e.target.value) }); setFields([...fields, e.target.value])}} />
                        <label>maximum</label>
                        <input type="number" min={0} className='form-control' onChange={(e) => {setProduct({ ...product, maximum: parseInt(e.target.value) }); setFields([...fields, e.target.value])}} />
                        <label>stock</label>
                        <input type="number" min={0} className='form-control' onChange={(e) => {setProduct({ ...product, stock: parseInt(e.target.value) }); setFields([...fields, e.target.value])}} />
                        <label>price</label>
                        <input type="number" min={0} className='form-control' onChange={(e) => {setProduct({ ...product, price: parseFloat(e.target.value) }); setFields([...fields, e.target.value])}} />
                        <label>provider</label>
                        <br />
                        <select onChange={setValues}>
                            <option></option>
                            {listOfProviders.map(provider => {
                                return <option value={[provider.providerId, provider.name, provider.phone]}>{provider.name}</option>
                            })}
                        </select>
                        <br />
                        {areFieldsEmpty ? <div className="alert alert-danger" role="alert">
                            There are empty fields!
                        </div> : <></>}
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn-success" onClick={() => { isUpdating ? onUpdateProduct() : onAddProduct() }} >Save</Button>
                    <Button className="btn btn-danger" onClick={() => { setModalUpdateOpen(false); setAreFieldsEmpty(false); cleanFields() }} >Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default Products