import React, { useEffect } from 'react'
import '../styles/providers.css'
import '../styles/products.css'
import { ProviderObject } from '../../state/ObjectsTypes'
import { useDispatch, useSelector } from 'react-redux'
import { stateType } from '../../state/Store'
import { fetchAllProviders } from '../../services/ProvidersServices'
import { getAllProviders } from '../../state/ProviderSlice'

function Providers() {

  const { listOfProviders } = useSelector((state: stateType) => state.provider)
  const dispatch = useDispatch()

  useEffect(() => {
    let listOfProvidersFetched = fetchAllProviders().then(
      providers => {
        dispatch(getAllProviders(providers))
      }
    )
  }, [])

  return (
    <div>
      <h1>Providers available</h1>
      <div className='container'>
        {listOfProviders.map((provider: ProviderObject) => {
          return <div className="card border-dark mb-3 product" key={provider.id} style={{ maxWidth: '18rem', border: 'solid' }}>
            <div className="card-header bg-transparent">
              <button type="button" className="btn btn-danger" style={{ fontWeight: 'bold', fontSize: '15px' }}>
                X
              </button>
            </div>
            <div className="card-body text-dark">
              <h5 className="card-title">{provider.id}</h5>
              <ul>
                <li>{provider.name}</li>
                <li>{provider.phone}</li>
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
        {listOfProviders.length !== 0 ?
          <div></div> :
          <div style={{ marginTop: '16%' }}><h1 style={{ color: 'white' }}>Add a new provider!</h1></div>}
      </div>
    </div>
  )
}

export default Providers