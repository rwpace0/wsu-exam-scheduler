import React, { useEffect, useState } from 'react';

const ViewClasses = () => {
    const [addedClass, setAddedClass] = useState([]);

    useEffect(() => { // get the stored classes from sessionStorage
        const storedClass = sessionStorage.getItem('addedClass');
        setAddedClass(storedClass ? JSON.parse(storedClass) : []);
        console.log(storedClass);
    }, []);
    
    const removeClass = (classToRemove) => {
        const updatedClass = addedClass.filter((item) => item !== classToRemove);
        setAddedClass(updatedClass);
        sessionStorage.setItem('addedClass', JSON.stringify(updatedClass)); //update local storage
    };

    const exportClasses = (exams) => {
        const baseURL = "http://127.0.0.1:5000/export";
        const params = new URLSearchParams();
    
    // Append each exam's section as a separate query parameter
    exams.forEach(exam => params.append("section", exam.section));
    
    const url = `${baseURL}?${params.toString()}`;
    window.open(url, "_blank");
    }

    return (
        <div className="flex flex-col items-center justify-center p-5">
            <ul>
                {addedClass.map((exam, index) => (
                    <li key={index}>
                        {exam.primary}, {exam.campus}, {exam.section}, {exam.day}, {exam.time}
                        <button
                            onClick={() => removeClass(exam)}
                            className="ml-2 bg-customCrimson p-2 rounded-lg text-white font-semibold hover:bg-red-800 transition-colors"
                            >
                                Remove
                        </button>
                    </li>
                ))}
            </ul>
            
            <div className="flex flex-col items-center justify-center p-5">
            <button
                className="bg-customCrimson p-2 rounded-lg text-white font-semibold hover:bg-red-800 transition-colors"
                onClick={() => exportClasses(addedClass)}
                >
                    Export
            </button>
        </div>
            
        </div>
    );
};

export default ViewClasses;