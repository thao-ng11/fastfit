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
        <div className="flex w-full">
            <div className='flex w-full pt-2'>
                <div>
                    <div className="px-3">
                        <FontAwesomeIcon className=" text-[#8e4162] text-xl"icon={faQuoteLeft} />
                    </div>
                    <div className="flex items-center justify-center w-full">
                        <h2 className ="text-center justify-center">{quote.quote}</h2>
                    </div>
                    <div className="flex pt-4 px-16 w-full items-end justify-end">
                        <FontAwesomeIcon className=" text-[#8e4162] text-xl"icon={faQuoteRight} />
                    </div>
                    <div className="flex w-full">
                        <h2 className ="text-center justify-center">{quote.author}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuoteWidget