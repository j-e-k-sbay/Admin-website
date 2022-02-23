import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

const Pagination = ({ ordersPerPage, totalOrders, paginate, currentPage }) =>{
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalOrders / ordersPerPage); i++) {
        pageNumbers.push(i);
    }
  
    const nextPage = () => {
        if(currentPage!==pageNumbers.length) {paginate(currentPage+1);}
    };
  
    const prevPage = () => {
        if(currentPage!==1)
        {
            paginate(currentPage-1);
        }
    };

    const compactPaginationPages = [
        ...new Set(
          pageNumbers
            .concat(pageNumbers.slice(currentPage - 2, currentPage))
            .concat(pageNumbers.slice(-1))
        )
      ];

    return(
        <>
        {pageNumbers.length && (
            <>
            <div>
                <FontAwesomeIcon  
                    className="pagination-btn"
                    onClick={ev => {
                        ev.preventDefault();
                        prevPage();
                    }}
                    icon={faChevronLeft}
                />
            </div>
            <div>
                <FontAwesomeIcon  
                    className="pagination-btn"
                    onClick={ev => {
                        ev.preventDefault();
                        nextPage();
                    }}
                    icon={faChevronRight}
                />
            </div>
            </>
        )}
        </>
    )
}

export default Pagination;