import React, { useEffect, useState, useRef, } from 'react'
import PokemonCard from './PokemonCard'
import SearchCard from './SearchCard'
import gsap from "gsap";
import Container from './Container';
import Header from './Header';

const Hero = () => {
    const [allPokemonUrls, setAllPokemonUrls] = useState([])
    const [visiblePokemons, setVisiblePokemons] = useState([])
    const [selectedPokemon, setSelectedPokemon] = useState(null)
    const [search, setSearch] = useState("")
    const [batch, setBatch] = useState(0)
    const [pokemonDescription, setPokemonDescription] = useState("")
    const [evolution, setEvolution] = useState(null);
    const isLoading = useRef(false)
    const BATCH_SIZE = 30;


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

    // for animation
    useEffect(() => {
        if (selectedPokemon) {
            gsap.fromTo(cardRef.current,
                { y: 600, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, ease: "power1.in" }
            );
        }
    }, [selectedPokemon]);

    useEffect(() => {
        const fetchPokemons = async () => {
            const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=800')
            const data = await res.json()
            setAllPokemonUrls(data.results)
            loadBatch(data.results, 0)
        }
        fetchPokemons()
    }, [])

    const cardRef = useRef(null);

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
        <>
            <div>
                <Container>
                    <div className='flex justify-between'>
                        <div className='lg:w-[65%] w-full'>
                            <Header search={search} setSearch={setSearch} />
                            <PokemonCard pokemons={visiblePokemons} onSelect={handleSelect} search={search} />
                        </div>
                        {/* Desktop (sticky) */}
                        <div
                            ref={cardRef}
                            className="lg:w-[34%] lg:block hidden w-full shadow-input lg:sticky top-0 h-screen"
                        >
                            <SearchCard pokemon={selectedPokemon} description={pokemonDescription} evolution={evolution} />
                        </div>

                        {/* Mobile (bottom sheet) */}
                        {selectedPokemon && (<div
                            className={`lg:hidden fixed left-0 top-0 w-full bg-white shadow-xl ease-in-out p-3 transition-all duration-500 z-50 overflow-y-auto ${selectedPokemon ? 'bottom-0' : ''}`}>
                            <SearchCard pokemon={selectedPokemon} description={pokemonDescription} evolution={evolution} setSelectedPokemon={setSelectedPokemon} />
                        </div>)}
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Hero