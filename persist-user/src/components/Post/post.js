import React, { lazy, Suspense, useEffect, useState } from 'react'
import axios from '../../Interceptors/index'
import axiosDefault from 'axios'
import SinglePost from './singlePost'
import { useDispatch, useSelector } from 'react-redux'
import { getPostThunk } from '../../store/postSlice'
// import LazyLoad from '../../LazyLoad'
const LazyLoad = lazy(()=>{
    return import(/*webpackChunkName:'LGGG'*/'./../../LazyLoad/index')
})



const Post = () => {
    const [loading, setLoading] = useState(true)
    const {post: posts} = useSelector(state => state.post)
    // const [posts, setPosts] = useState({})
    const [singlePostData, setSinglePostData] = useState({})
    const [selectedPost, setSelectedPost] = useState(null)
    const [formData, setFormData] = useState({ name: "", book: "" })
    const [show, setShow] = useState(false)
    const dispatch = useDispatch()
    const handleChange = (e) => {
        const { target } = e
        setFormData(prev => ({ ...prev, [target.name]: target.value }))
    }

    const handleCreatePost = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/post.json', JSON.stringify(formData))
            if (res && res.data) {
                dispatch(getPostThunk())
                // getPostData()
                setFormData({ name: "", book: "" })
            }
        }
        catch (err) {

        }
    }

    // const getPostData = async () => {
    //     try {
    //         const res = await axiosDefault.get('https://userpersistance-default-rtdb.firebaseio.com/post.json')
    //         setPosts(res.data ? res.data : {})
    //     }
    //     catch (err) {

    //     } finally {
    //         setLoading(false)
    //     }
    // }

    useEffect(() => {
        // getPostData()
        dispatch(getPostThunk())

    }, [])

    const handlePostClick = async (id) => {
        console.log('id', id)
        setSelectedPost(id)
        setSinglePostData({})
        try {
            const res = await axios.get(`/post/${id}.json`)
            if (res && res.data) {
                setSinglePostData(res.data)
            }
        }
        catch (err) {

        }
    }

    const handleDeletePost = async (e, id) => {
        e.stopPropagation()
        try {
            await axios.delete(`/post/${id}.json`)
            dispatch(getPostThunk())
            // getPostData()
        }
        catch (err) {

        }
    }

    // if (loading) {
    //     return <h1>Loading....</h1>
    // }
    return (
        <>
            <h1>Post</h1>
            <h4>Create post</h4>
            <form onSubmit={handleCreatePost.bind(this)}>
                <input type={"text"} placeholder="name" name="name" onChange={handleChange} value={formData.name} />
                <input type={"text"} placeholder="book" name="book" onChange={handleChange} value={formData.book} />
                <button type='submit'>Add Post</button>
            </form>
            {posts.map(i => <h4 key={i.id} onClick={handlePostClick.bind(this, i)}>{`${i.book} -by ${i.name}`}<span onClick={(e) => {
                handleDeletePost(e, i)
            }}>{" "}delete</span></h4>)}
            <div onClick={() => {
                setShow(prev => !prev)
            }}>SHOW</div>
            <Suspense fallback={<h1>LLLLLL</h1>}>
                {show && <LazyLoad />}
            </Suspense>
            {!!Object.keys(singlePostData).length && <SinglePost name={singlePostData.name} />}
        </>
    )
}

export default Post