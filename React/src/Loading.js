import React from 'react'
import ReactLoading from 'react-loading'

export const Loading = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center absolute top-0 left-0'>
      <ReactLoading type='spinningBubbles' color='blue' width={100} height={100} />
    </div>
  )
}

export default Loading;
