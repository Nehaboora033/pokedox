import React from 'react'
import pikachu from '../assets/no-pokemon-selected-image copy.png'
import { stats_data } from '../utils/helper'
import ball from '../assets/pokeball-icon copy.png'

const SearchCard = () => {
  return (
    <div className='flex  w-full justify-center flex-col h-full relative '>
      <img src={pikachu} alt="pikachu" className=' w-[140px] absolute top-[-170px] mx-0 left-[30%]' />

      {/* info */}
      <div className='text-center font-bold '>
        {/* id */}
        <p className='text-[#8f9396]'>#231</p>
        {/* name */}
        <p className='m-1 text-[24px] '>
          Pikachu
        </p>
        {/* types */}
        <div className='flex gap-2 items-center justify-center'>
          <div className='text-[14px] p-1 bg-[#AB549A] w-[60px] rounded-md'>
            posion
          </div>
          <div className='text-[14px] p-1 bg-[#78CD54] w-[60px] rounded-md'>
            grass
          </div>
        </div>

        {/* description */}
        <p className='mt-4 mx-1 mb-1'>
          Pokedox entry
          <p className='text-[#8f9396] font-medium!'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit magni architecto molestias ipsam
          </p>
        </p>
        {/* height and weight */}

        <div className='flex'>
          <div className='w-1/2 m-1'>
            <p className='m-1 mt-3'>Height</p>
            <div className='bg-[#f6f8fc] p-2 m-1 rounded-4xl'>
              2m
            </div>
          </div>
          <div className='w-1/2 m-1'>
            <p className='m-1 mt-3'>Weight</p>
            <div className='bg-[#f6f8fc] p-2 m-1 rounded-4xl'>
              28kg
            </div>
          </div>
        </div>

        {/* abillity */}
        <div>
          <p className='m-1 mt-3'>
            Abilities
          </p>
          <div className='flex gap-2'>
            <div className='w-1/2 m-1 p-2 bg-[#f6f8fc] rounded-4xl'>
              overgeow
            </div>
            <div className='w-1/2 m-1 p-2 bg-[#f6f8fc] rounded-4xl'>
              chlorophyll
            </div>
          </div>
        </div>
        {/* stats */}
        <div className='flex items-center justify-center flex-col'>
          <p className='m-1 mt-3'>
            Stats
          </p>
          <div className='flex'>
            {stats_data.map((item, index) => (
              <div className='p-1 m-1 bg-[#f6f8fc] rounded-3xl h-16' key={index}>
                <div className='bg-[#df2140] size-[30px] rounded-full flex items-center justify-center'>
                  <p className='text-[12px] text-white'>
                    {item.title}
                  </p>
                </div>
                <p className='my-1.5'>
                  {item.number}
                </p>

              </div>
            ))}
          </div>

        </div>
        {/* evoluation */}
        <div>
          <p className='m-1 mt-3'>
            Evoluation
          </p>
          <div className='flex justify-center gap-1  items-center'>
            <div>
              <img src={ball} alt="" className='size-[70px]' />
            </div>

            <p className='p-1 m-1 rounded-full bg-[#f6f8fc] h-fit'>
              Lv.13
            </p>

            <div>
              <img src={ball} alt="pokemon" className='size-[70px]' />
            </div>

            <p className='p-1 m-1 bg-[#f6f8fc] rounded-full h-fit'>
              Lv.16
            </p>

            <div>
              <img src={ball} alt="pokemon" className='size-[70px]'/>
            </div>
          </div>
        </div>
      </div>
      {/* empty div  */}
      {/* <div className='text-[20px] text-center text-gray-400 font-semibold'>
        Select a Pokemon to<br />
        display here.
      </div> */}

    </div >


  )
}

export default SearchCard