import React from 'react';

const Footer = () => {
    return(

        <div
            class="opacity-25 d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-6 ">
            {/*  Copyright  */}
            <div class="text-white  mb-md-0  ">
                <strong class="Copyright">Copyright © 2022. Danilo Carvalho.</strong>
            </div>
            <div>
                <a href="#!" class="text-white me-4">
                    <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#!" class="text-white me-4">
                    <i class="fab fa-twitter"></i>
                </a>
                <a href="#!" class="text-white me-4">
                    <i class="fab fa-google"></i>
                </a>
                <a href="#!" class="text-white">
                    <i class="fab fa-linkedin-in"></i>
                </a>
            </div>
        </div>
    )

}

export default Footer;