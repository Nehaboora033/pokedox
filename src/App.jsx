import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import pokemonball from './assets/pokeball-icon copy.png'
import { useState } from 'react'

function App() {
  const [search, setSearch] = useState("")

  return (
    <>
      <div className='bg-no-repeat bg-cover ' style={{
        backgroundImage: `url(${pokemonball})`,
        backgroundSize: "500px",
        backgroundPosition: "-200px 150px"
      }}>
        <Header search={search} setSearch={setSearch} />
        <Hero search={search} />
      </div>
    </>
  )
}

export default App