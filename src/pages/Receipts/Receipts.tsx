import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchAllReceipts } from '../../services/ReceiptServices'
import { Product, Receipt } from '../../state/ObjectsTypes'
import { getAllReceipts } from '../../state/ReceiptSlice'
import { stateType } from '../../state/Store'
import "../styles/products.css"

function Receipts() {

  const { listOfReceipts } = useSelector((state: stateType) => state.receipt)
  const [modalShowOpen, setModalShowOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    fetchAllReceipts().then(
      receipts => {
        dispatch(getAllReceipts(receipts))
      }
    )
  }, [listOfReceipts])

  const onAddReceipt = async () => {

  }

  return (
    <div className='container'>
      {listOfReceipts.map(receipt => {
        return <div className="card border-dark mb-3 product" key={receipt.receiptId} style={{ maxWidth: '18rem', border: 'solid' }}>
          <div className="card-header bg-transparent">
          </div>
          <div className="card-body text-dark">
            <h5 className="card-title">{receipt.receiptId}</h5>
            <ul>
              <li>{receipt.name}</li>
              <li><button type="button" className="btn btn-info">See products</button></li>
              <li>{receipt.providerId}</li>
            </ul>
          </div>
          <div className="card-footer bg-transparent border-dark">
          </div>
        </div>
      })}
      <button type="button" className="btn btn-success add-product" onClick={() => navigate('/receipts/form')}>
        +
      </button>
    </div>
  )
}

export default Receipts