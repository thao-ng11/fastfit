import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faQuoteLeft,
    faQuoteRight,
} from "@fortawesome/free-solid-svg-icons";

function QuoteWidget() {
    const [randomCategory, setRandomCateogy] = useState('')
    const categories = [
        'inspirational',
        'fitness',
        'happiness',
        'health',
        'life',
    ]
    async function fetchQuotes() {
        const apiUrl = 'https://zenquotes.io/api/quotes/random'
        
        const apiResponse = await fetch(apiUrl)
        const quote = await apiResponse.json()
        console.log(quote)
        // if (apiResponse.ok) {
        // }
    }

    useEffect(() => {
        
    }, [])

    return (
        <div className="flex w-full">
            <div className='flex w-full pt-2'>
                <div>
                    <div className="px-3">
                        <FontAwesomeIcon className=" text-[#8e4162] text-xl"icon={faQuoteLeft} />
                    </div>
                    <div className="flex items-center justify-center w-full">
                        <h2 className ="text-center justify-center">TEST</h2>
                    </div>
                    <div className="flex pt-4 px-16 w-full items-end justify-end">
                        <FontAwesomeIcon className=" text-[#8e4162] text-xl"icon={faQuoteRight} />
                    </div>
                    <div className="flex w-full">
                        <h2 className ="text-center justify-center">- AUTHOR</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuoteWidget