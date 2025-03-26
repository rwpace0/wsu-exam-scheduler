import React, { useEffect, useState } from 'react';

const ExportClasses = () => {
    
    

    return (
        <div className="flex flex-col items-center justify-center p-5">
            <button
                className="bg-customCrimson p-2 rounded-lg text-white font-semibold hover:bg-red-800 transition-colors"
                >
                    Export
            </button>
        </div>
    );
};

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
            
                <ExportClasses/>
            
        </div>
    );
};

export default ViewClasses;