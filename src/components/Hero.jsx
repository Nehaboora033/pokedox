import React, { useEffect, useState, useRef } from 'react'
import PokemonCard from './PokemonCard'
import SearchCard from './SearchCard'

const Hero = () => {
    const [allPokemonUrls, setAllPokemonUrls] = useState([])
    const [visiblePokemons, setVisiblePokemons] = useState([])
    const [selectedPokemon, setSelectedPokemon] = useState(null)
    const [batch, setBatch] = useState(0)
    const [pokemonDescription, setPokemonDescription] = useState("")
    const [evolution, setEvolution] = useState(null);
    const isLoading = useRef(false)
    const BATCH_SIZE = 30

    const loadBatch = async (urls, batchIndex) => {
        if (isLoading.current) return  // ⛔ block duplicate calls
        isLoading.current = true

        const slice = urls.slice(batchIndex * BATCH_SIZE, (batchIndex + 1) * BATCH_SIZE)
        const detailed = await Promise.all(
            slice.map(poke => fetch(poke.url).then(r => r.json()))
        )

        setVisiblePokemons(prev => [...prev, ...detailed])
        isLoading.current = false
    }

    useEffect(() => {
        const fetchPokemons = async () => {
            const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=800')
            const data = await res.json()
            setAllPokemonUrls(data.results)
            loadBatch(data.results, 0)
        }
        fetchPokemons()
    }, [])

    const fetchEvolution = async (pokemon) => {
        const responseSpecies = await fetch(pokemon.species.url);
        const dataSpecies = await responseSpecies.json();

        const responseEvolution = await fetch(dataSpecies.evolution_chain.url);
        const dataEvolution = await responseEvolution.json();

        setEvolution(dataEvolution);
    };

    const handleSelect = async (pokemon) => {
        setSelectedPokemon(pokemon)
        fetchEvolution(pokemon);
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`)
        const data = await res.json()

        // find English description
        const entry = data.flavor_text_entries.find(
            e => e.language.name === "en"
        )

        setPokemonDescription(entry ? entry.flavor_text.replace(/\n|\f/g, ' ') : "No description available.")
    }

    const handleScroll = React.useCallback(() => {
        if (
            window.innerHeight + window.scrollY >= document.body.offsetHeight - 5
        ) {
            if (!isLoading.current && (batch + 1) * BATCH_SIZE < allPokemonUrls.length) {
                setBatch(prev => {
                    const next = prev + 1
                    loadBatch(allPokemonUrls, next)
                    return next
                })
            }
        }
    }, [allPokemonUrls, batch])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [handleScroll])

    return (
        <div className="max-w-[1200px] mx-auto px-2 w-full pt-[120px] bg-no-repeat bg-cover relative ">
            <div className="max-w-[800px] w-full ">
                <PokemonCard pokemons={visiblePokemons} onSelect={handleSelect} />
            </div>
            <div className="max-w-[350px] z-20 w-full h-[85vh] fixed right-[150px] mx-3 mt-3 bottom-0 rounded-2xl shadow-xl">
                <SearchCard pokemon={selectedPokemon} description={pokemonDescription} evolution={evolution} />
            </div>
        </div>
    )
}

export default Hero