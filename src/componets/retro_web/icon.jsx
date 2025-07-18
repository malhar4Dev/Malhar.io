const Icon = ({ sourceImage, Name = "" , Doubleclick}) => {
    return (
        <div className=" flex flex-col justify-start items-center text-sm font-sans m-1">
            <div onDoubleClick={Doubleclick} className='h-[5lvh] w-[5lvh] overflow-clip hover:bg-blue-300 rounded-sm'>
                <img src={sourceImage} alt="app icon" />
            </div>
            <h1 className="text-sm font-sans font-semibold">{Name}</h1>
        </div>
    );
}



export default Icon