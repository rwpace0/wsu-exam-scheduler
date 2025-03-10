import {useNavigate} from 'react-router-dom';

function Welcome() {
    const navigate = useNavigate();

    return (
        <div className="bg-customGray h-screen w-screen flex flex-col items-center justify-center">
            <h1 className="font-primary text-white text-3xl">Welcome to the React App</h1>
            <button onClick={() => navigate("/search")} className="mt-4 px-6 py-2 bg-customCrimson text-white rounded-lg hover:bg-red-800 transition">
                Get Started
            </button>
        </div>
    );
}

export default Welcome;