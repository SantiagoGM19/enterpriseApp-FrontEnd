import React, { useEffect, useState } from 'react'
import '../styles/providers.css'
import '../styles/products.css'
import { ProviderObject } from '../../state/ObjectsTypes'
import { useDispatch, useSelector } from 'react-redux'
import { stateType } from '../../state/Store'
import { deleteProvider, fetchAllProviders, saveProvider, updateProvider } from '../../services/ProvidersServices'
import { addProvider, deleteProviderState, getAllProviders, updateProviderState } from '../../state/ProviderSlice'
import { Modal, ModalBody, ModalHeader, FormGroup, ModalFooter, Button } from 'reactstrap'

function Providers() {

  const [modalUpdateOpen, setModalUpdateOpen] = useState(false)
  const [nameProvider, setNameProvider] = useState("")
  const [phone, setPhone] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [areFieldsEmpty, setAreFieldsEmpty] = useState(false)
  const [providerId, setProviderId] = useState("")
  const { listOfProviders } = useSelector((state: stateType) => state.provider)
  const dispatch = useDispatch()

  useEffect(() => {
    let listOfProvidersFetched = fetchAllProviders().then(
      providers => {
        dispatch(getAllProviders(providers))
      }
    )
  }, [listOfProviders])

  const onAddProvider = async () => {
    if (nameProvider !== "" && phone !== "") {
      setModalUpdateOpen(false)
      setAreFieldsEmpty(false)
      let newProvider: ProviderObject = {
        name: nameProvider,
        phone: phone
      }
      let providerAdded = await saveProvider(newProvider)
      dispatch(addProvider(providerAdded))
      cleanFields()
    } else {
      setAreFieldsEmpty(true)
    }
  }
  
  const cleanFields = () => {
    setNameProvider("")
    setPhone("")
    setProviderId("")
  }

  const onUpdateProvider = async () => {
    if(nameProvider !== "" && phone !== ""){
      setModalUpdateOpen(false)
      setAreFieldsEmpty(false)
      let provider = {
        name: nameProvider,
        phone: phone
      }
      let providerUpdated = await updateProvider(provider, providerId)
      dispatch(updateProviderState(providerUpdated))
      cleanFields()
    }else{
      setAreFieldsEmpty(true)
    }
  }

  const onDeleteProvider = async (id: string | undefined) => {
    if (id !== undefined) {
      let response = await deleteProvider(id)
      if (response.status === 200) {
        dispatch(deleteProviderState(id))
      }
    }
  }

  return (
    <div>
      <h1>Providers available</h1>
      <div className='container'>
        {listOfProviders.map((provider: ProviderObject) => {
          return <div className="card border-dark mb-3 product" key={provider.providerId} style={{ maxWidth: '18rem', border: 'solid' }}>
            <div className="card-header bg-transparent">
              <button type="button" className="btn btn-danger" style={{ fontWeight: 'bold', fontSize: '15px' }} onClick={() => onDeleteProvider(provider.providerId)}>
                X
              </button>
            </div>
            <div className="card-body text-dark">
              <h5 className="card-title">{provider.providerId}</h5>
              <ul>
                <li>{provider.name}</li>
                <li>{provider.phone}</li>
              </ul>
            </div>
            <div className="card-footer bg-transparent border-dark">
              <button type="button" className="btn btn-primary" style={{ fontWeight: 'bold', fontSize: '15px' }} onClick={() => {
                setIsUpdating(true); 
                setModalUpdateOpen(true); 
                setProviderId(provider.providerId === undefined ? "": provider.providerId);
                setNameProvider(provider.name)
                setPhone(provider.phone)
                }}>
                Modify
              </button>
            </div>
          </div>
        })}
        <button type="button" className="btn btn-success add-product" onClick={() => {setIsUpdating(false);setModalUpdateOpen(true)}}>
          +
        </button>
        {listOfProviders.length !== 0 ?
          <div></div> :
          <div style={{ marginTop: '18%' }}><h1 style={{ color: 'white' }}>Add a new provider!</h1></div>}
      </div>
      <Modal isOpen={modalUpdateOpen}>
        <ModalHeader>
          <div><h3>Form</h3></div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Name</label>
            <input required type="text" className='form-control' onChange={(e) => setNameProvider(e.target.value)} value={nameProvider} />
            <label>Phone</label>
            <input required type="text" className='form-control' onChange={(e) => setPhone(e.target.value)} value={phone} />
            {areFieldsEmpty ? <div className="alert alert-danger" role="alert">
              There are empty fields!
            </div>:<></>}
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button className="btn btn-success" onClick={() => { isUpdating ? onUpdateProvider() : onAddProvider()}} >Save</Button>
          <Button className="btn btn-danger" onClick={() => {setModalUpdateOpen(false); setAreFieldsEmpty(false); cleanFields()}} >Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default Providers