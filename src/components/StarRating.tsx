
const StarRating = ({ rating, totalReviews }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, index) => (
          <FullStar key={`full-${index}`} />
        ))}
        {hasHalfStar && <HalfStar key="half" />}
        {[...Array(emptyStars)].map((_, index) => (
          <EmptyStar key={`empty-${index}`} />
        ))}
      </div>
      <span className="ml-2">{`${rating} (${totalReviews} reviews)`}</span>
    </div>
  );
};

const FullStar = () => (
  <span className="star" style={{ fontSize: '24px', color: 'black', WebkitTextStroke: '1px black' }}>&#9733;</span>
);

const HalfStar = () => (
  <svg className="star-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="24" height="24">
    <defs>
      <linearGradient id="half-fill">
        <stop offset="50%" stop-color="black" />
        <stop offset="50%" stop-color="transparent" stop-opacity="1" />
      </linearGradient>
    </defs>
    <path fill="url(#half-fill)" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
  </svg>
);

const EmptyStar = () => (
  <span className="star" style={{ fontSize: '24px', color: 'black', WebkitTextStroke: '1px black' }}>&#9734;</span>
);


export default StarRating;
