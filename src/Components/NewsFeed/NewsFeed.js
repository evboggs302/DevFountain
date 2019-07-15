import React, { Component, useEffect } from 'react';
import AppHeader from '../AppHeader/AppHeader'
import {connect} from 'react-redux'
import {followingPosts} from '../../dux/reducers/postsReducer'
import usefetch from '../usefetch'
import axios from 'axios'

function NewsFeed (props ){

    // Getting all the posts of the people who you follow
    let postsToSee = []
    const {following} = props.user
    const {data: posts, fetchDataWithId: getPosts} = usefetch('/api/following-posts', true, [])

    useEffect(()=> {
        following.map(val => {
            axios.get(`/api/following-posts/${val}`)
            .then(res => {
                if(res.data.length > 0){
                    postsToSee.push(res.data)
                }
                props.followingPosts(postsToSee)
            })
        })
    }, [])
    console.log(props)

    return (
        <div>
            <header>
                <AppHeader />
            </header>
            <main>
                Newsfeed
            </main>
        </div>
    )
}

const mapPropsToState = (reduxState) => {
    return reduxState
}

const mappedDispatchToProps = {
    followingPosts
}

const myConnect = connect(mapPropsToState, mappedDispatchToProps)

export default myConnect(NewsFeed)