import React from 'react'

function Loader() {
    return (
        <div className='d-flex align-items-center justify-content-center vh-100'>
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Loader