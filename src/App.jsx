import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import pokemonball from './assets/pokeball-icon copy.png'

function App() {


  return (
    <>
      <div className='bg-no-repeat bg-cover bg-fixed' style={{
        backgroundImage: `url(${pokemonball})`,
        backgroundSize: "500px",
        backgroundPosition: "-100px 120px"
      }}>

        <Header />
        <Hero />
      </div>
    </>
  )
}

export default App
