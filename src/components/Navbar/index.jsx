import { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import './index.css'


const Navbar = () => {

  // Store the search text
  const [searchText, setSearchText] = useState('')


  // Used to navigate to another route
  const navigate = useNavigate()


  // Handle search
  const handleSearch = () => {

    // Remove extra spaces
    const movieName = searchText.trim()


    // Do nothing if search box is empty
    if (movieName === '') {
      return
    }


    // Navigate to Search Results page
    navigate(
      `/search?query=${encodeURIComponent(movieName)}`
    )


    // Clear search box
    setSearchText('')
  }


  // Search when Enter key is pressed
  const handleKeyDown = (event) => {

    if (event.key === 'Enter') {
      handleSearch()
    }

  }


  return (
    <nav className='navbar'>

      {/* Website logo/name */}
      <Link
        to='/'
        className='logo'
      >
        MovieHub
      </Link>


      {/* Navigation links */}
      <div className='nav-links'>

        <Link to='/'>
          Home
        </Link>

        <Link to='/top-rated'>
          Top Rated
        </Link>

        <Link to='/upcoming'>
          Upcoming
        </Link>

      </div>


      {/* Search area */}
      <div className='search-box'>

        <input
          type='text'
          value={searchText}
          onChange={(event) =>
            setSearchText(event.target.value)
          }
          onKeyDown={handleKeyDown}
          placeholder='Search movies...'
        />


        <button onClick={handleSearch}>
          Search
        </button>

      </div>

    </nav>
  )
}


export default Navbar