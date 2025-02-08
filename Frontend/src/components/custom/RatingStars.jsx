import { Star } from "lucide-react";

const RatingStars = ({ rating, setRating, size }) => {
  const getRatingColor = (rating) => {
    if (rating <= 2) return "fill-red-400";
    if (rating <= 4) return "fill-orange-300";
    return "fill-yellow-300";
  };

  return (
    <>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          onClick={() => {
            if (setRating) setRating(i + 1);
          }}
          className={`${size} cursor-pointer stroke-current ${
            i < rating ? getRatingColor(rating) : "fill-gray-300"
          }`}
        />
      ))}
    </>
  );
};

export default RatingStars;
