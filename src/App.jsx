
//Import routing components from react-router-dom
import {Routes,Route} from 'react-router-dom'

//Import the page components
import Home from './Pages/Home'
import TopRated from './Pages/TopRated'
import UpComing from './Pages/UpComing'
import MovieDetails from './Pages/MovieDetails'
import SearchResults from './Pages/SearchResults'

//Import the common Navbar component
import Navbar from './components/Navbar'

const App = () =>{
  return(
    <>
    {/* Navbar is displayed in every page */}
    <Navbar />

    {/* Define all the routes/pages of the application */ }
    <Routes>

      {/* Home / Popular Movies page */}
      <Route path='/' element={<Home />} />

      {/* Top Rated Movies page */}
      <Route path='/top-rated' element={<TopRated />} />

      {/* UpComing Movies page */}
      <Route path='/upcoming' element={<UpComing />} />

      {/* Single Movie Details page */}
      {/* :movieId is a dynamic value */}
      <Route path='/movie/:movieId' element={<MovieDetails />} />

      {/* Search Results page */}
      <Route path='/search' element={<SearchResults />} />
         </Routes>
    
    
    </>
  )
}

export default App