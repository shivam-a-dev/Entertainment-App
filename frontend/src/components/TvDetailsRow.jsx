
const TvDetailsRow = ({ first_air_date,  last_air_date, language, status }) => {
    // Create a new instance of Intl.DisplayNames
    const displayNames = new Intl.DisplayNames(['en'], { type: 'language' });

    // Function to convert language code to language name
    function getLanguageName(code) {
        return displayNames.of(code) || 'Unknown Language';
    }
    const languageName = getLanguageName(language);



    return (
        <div className='flex w-full'>
            <div className='w-1/4 text-xl'>
                <h1 className="text-[#ffffff7a] ">Language</h1>
                <p>{languageName}</p>
            </div>
            <div className='w-1/4 text-xl'>
                <h1 className="text-[#ffffff7a] ">First Air Date</h1>
                <p>{first_air_date}</p>
            </div>
            <div className='w-1/4 text-xl'>
                <h1 className="text-[#ffffff7a]">Last Air Date</h1>
                <p>{last_air_date}</p>
            </div>
            
            
            <div className='w-1/4 text-xl'>
                <h1 className="text-[#ffffff7a] ">Status</h1>
                <p>{status}</p>
            </div>
        </div>
    )
}

export default TvDetailsRow