import React from 'react'
import AppHeader from '../AppHeader/AppHeader'
import './loadingAnimation.scss'

export default function LoadingAnimation() {
    return (
        <div className='loading-screen'>
            <div className='loading'>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        </div>
    )
}
