import React, { useState, useEffect } from 'react';
import './ImageGrid.css';
import Particless from '../../Common/Particles/Particless.js';

const ImageGrid = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = () => {
      const imageUrls = Array.from({ length: 10 }, () => {
        const width = 400;
        const height = 400;
        return `https://picsum.photos/${width}/${height}`;
      });
      setImages(imageUrls);
    };

    fetchImages();
  }, []);

  return (
    <>
      <div className="events-gallery-header">
        <h1>Kharagpur Data Science Hackathon</h1>
        <p>
          Our flagship event , where participants from India's top colleges will
          be applying their brilliant minds.{' '}
        </p>
      </div>

      <div className="image-grid">
        {images.map((url, index) => (
          <div key={index} className="image-grid-item">
            <img src={`images/gallery/KDSH/${index + 1}.jpg`} alt={`Random`} />
          </div>
        ))}

        <Particless />
      </div>
    </>
  );
};

export default ImageGrid;
