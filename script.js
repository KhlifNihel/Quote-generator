const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('newquote');
const loader = document.getElementById('loader');

let apiQuotes = []
//hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}


//show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// show new quote
function NewQuote() {
    loading();
    //Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //check if author field is blank and replace it with 'unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // check the code lenght to determine styling
    if (quote.text.length > 80) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    //set quote,hide loader
    complete();
    quoteText.textContent = quote.text;


}
//Get Quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        NewQuote();
    } catch (error) {
        //catch an Error

    }

}

//tweet a quote
function tweetQuote() {
    const twitterUrl = `
    https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}
//event listenners
newQuoteBtn.addEventListener('click', NewQuote);
twitterBtn.addEventListener('click', tweetQuote);


//on load
getQuotes();

/*
// if we want to genrate quotes from local space 

function NewQuote() {
    //Pick a random quote from LocaolQuotes array
    const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    console.log(quote);

}

*/ 