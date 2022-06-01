import React from 'react'
import loadingSpinner from './loadingSpinner.gif'

const Loading = ()=> {
    return (
       <div className='text-center'>
        <img className='my-3'  src={loadingSpinner} alt="loadingSpinner" />
      </div>
    )
}
export default Loading