import React from 'react';

const Animation = ({ weatherCondition }) => {
  // Map weather conditions to video files
  const getVideoSource = (condition) => {
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('cloud') || conditionLower.includes('overcast')) {
      return '/animations/clouds.mp4';
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return '/animations/rainy.mp4';
    } else if (conditionLower.includes('snow') || conditionLower.includes('blizzard')) {
      return '/animations/snow.mp4';
    } else if (conditionLower.includes('thunder') || conditionLower.includes('storm')) {
      return '/animations/thunder.mp4';
    } else if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
      return '/animations/sunny.mp4';
    } else {
      // Default to clouds for unknown conditions
      return '/animations/clouds.mp4';
    }
  };

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      onError={(e) => {
        console.log('Video failed to load:', e.target.src);
        // Fallback to a default video or hide the element
        e.target.style.display = 'none';
      }}
      style={{
        width: '120px',
        height: '120px',
        objectFit: 'cover',
        borderRadius: '50%',
        marginBottom: '10px',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
        border: '3px solid rgba(255, 255, 255, 0.3)',
      }}
    >
      <source src={getVideoSource(weatherCondition)} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default Animation;
