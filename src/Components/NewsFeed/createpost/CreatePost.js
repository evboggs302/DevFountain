import React, {useState} from 'react'
import UseFetch from '../../usefetch'
import './createpost.scss'

export default function CreatePost() {
    const [input, setInput] = useState(null)
    const {data: data, postData: postData} = UseFetch('/api/post', true, null)

    function createPost(content){
        if(content!==null){
            console.log(content)
            postData({content})
        }
    }
    
    function handleChange(e){
        setInput(e)
    }
    
    return (
        <div className='create-post'>
            <form>
                <input type='text' className='post-input' placeholder="What's on your mind?" name='post' onChange={e => handleChange(e.target.value)} />
                <input type='reset' value='Post' className='post-button' onClick={() => createPost(input)} />
            </form>
            
        </div>
    )
}
