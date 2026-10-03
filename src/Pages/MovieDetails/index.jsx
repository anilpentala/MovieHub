import { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import './index.css'


const MovieDetails = () => {

  // Get movie ID from URL
  const { movieId } = useParams()


  // Store movie details
  const [movie, setMovie] = useState(null)


  // Store cast
  const [cast, setCast] = useState([])


  // Loading
  const [loading, setLoading] = useState(true)


  // Error
  const [error, setError] = useState('')


  useEffect(() => {

    const fetchMovieDetails = async () => {

      try {

        setLoading(true)

        setError('')


        // Fetch movie details

        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`
        )


        if (!movieResponse.ok) {
          throw new Error('Movie not found')
        }


        const movieData =
          await movieResponse.json()


        setMovie(movieData)


        // Fetch cast

        const castResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`
        )


        if (!castResponse.ok) {
          throw new Error('Cast not found')
        }


        const castData =
          await castResponse.json()


        setCast(castData.cast || [])

      } catch {

        setError(
          'Unable to load movie details.'
        )

      } finally {

        setLoading(false)

      }

    }


    fetchMovieDetails()

  }, [movieId])


  if (loading) {

    return (
      <p className='message'>
        Loading movie details...
      </p>
    )

  }


  if (error) {

    return (
      <p className='error-message'>
        {error}
      </p>
    )

  }


  if (!movie) {
    return null
  }


  return (

    <main className='movie-details'>

      {/* Movie poster */}

      {movie.poster_path ? (

        <img
          className='details-poster'
          src={
            `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          }
          alt={movie.title}
        />

      ) : (

        <div className='details-no-poster'>
          No Image
        </div>

      )}


      {/* Movie information */}

      <section className='details-info'>

        <h1>
          {movie.title}
        </h1>


        <p>
          <strong>
            Release Date:
          </strong>{' '}
          {movie.release_date || 'N/A'}
        </p>


        <p>
          <strong>
            Rating:
          </strong>{' '}
          ⭐ {movie.vote_average
            ? movie.vote_average.toFixed(1)
            : 'N/A'}
        </p>


        <p>
          <strong>
            Runtime:
          </strong>{' '}
          {movie.runtime
            ? `${movie.runtime} minutes`
            : 'N/A'}
        </p>


        <p>
          <strong>
            Genres:
          </strong>{' '}

          {movie.genres?.length
            ? movie.genres
                .map(genre => genre.name)
                .join(', ')
            : 'N/A'}
        </p>


        <h2>
          Overview
        </h2>


        <p className='overview'>
          {movie.overview || 'No overview available.'}
        </p>

      </section>


      {/* Cast */}

      <section className='cast-section'>

        <h2>
          Cast
        </h2>


        <div className='cast-grid'>

          {cast.slice(0, 10).map(actor => (

            <div
              className='cast-card'
              key={actor.id}
            >

              {actor.profile_path ? (

                <img
                  src={
                    `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  }
                  alt={actor.name}
                />

              ) : (

                <div className='cast-no-image'>
                  No Image
                </div>

              )}


              <h3>
                {actor.name}
              </h3>


              <p>
                {actor.character || 'N/A'}
              </p>

            </div>

          ))}

        </div>

      </section>

    </main>

  )
}


export default MovieDetails