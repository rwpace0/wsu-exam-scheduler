/*
This was the the original search results page but was combined to the search page.
*/

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Helper hook to get query parameters from URL
const useQuery = () => new URLSearchParams(useLocation().search);

const Results = () => {
    const [exams, setExams] = useState([]);
    const [hover, setHover] = useState(null);
    const [addedClass, setAddedClass] = useState(() => {
        const storedClass = sessionStorage.getItem('addedClass');
        return storedClass ? JSON.parse(storedClass) : [];
    });

    const query = useQuery();
    const searchVal = query.get('q') || "";

    useEffect(() => {
        const fetchExams = async () => {
            const response = await fetch(`http://127.0.0.1:5000/search?q=${encodeURIComponent(searchVal)}`);
            const data = await response.json();
            setExams(data.exams);
        };
        fetchExams();
    }, [searchVal]);

    const handleToggleClass = (exam) => {
        setAddedClass((prevClasses) => {
            let updatedClasses;
            if (prevClasses.some(item => item.section === exam.section)) {
                // remove the class if it already exists
                updatedClasses = prevClasses.filter(item => item.section !== exam.section);
            } else {
                // add the class if it doesn't exist
                updatedClasses = [...prevClasses, exam];
            }

            // update sessionStorage 
            sessionStorage.setItem('addedClass', JSON.stringify(updatedClasses));
            return updatedClasses;
        });
    };

    return (
        <div className="flex flex-col items-center justify-center p-5">
            <h1 className="font-primary text-3xl">Results for: "{searchVal}"</h1>
            {exams.length > 0 ? (
                <ul>
                    {exams.map((exam, index) => {
                        const isAdded = addedClass.some(item => item.section === exam.section);
                        return (
                            <li key={index}>
                                {exam.primary}, {exam.campus}, {exam.section}, {exam.day}, {exam.time}
                                <button
                                    onMouseEnter={() => setHover(exam.section)}
                                    onMouseLeave={() => setHover(null)}
                                    onClick={() => handleToggleClass(exam)}
                                    className="ml-2 bg-customCrimson p-2 rounded-lg text-white font-semibold hover:bg-red-800 transition-colors"
                                >
                                    {!isAdded ? "Add" : (hover === exam.section ? "Remove" : "Added")}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p>No exams found.</p>
            )}
        </div>
    );
};

export default Results;