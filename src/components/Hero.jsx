import React, { useEffect, useState } from 'react'
import PokemonCard from './PokemonCard'
import SearchCard from './SearchCard'
import Header from './Header'

const Hero = () => {
  const [pokemonList, setPokemonList] = useState([])
  const [selected, setSelected] = useState(null)  // selected pokemon details
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch list of 150 Pokemon
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
        const data = await res.json()
        setPokemonList(data.results) // list of { name, url }
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    fetchPokemons()
  }, [])

  // Function to search / select a pokemon by name
  const handleSearch = async (name) => {
    try {
      // Fetch main data (stats, abilities, sprites)
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
      const pokemonData = await res.json()

      // Fetch species data for evolution chain
      const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonData.id}`)
      const speciesData = await speciesRes.json()

      // Fetch evolution chain
      const evoRes = await fetch(speciesData.evolution_chain.url)
      const evoData = await evoRes.json()

      setSelected({
        ...pokemonData,
        species: speciesData,
        evolution: evoData
      })
    } catch (err) {
      console.error("Search error:", err)
      setError(err)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="max-w-[1164px] mx-auto px-3 w-full pt-[200px] bg-no-repeat bg-cover relative">
      {/* Pass the search handler to Header */}
      <Header onSearch={handleSearch} />

      <div className="flex gap-2 justify-between h-full">
        <div className="max-w-[810px] w-full">
          <PokemonCard pokemons={pokemonList} onSelect={handleSearch} />
        </div>
        <div className="max-w-[350px] z-20 w-full h-[79vh] fixed right-[150px] mx-3 mt-3 bottom-0 rounded-2xl shadow-xl">
          <SearchCard pokemon={selected} />
        </div>
      </div>
    </div>
  )
}

export default Hero