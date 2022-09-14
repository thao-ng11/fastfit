import React, { useEffect, useState } from 'react';

function QuoteWidget() {
    const [randomCategory, setRandomCateogy] = useState('')
    const categories = [
        'inspirational',
    ]
    async function fetchQuotes() {
        
        let data = await fetch(`https://api.api-ninjas.com/v1/quotes?category=${randomCategory}`, { method: 'GET', headers: { 'X-Api-Key': process.env.REACT_APP_NINJAS_API_KEY } })
    }

    return (
        <div className="flex items-center justify-center">
            <div className='grid-rows-3'>
                <h2 className="pt-3">TEST</h2>
                <h2>TEST</h2>
                <h2>TEST</h2>
            </div>
        </div>
    )
}

export default QuoteWidget