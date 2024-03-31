import { Product } from "@/lib/types";
import { Star } from "lucide-react";
import React from "react";

export interface IRating {
  rating: Product["rating"];
}

const Rating: React.FC<IRating> = ({ rating }) => {
  return (
    <div className="flex items-center my-2">
      {[...Array(rating.rate)].map((_, i) => (
        <Star key={i} className="w-5 h-5 text-yellow-500" />
      ))}
      {[...Array(5 - rating.rate)].map((_, i) => (
        <Star key={i} className="w-5 h-5 text-neutral-300" />
      ))}
      {rating.rate === 0 && (
        <span className="text-muted-foreground ml-2">No reviews</span>
      )}
      {rating.count > 0 && (
        <span className="ml-2 text-muted-foreground">
          ({rating.count})
        </span>
      )}
    </div>
  );
};

Rating.defaultProps = {};

export default Rating;
