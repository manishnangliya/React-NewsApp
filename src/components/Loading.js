import React, { Component } from 'react'
import loadingSpinner from './loadingSpinner.gif'

export default class Loading extends Component {
  render() {
    return (
       <div className='text-center'>
        <img src={loadingSpinner} alt="loadingSpinner" />
      </div>
    )
  }
}
