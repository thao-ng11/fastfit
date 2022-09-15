import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faQuoteLeft,
    faQuoteRight,
} from "@fortawesome/free-solid-svg-icons";

import fetchQuotes from './fetchQuotes';

function QuoteWidget() {
    const [quote, setQuote] = useState({
        'quote': '',
        'author': ''
    })

    // async function fetchQuotes() {
    //     const apiUrl = 'https://zenquotes.io/api/quotes/'
        
    //     const apiResponse = await fetch(apiUrl)
    //     if (apiResponse.ok) {
    //         const quote = await apiResponse.json()
    //         console.log(quote)
    //     }
    // }

    useEffect(() => {
        const fetchedQuote = fetchQuotes()
        setQuote({
            'quote': fetchedQuote.q,
            'author': fetchedQuote.a,
        })
    }, [])

    return (
        <div className="flex w-full h-[130px]">
            <div className="grid-col-row-4">
                <div className="grid-col-row-4 px-2">
                    <FontAwesomeIcon className=" text-[#8e4162] text-xl"icon={faQuoteLeft} />
                </div>
                <div className="grid-col-row-4 justify-center items-center">
                    <div className="flex flex-row w-full p-2 items-center justify-center">
                        <h2 className ="font-semibold text-center justify-center">{quote.quote}</h2>
                    </div>
                </div>
                <div className="grid-col-row-4 justify-end items-end pl-[340px] pr-2">
                    <FontAwesomeIcon className=" text-[#8e4162] text-xl"icon={faQuoteRight} />
                </div>
                <div className="grid-col-row-4 justify-end items-end">
                    <div className="flex flex-row w-full items-end justify-end pr-8">
                        <h2 className ="">- {quote.author}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuoteWidget