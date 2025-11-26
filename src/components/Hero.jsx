import React, { useEffect, useState, useRef, } from 'react'
import PokemonCard from './PokemonCard'
import SearchCard from './SearchCard'
import gsap from "gsap";
import Container from './Container';
import Header from './Header';
import { typeColors } from '../utils/helper';

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
    const bgColor =
        selectedPokemon?.types?.length
            ? typeColors[selectedPokemon.types[0].type.name]
            : "transparent";

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

    const bottomSheetRef = useRef();
    const redRef = useRef();

    // animation useeffect
    useEffect(() => {
        if (selectedPokemon) {
            gsap.to(bottomSheetRef.current, {
                bottom: 0,
                duration: 0.35,
                ease: "power3.in"
            });
        } else {
            gsap.to(bottomSheetRef.current, {
                bottom: "-100%",
                duration: 0.35,
                ease: "power3.in"
            });
        }
    }, [selectedPokemon]);

    useEffect(() => {
        if (selectedPokemon) {
            gsap.to(redRef.current, {
                bottom: 0,
                duration: 0.35,
                ease: "power3.out"
            });
        } else {
            gsap.to(redRef.current, {
                bottom: "-100%",
                duration: 0.35,
                ease: "power3.in"
            });
        }
    }, [selectedPokemon]);

    return (
        <>
            <div>
                <Container>
                    <div className='flex w-full relative'>
                        {/* LEFT LIST */}
                        <div className="flex-1 mr-[460px] max-lg:mr-0">
                            <Header search={search} setSearch={setSearch} />
                            <PokemonCard pokemons={visiblePokemons} onSelect={handleSelect} search={search} />
                        </div>
                        {/* RIGHT PANEL */}
                        <div>
                            <div className="w-[360px] fixed right-[100px] shadow-input bottom-0 h-[80vh] max-lg:hidden">
                                <SearchCard pokemon={selectedPokemon} description={pokemonDescription} evolution={evolution} />
                            </div>
                            <div
                                ref={redRef}
                                style={{ backgroundColor: bgColor }}
                                className="lg:hidden fixed left-0 -bottom-full w-full h-full  z-50 "
                            >
                                {/* button */}
                                <div className='flex w-fit float-end bg-white rounded-lg m-6 '>
                                    <button
                                        onClick={() => setSelectedPokemon(null)}
                                        className="p-2  w-fit   cursor-pointer">
                                        <svg width="20" height="20" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.3136 9.89952L7.07095 5.65688L11.3136 1.41424L9.89938 2.58684e-05L5.65674 4.24267L1.4141 2.58684e-05L-0.000115871 1.41424L4.24252 5.65688L-0.000115871 9.89952L1.4141 11.3137L5.65674 7.07109L9.89938 11.3137L11.3136 9.89952Z" fill="black" />
                                        </svg>
                                    </button>

                                    {/* search card */}
                                    <div>
                                        <div
                                            ref={bottomSheetRef}
                                            className="lg:hidden  fixed left-0 -bottom-full w-full  h-[85vh] bg-white rounded-t-2xl shadow-xl p-3 z-50 max-sm:overflow-y-auto ">
                                            {selectedPokemon && (
                                                <SearchCard
                                                    pokemon={selectedPokemon}
                                                    description={pokemonDescription}
                                                    evolution={evolution}
                                                    setSelectedPokemon={setSelectedPokemon}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Hero