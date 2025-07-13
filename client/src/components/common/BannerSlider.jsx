import React from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const images = [
  {
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    alt: "Super Grocery Offers!",
    caption: "Super Grocery Offers!"
  },
  {
    src: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=800&q=80",
    alt: "Hot Restaurant Deals!",
    caption: "Hot Restaurant Deals!"
  },
  {
    src: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
    alt: "Try Clothes at Home!",
    caption: "Try Clothes at Home!"
  },
];

export default function BannerSlider() {
  return (
    <div className="w-full mt-8 px-0">
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        interval={3500}
        className="rounded-2xl shadow-lg"
      >
        {images.map((img, idx) => (
          <div key={idx} className="relative w-full h-64 md:h-96">
            <img
              src={img.src}
              alt={img.alt}
              className="object-cover w-full h-64 md:h-96 rounded-2xl"
              draggable={false}
            />
            <div className="absolute bottom-6 left-6 bg-black/50 text-white px-6 py-3 rounded-lg text-xl md:text-3xl font-bold shadow">
              {img.caption}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
} 