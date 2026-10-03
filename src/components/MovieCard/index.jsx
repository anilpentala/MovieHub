import { Link } from 'react-router-dom'

import './index.css'


const MovieCard = ({ movie }) => {

  return (

    <Link
      to={`/movie/${movie.id}`}
      className='movie-card-link'
    >

      <div className='movie-card'>

        {/* Movie poster */}

        {movie.poster_path ? (

          <img
            className='movie-poster'
            src={
              `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            }
            alt={movie.title}
          />

        ) : (

          <div className='no-poster'>
            No Image
          </div>

        )}


        {/* Movie information */}

        <div className='movie-info'>

          <h2>
            {movie.title}
          </h2>


          <p>
            Release Date:{' '}
            {movie.release_date || 'N/A'}
          </p>


          <p>
            ⭐{' '}
            {movie.vote_average
              ? movie.vote_average.toFixed(1)
              : 'N/A'}
          </p>

        </div>

      </div>

    </Link>

  )
}


export default MovieCard