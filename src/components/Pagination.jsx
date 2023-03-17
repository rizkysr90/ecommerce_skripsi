import React from 'react'

function Pagination({totalBtnPagination, pagination, setPage}) {
  return (
    <div className="btn-group ">
        {
        Array.from({length: totalBtnPagination}, (_, i) => i + 1)
        //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        .map((elm) => {
            return (
                <button 
                className={Number(pagination?.page) + 1 === elm ?
                    "btn btn-sm btn-ghost text-neutral text-bold" : "btn btn-sm btn-ghost"
                }
                onClick={() => setPage(elm)}
                key={elm}
                >{elm}
                </button>
            )
        })
        
        }
    </div>
  )
}

export default Pagination