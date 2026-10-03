import './index.css'


const Pagination = ({
  currentPage,
  totalPages,
  onPageChange
}) => {

  return (

    <div className='pagination'>

      {/* Previous */}

      <button
        onClick={() =>
          onPageChange(currentPage - 1)
        }
        disabled={currentPage === 1}
      >
        Previous
      </button>


      {/* Page number */}

      <span>
        Page {currentPage} of {totalPages}
      </span>


      {/* Next */}

      <button
        onClick={() =>
          onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
      >
        Next
      </button>

    </div>

  )
}


export default Pagination