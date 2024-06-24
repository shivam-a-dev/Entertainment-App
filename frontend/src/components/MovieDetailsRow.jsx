
const MovieDetailsRow = ({ length, language, year, status }) => {
    // Create a new instance of Intl.DisplayNames
    const displayNames = new Intl.DisplayNames(['en'], { type: 'language' });

    // Function to convert language code to language name
    function getLanguageName(code) {
        return displayNames.of(code) || 'Unknown Language';
    }
    const languageName = getLanguageName(language);


    const releasedYear = year.split('-')[0];

    return (
        <div className='flex w-full'>
            <div className='w-1/4 text-xl'>
                <h1 className="text-[#ffffff7a] ">Length</h1>
                <p>{length} min</p>
            </div>
            <div className='w-1/4 text-xl'>
                <h1 className="text-[#ffffff7a] ">Language</h1>
                <p>{languageName}</p>
            </div>
            <div className='w-1/4 text-xl'>
                <h1 className="text-[#ffffff7a]">Year</h1>
                <p>{releasedYear}</p>
            </div>
            <div className='w-1/4 text-xl'>
                <h1 className="text-[#ffffff7a] ">Status</h1>
                <p>{status}</p>
            </div>
        </div>
    )
}

export default MovieDetailsRow