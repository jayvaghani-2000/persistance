import React, { lazy, Suspense, useEffect, useState } from 'react'
import axios from '../../Interceptors/index'
import axiosDefault from 'axios'
import SinglePost from './singlePost'
import { useDispatch, useSelector } from 'react-redux'
import { getPostThunk, postPostThunk, updatePostThunk } from '../../store/postSlice'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'

const LazyLoad = lazy(() => {
    return import(/*webpackChunkName:'LGGG'*/'./../../LazyLoad/index')
})



const Post = () => {
    const { post: posts } = useSelector(state => state.post)
    const [singlePostData, setSinglePostData] = useState({})
    const [selectedPost, setSelectedPost] = useState(null)
    const [formData, setFormData] = useState({ name: "", book: "" })
    const [show, setShow] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleChange = (e) => {
        const { target } = e
        setFormData(prev => ({ ...prev, [target.name]: target.value }))
    }

    const handleCreatePost = async (e) => {
        e.preventDefault()
        dispatch(postPostThunk(formData))
        setFormData({ name: "", book: "" })
    }

    useEffect(() => {
        dispatch(getPostThunk())
        if (!Object.keys(singlePostData).length) navigate('/post')
    }, [])

    const handlePostClick = async (id) => {
        setSelectedPost(id)
        setSinglePostData({})
        try {
            const res = await axios.get(`/post/${id}.json`)
            if (res && res.data) {
                setSinglePostData(res.data)
                navigate("/post/detail")
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
        }
        catch (err) {

        }
    }

    const handlePostEdit = (e,data) => {
        e.stopPropagation()
        setEditMode(true)
        setFormData(data)
    }

    const saveEditPost = (e) => {
        e.stopPropagation()
        const {id,name,book} = formData 
        dispatch(updatePostThunk(id, {name,book}))
    }


    return (
        <>
            <h1>Post</h1>
            <h4>Create post</h4>
            <form onSubmit={handleCreatePost.bind(this)} style={{
                display: "flex", flexDirection: "column",
                rowGap: "20px", alignItems: "center"
            }}>
                <input type={"text"} placeholder="name" name="name" onChange={handleChange} value={formData.name} />
                <input type={"text"} placeholder="book" name="book" onChange={handleChange} value={formData.book} />
                <button type='submit'>Add Post</button>
            </form>
            {posts.map(i => <h4 key={i.id} onClick={handlePostClick.bind(this, i.id)}>{`${i.book} -by ${i.name}`}<p> <span onClick={(e) => {
                handleDeletePost(e, i.id)
            }}>{" "}delete</span><span onClick={(e) => { editMode ? saveEditPost(e): handlePostEdit(e, i)}}>{" "}Edit</span></p></h4>)}

            {/* <div onClick={() => {
                setShow(prev => !prev)
            }}>SHOW</div>
            <Suspense fallback={<h1>LLLLLL</h1>}>
                {show && <LazyLoad />}
            </Suspense> */}

            {!!Object.keys(singlePostData).length &&
                <Routes>
                    <Route path="/detail" element={<SinglePost name={singlePostData.name} />} />
                </Routes>
            }
        </>
    )
}

export default Post