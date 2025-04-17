import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Events.css';

const EventCarousel = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.post('https://akshay050702-chatbot.hf.space/get_events');
        setEvents(res.data.events || []);
        console.log(res.data.events);
      } catch (err) {
        console.error('Failed to fetch events:', err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="carousel-container">
      <h2>Upcoming Events 📅</h2>
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
        {events.map((event) => (
          <SwiperSlide key={event._id}>
            <div className="event-card">
              <h3>{event.name}</h3>
              <p><strong>Description:</strong> {event.description}</p>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Category:</strong> {event.category}</p>
              <p><strong>Available Slots:</strong> {event.available_slots}</p>
              <p><strong>Organizer:</strong> {event.organizer.name} ({event.organizer.contact})</p>
              <a
                href={event.registration_link}
                target="_blank"
                rel="noopener noreferrer"
                className="apply-btn"
              >
                Register Now
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default EventCarousel;
