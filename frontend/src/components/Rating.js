import React from 'react';

const Rating = ({ value, text, color }) => {
  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((n) => {
        return (
          <span key={n}>
            <i
              style={{ color: color }}
              className={
                value >= n
                  ? 'fas fa-star'
                  : value >= n - 0.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }
            ></i>
          </span>
        );
      })}
      <span>{text && text}</span>
    </div>
  );
};

Rating.defaultProps = { color: 'orange' };

export default Rating;
