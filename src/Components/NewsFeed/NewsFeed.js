import React, { Component, useEffect } from 'react';
import AppHeader from '../AppHeader/AppHeader'
import {connect} from 'react-redux'
import {followingPosts} from '../../dux/reducers/postsReducer'
import axios from 'axios'
import './NewsFeed.scss'

function NewsFeed (props ){

    // Getting all the posts of the people who you follow
    let postsToSee = []
    const {following} = props.user

    useEffect(()=> {
        following.map(val => {
            axios.get(`/api/following-posts/${val}`)
            .then(res => {
                if(res.data.length > 0){
                    postsToSee.push(res.data)
                }
                props.followingPosts(postsToSee) //setting posts unto redux
            })
            .catch(err => console.log('Error getting posts of those who you follow'))
        })
    }, [])
    

    // Display each post
    
    let {followingPosts} = props.posts
    let mappedPosts;
    if(followingPosts){
        followingPosts = followingPosts.flat()
        console.log(followingPosts)
        mappedPosts = followingPosts.map(val => {
            console.log(val)
            return (
                <div className='post-card'>
                    <div className='post-user-info'>
                        <img src={val.profile_pic} />
                        <div className ='user-info'>
                            <h1>{val.first} {val.last}</h1>
                            <h2>{val.time_entered}</h2>
                        </div>
                    </div>
                    <div className='post-content'>
                        <p>{val.content}</p>
                    </div>
                    
                    
                </div>
            )
        })
    }

    return (
        <div>
            <header>
                <AppHeader />
            </header>
            <main>
                <div className='newsfeed'>{mappedPosts}</div>
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