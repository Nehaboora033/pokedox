import React from 'react'
import { typeColors } from '../utils/helper'
import pikachu from '../assets/no-pokemon-selected-image copy.png'

const SearchCard = ({ pokemon, description, evolution, }) => {
  if (!pokemon) {   //empty no pokemon select 
    return (
      <div className={`text-[20px] text-center bg-white relative  text-gray-400  font-semibold flex flex-col  items-center justify-center h-screen  `}>
        <img src={pikachu} alt="pikachu" className='absolute -top-[140px]' />
        Select a Pokémon to<br />display here.
      </div>
    )
  }

  return (
    <div className={`flex items-center h-screen lg:mt-[10vh] max-lg:w-[600px] max-sm:w-full flex-col mx-auto bg-white z-20 `}>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif`}
        alt={pokemon.name}
        className='pokemon-gif lg:w-[145px] w-[130px]  absolute block mx-auto bottom-[90%] max-lg:fixed max-lg:bottom-[80%] max-sm:bottom-[70%]'
      />
      <div className='text-center max-lg:pt-[50px] max-sm:pt-[100px] '>
        {/* {id} */}
        <p className='text-[#8f9396] font-bold'>N°{pokemon.id}</p>
        {/* name */}
        <p className='m-1 text-[20px] capitalize font-bold'>{pokemon.name}</p>

        {/* types */}
        <div className='flex gap-2 items-center justify-center'>
          {pokemon.types.map(t => (
            <div
              key={t.type.name}
              style={{ backgroundColor: typeColors[t.type.name] }}
              className='text-[14px] p-1 bg-[#f6f8fc] rounded-md capitalize font-bold'>
              {t.type.name}
            </div>
          ))}
        </div>

        {/* description */}
        <p className=' m-1 mt-2 mb-1 font-bold'>
          Pokedox entry
          <p className='text-[#8f9396] font-medium text-[14px]'>
            {description}
          </p>
        </p>

        {/* height and weight */}
        <div className='flex '>
          <div className='w-1/2 m-1'>
            <p className='m-1 font-bold'>Height</p>
            <div className='bg-[#f6f8fc] p-2 m-1 rounded-4xl font-medium text-[14px]'>
              {pokemon.height / 10 + "m"}
            </div>
          </div>
          <div className='w-1/2 m-1'>
            <p className='m-1  font-bold'>Weight</p>
            <div className='bg-[#f6f8fc] p-2 m-1 rounded-4xl font-medium text-[14px]'>
              {pokemon.weight / 10 + "kg"}
            </div>
          </div>
        </div>

        {/* abillity */}
        <div>
          <p className='m-1 mt-2 font-bold'>
            Abilities
          </p>
          <div className='flex-row flex sm:gap-2 gap-1 m-1  items-center '>
            {pokemon.abilities?.map(a => (
              <div
                key={a.ability.name}
                className='sm:p-2 p-1 bg-[#f6f8fc] w-1/2 text-[14px] whitespace-nowrap rounded-full font-medium capitalize'
              >
                {a.ability.name}
              </div>
            ))}
          </div>
        </div>

        {/* stats */}
        <div className='flex items-center justify-center flex-col'>
          <p className='m-1  font-bold mt-2'>
            Stats
          </p>
          <div className='flex flex-wrap justify-center '>
            {pokemon.stats.map((stat, index) => {
              const shortNameMap = {
                hp: { short: 'HP', color: '#df2140' },
                attack: { short: 'ATK', color: '#ff994d' },
                defense: { short: 'DEF', color: '#eecd3d' },
                'special-attack': { short: 'SpA', color: '#85ddff' },
                'special-defense': { short: 'SpD', color: '#96da83' },
                speed: { short: 'SPD', color: '#fb94a8' },
              };

              const info = shortNameMap[stat.stat.name];

              return (
                <div
                  className='bg-[#f6f8fc] w-[45px] rounded-3xl flex flex-col items-center justify-center p-1 m-1'
                  key={index}>

                  <div
                    className='size-8 rounded-full flex items-center justify-center'
                    style={{ backgroundColor: info.color }}
                  >
                    <p className='text-[10px] text-white font-bold'>
                      {info.short}
                    </p>
                  </div>

                  <p className='my-1.5 font-medium '>
                    {stat.base_stat}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* evolution */}
        {evolution && (
          <div className='mt-4'>
            <p className='m-1 mt-2 font-bold'>
              Evolution
            </p>

            <div className='flex justify-center sm:gap-3 gap-1 items-center'>

              {/* STAGE 1 */}
              <div className='flex flex-col items-center'>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolution.chain.species.url.split("/")[6]}.png`}
                  className='size-[70px] '
                />
                <p className='text-[12px] font-semibold capitalize'>
                  {evolution.chain.species.name}
                </p>
              </div>

              {/* STAGE 2 */}
              {evolution.chain.evolves_to[0] && (
                <>
                  <p className='p-1 m-1 bg-[#f6f8fc] rounded-full h-fit text-[12px] font-bold'>
                    Lv.{evolution.chain.evolves_to[0].evolution_details[0]?.min_level || "?"}
                  </p>

                  <div className='flex flex-col items-center'>
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolution.chain.evolves_to[0].species.url.split("/")[6]}.png`}
                      className='size-[70px]'
                    />
                    <p className='text-[12px] font-semibold capitalize'>
                      {evolution.chain.evolves_to[0].species.name}
                    </p>
                  </div>
                </>
              )}

              {/* STAGE 3 */}
              {evolution.chain.evolves_to[0]?.evolves_to[0] && (
                <>
                  <p className='p-1 m-1 bg-[#f6f8fc] rounded-full h-fit text-[12px] font-bold'>
                    Lv.{evolution.chain.evolves_to[0].evolves_to[0].evolution_details[0]?.min_level || "?"}
                  </p>

                  <div className='flex flex-col items-center'>
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolution.chain.evolves_to[0].evolves_to[0].species.url.split("/")[6]}.png`}
                      className='size-[70px]'
                    />
                    <p className='text-[12px] font-semibold capitalize'>
                      {evolution.chain.evolves_to[0].evolves_to[0].species.name}
                    </p>
                  </div>
                </>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default SearchCard