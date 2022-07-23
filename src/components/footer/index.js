import React from 'react';

const Footer = () => {
    
    return(
        <div
            className="opacity-25 d-flex flex-column flex-md-row text-center justify-content-between py-4 px-4 px-xl-6 ">
            {/*  Copyright  */}
            <div className="text-white">
                <strong className="Copyright">Copyright © 2022. Danilo Carvalho.</strong>
            </div>
            <div>
                <a href="#!" className="text-white me-4">
                    <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#!" className="text-white me-4">
                    <i className="fab fa-twitter"></i>
                </a>
                <a href="#!" className="text-white me-4">
                    <i className="fab fa-google"></i>
                </a>
                <a href="#!" className="text-white">
                    <i className="fab fa-linkedin-in"></i>
                </a>
            </div>
        </div>
    )

}

export default Footer;