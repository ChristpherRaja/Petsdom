import React from 'react'
import Carousel1 from '../assets/Carousel1.jpg'
import Carousel2 from '../assets/Carousel2.jpg'
import Carousel3 from '../assets/Carousel3.jpg'

const Carousel = () => {
    return (
        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={Carousel1} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src={Carousel2} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src={Carousel3} className="d-block w-100" alt="..." />
                </div>
            </div>
            <button className="carousel-control-prev z-0" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next z-0" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}

export default Carousel