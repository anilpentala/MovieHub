import { useEffect, useState } from 'react'

import {
  useSearchParams
} from 'react-router-dom'

import MovieGrid from '../../components/MovieGrid'

import Pagination from '../../components/Pagination'

import './index.css'


const SearchResults = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query') || ''

  return <SearchResultsContent key={query} query={query} />
}


const SearchResultsContent = ({ query }) => {


  // Store search results
  const [movies, setMovies] = useState([])


  // Current page
  const [currentPage, setCurrentPage] =
    useState(1)


  // Total pages
  const [totalPages, setTotalPages] =
    useState(1)


  // Loading
  const [loading, setLoading] =
    useState(false)


  // Error
  const [error, setError] =
    useState('')


  useEffect(() => {

    const fetchSearchResults =
      async () => {

        // If there is no search text
        if (!query) {

          setMovies([])

          return

        }


        try {

          setLoading(true)

          setError('')


          const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${currentPage}`
          )


          if (!response.ok) {
            throw new Error(
              'Search request failed'
            )
          }


          const data =
            await response.json()


          setMovies(data.results)

          setTotalPages(data.total_pages)

        } catch {

          setError(
            'Unable to search movies.'
          )

        } finally {

          setLoading(false)

        }

      }


    fetchSearchResults()

  }, [query, currentPage])


  const handlePageChange = (page) => {

    setCurrentPage(page)


    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })

  }


  return (

    <main className='search-page'>



      {query && (
        <p className='search-title'>
          {/* Results for: <strong>{query}</strong> */}
        </p>
      )}


      {!query && (
        <p className='message'>
          Search for a movie using the
          search box.
        </p>
      )}


      {loading && (
        <p className='message'>
          Searching movies...
        </p>
      )}


      {error && (
        <p className='error-message'>
          {error}
        </p>
      )}


      {!loading &&
        !error &&
        query &&
        movies.length === 0 && (

          <p className='message'>
            No movies found.
          </p>

        )}


      {!loading &&
        !error &&
        movies.length > 0 && (

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


export default SearchResults