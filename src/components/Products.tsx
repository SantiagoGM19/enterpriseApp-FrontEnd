import React from 'react'
import "./styles/products.css"

function Products() {
    return (
        <div>
            <h1>Your products</h1>
            <div className='products-container'>
                <div className="card border-warning mb-3 product" style={{ maxWidth: '18rem;', border: 'solid' }}>
                    <div className="card-header bg-transparent">
                        <button type="button" className="btn btn-danger" style={{ fontWeight: 'bold', fontSize: '15px' }}>
                            X
                        </button>
                    </div>
                    <div className="card-body text-dark">
                        <h5 className="card-title">Default title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                    <div className="card-footer bg-transparent border-dark">
                        <button type="button" className="btn btn-primary" style={{ fontWeight: 'bold', fontSize: '15px' }}>
                            Modify
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products