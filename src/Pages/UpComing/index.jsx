import { useEffect, useState } from 'react'

import MovieGrid from '../../components/MovieGrid'

import Pagination from '../../components/Pagination'

import './index.css'


const Upcoming = () => {

  const [movies, setMovies] = useState([])

  const [currentPage, setCurrentPage] = useState(1)

  const [totalPages, setTotalPages] = useState(1)

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState('')


  useEffect(() => {

    const fetchMovies = async () => {

      try {

        setLoading(true)

        setError('')


        const response = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=${currentPage}`
        )


        if (!response.ok) {
          throw new Error('Failed to fetch movies')
        }


        const data = await response.json()


        setMovies(data.results)

        setTotalPages(data.total_pages)

      } catch {

        setError(
          'Unable to load Upcoming movies.'
        )

      } finally {

        setLoading(false)

      }

    }


    fetchMovies()

  }, [currentPage])


  const handlePageChange = (page) => {

    setCurrentPage(page)

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })

  }


  return (

    <main className='page-container'>

      
      {loading && (
        <p className='message'>
          Loading movies...
        </p>
      )}


      {error && (
        <p className='error-message'>
          {error}
        </p>
      )}


      {!loading && !error && (
        <>
          <MovieGrid movies={movies} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}

    </main>

  )
}


export default Upcoming