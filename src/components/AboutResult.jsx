import React from 'react'

function AboutResult({ totalResults, currentPage, totalPage }) {

    return (
        <div className="d-flex">
            <p className="text-black-50">
                About {totalResults} results found
            </p>
            <p className="text-black-50 ms-auto">
                {currentPage} page of {totalPage}
            </p>
        </div>
    )
}

export default AboutResult
