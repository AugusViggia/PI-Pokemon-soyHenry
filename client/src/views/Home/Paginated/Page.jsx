import React from "react";

const Page = ({charactersPerPage, pokemons, paginated}) => {
    const pageNumbers = [];

    for (let i = 0; i < Math.ceil(pokemons / charactersPerPage); i++){
        pageNumbers.push(i+1)
    }

    return (
        <nav>
            <ul className="{style.paginado}">
                {
                    pageNumbers &&
                    pageNumbers.map(number => (
                        <li key={number}>
                            <a onClick={() => paginated(number)}>{number}</a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
};

export default Page;