import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Results from './Results'; 

const TextBox = () => {
    // set is the function to update the var associated
    const [searchVal, setSearchVal] = useState(""); // empy string
    const [exams, setExams] = useState([]); // empty array to hold exam data
    const navigate = useNavigate();

    const handleInput = (e) => {
        setSearchVal(e.target.value); // updates search value to the current value of the input
    };
    const handleSubmit = async (e) => {
        e.preventDefault(); // prevents the form from reloading the page. need always
        const data = await fetchExams(searchVal); // get exams with the users input as a filter
        console.log("Searching for: ", searchVal);
        console.log(data.exams); // logs filtered exams returned from backend

        navigate(`/search/results?q=${encodeURIComponent(searchVal)}`);//after submit goes to a new page

    };

    useEffect(() => {
        fetchExams(); //fetches all exams when page first runs
    }, []);

    const fetchExams = async (query = "") => {
        const response = await fetch(`http://127.0.0.1:5000/search?q=${query}`); // get request for backend 
        const data = await response.json();  //parse results
        setExams(data.exams); // updates the exams with currernt data
        return data; // return data for handlesubmit

    };


    return (
        <div className="flex items-center justify-center p-5">
            <div className="rounded-lg p-5">
                <div className="flex">
                    <div className="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-5">
                        <svg viewBox="0 0 20 20" aria-hidden="true" className="pointer-events-none absolute w-5 fill-gray-500 transition">
                            <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
                        </svg>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input type="text" value={searchVal} onChange={handleInput} className="w-full max-w-[160px] h-full bg-white pl-2 text-base font-semibold outline-0" id="searchtext" />

                        <button type="submit" onClick = {<Results></Results>} className="bg-customCrimson p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-red-800 transition-colors">
                            Search
                        </button>
                    </form>
                </div>

                

            </div>
        </div>
    );
}

const Search = () => {



    return (

        <div className="bg-grayBG h-screen w-screen flex flex-col items-center justify-center">
            <h1 className="font-primary text-white text-3xl">
                Search
            </h1>
            <p className="text-lg text-white">
                This is the search page.
            </p>
            {/*search button and text box*/}
            <TextBox></TextBox>

            
        </div>
        
        

    );
}

export default Search;