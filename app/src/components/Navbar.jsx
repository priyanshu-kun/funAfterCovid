import React from 'react';
import {Link} from "react-router-dom"

function Navbar(props) {
    return (
        <div className="w-full h-12 bg-black flex items-center justify-center text-white">
            <Link to="/">funAfterCovid</Link>
        </div>
    );
}

export default Navbar;