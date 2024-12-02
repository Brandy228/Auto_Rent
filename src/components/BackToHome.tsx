import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const BackToHome: React.FC = () => {
    //const history = useHistory();
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/');
      };

    return (
        <button
            type="button"
            onClick={handleBack}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
            Back to Home
        </button>
    );
};

export default BackToHome;