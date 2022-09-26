import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { add } from '../../store/counterSlice'


const Counter = () => {
    const counter = useSelector(store => store.counter)
    const dispatch = useDispatch()
  return (
    <>
    <div>Counter : {counter}</div>
    <button onClick={() => {dispatch(add())}}>Add</button>
    </>
  )
}

export default Counter