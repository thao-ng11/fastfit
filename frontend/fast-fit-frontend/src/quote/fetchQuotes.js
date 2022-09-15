import quotesList from "./quotes"

function fetchQuotes() {
    let quotes = quotesList()
    let quotesLength = quotes.length
    let randomNumber = Math.floor(Math.random() * quotesLength)
    // console.log(quotes)
    // console.log('QUOTES', quotesLength, randomNumber)

    
    return (
        quotes[randomNumber]
    )
}

export default fetchQuotes