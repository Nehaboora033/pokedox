import React, { useEffect, useState } from 'react'
import PokemonCard from './PokemonCard'
import SearchCard from './SearchCard'

const Hero = () => {
    const [pokemonList, setPokemonList] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
                const data = await res.json()

                // Fetch details for each Pokemon
                const detailed = await Promise.all(
                    data.results.map(poke => fetch(poke.url).then(r => r.json()))
                )

                setPokemonList(detailed)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        fetchPokemons()
    }, [])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    return (
        <div className="max-w-[1200px] mx-auto px-2 w-full pt-[120px] bg-no-repeat bg-cover relative ">
           
                <div className="max-w-[800px] w-full ">
                    <PokemonCard pokemons={pokemonList} />
                </div>
                <div className="max-w-[350px] z-20 w-full h-[79vh] fixed right-[150px] mx-3 mt-3 bottom-0 rounded-2xl shadow-xl">
                    <SearchCard />
                </div>
            
        </div>
    )
}

export default Hero