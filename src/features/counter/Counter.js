import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, reset, incrementByAmount } from './counterSlice'

export function Counter() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <span><h1>{count}</h1></span>
        <div style={{ paddingTop: "32px" }}>
            <button
              aria-label="Decrement value"
              onClick={() => dispatch(decrement())}
            >
              Decrement
            </button>
            <button
              aria-label="Increment value"
              onClick={() => dispatch(increment())}
            >
              Increment
            </button>
            <button
              aria-label="Reset value"
              onClick={() => dispatch(reset())}
            >
              Reset
            </button>
            <button
              aria-label="Reset value"
              onClick={() => dispatch(incrementByAmount(10))}
            >
              Increment By 10
            </button>
            <button
              aria-label="Reset value"
              onClick={() => dispatch(incrementByAmount(100))}
            >
              Increment By 100
            </button>
        </div>
      </div>
    </div>
  )
}