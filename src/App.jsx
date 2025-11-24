import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import pokemonball from './assets/pokeball-icon copy.png'

function App() {


  return (
    <>
      <div className='bg-no-repeat bg-cover ' style={{
        backgroundImage: `url(${pokemonball})`,
        backgroundSize: "500px",
        backgroundPosition: "-200px 150px"
      }}>

        <Header />
        <Hero />
      </div>
    </>
  )
}

export default App
