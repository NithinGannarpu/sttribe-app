import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './InternshipCarousel.css';

const InternshipCarousel = () => {
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post('https://akshay050702-chatbot.hf.space/get_internships');
        setInternships(res.data.internships);
      } catch (err) {
        console.error('Failed to fetch internships:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="carousel-container">
      <h2>Explore Internships 🔍</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        // pagination={{ clickable: true }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {internships.map((intern) => (
          <SwiperSlide key={intern._id}>
            <div className="internship-card">
              <h3>{intern.role}</h3>
              <p><strong>Company:</strong> {intern.company}</p>
              <p><strong>Location:</strong> {intern.location}</p>
              <p><strong>Stipend:</strong> {intern.stipend}</p>
              <p><strong>Duration:</strong> {intern.duration}</p>
              <p><strong>Requirements:</strong></p>
              <ul className="no-bullets">
                {intern.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
              <a href={intern.apply_link} target="_blank" rel="noopener noreferrer" className="apply-btn">
                Apply Now
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default InternshipCarousel;
