import React from 'react'

const VideoTitle = ({title,overview}) => {
  return (
    <div className='w-screen  aspect-video pt-[15%]  p-4 md:px-20 absolute text-white bg-gradient-to-r from-black cursor-pointer'>
        <h1 className=' text-sm mt-10 md:mt-0  md:inline-block md:text-4xl font-bold'>{title}</h1>
        <p className='hidden md:block text-sm py-6 w-1/4'>{overview}</p>
        <div>
            <button className='bg-gray-500 text-white p-2 px-6 bg-opacity-50 rounded-lg hover:bg-opacity-80 hidden md:inline-block'>Play More </button>
            <button className=' mx-2 text-white bg-gray-500 p-2 px-6 bg-opacity-50 rounded-lg hidden md:inline-block'>More Info</button>

        </div>

    </div>
  )
}

export default VideoTitle