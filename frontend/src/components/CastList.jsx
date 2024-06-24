const CastList = ({ casts }) => {
    return (
        <div>
            <h1 className="font-semibold text-2xl">Casts</h1>
            <div className="mt-5 flex flex-wrap">
                {casts.map((cast) => (
                    <div className="font-semibold border border-white rounded-[0.5rem] ml-2 px-2 py-[0.15rem] mb-2" key={cast.id}>
                        {cast.name}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CastList
