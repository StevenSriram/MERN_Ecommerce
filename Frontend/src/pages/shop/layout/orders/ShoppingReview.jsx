import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RatingStars } from "@/components/custom";

import { useToast } from "@/hooks/use-toast";
import { addReview, getReviews } from "@/store/slices/reviewSlice";

const ReviewTile = ({ name, rating, comment }) => {
  return (
    <div className="flex gap-4">
      <Avatar className="w-10 h-10 border">
        <AvatarFallback className="font-mono text-lg">{name[0]}</AvatarFallback>
      </Avatar>
      <div className="grid gap-1">
        <div className="flex items-center gap-2">
          <h3 className="font-bold">{name}</h3>
        </div>
        <div className="flex items-center gap-0.5">
          <RatingStars rating={rating} size="h-4 w-4" />
        </div>
        <p className="text-sm text-justify text-muted-foreground">{comment}</p>
      </div>
    </div>
  );
};

const ShoppingReview = ({ productId, setOpenDetails }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { reviewList } = useSelector((state) => state.review);
  const { toast } = useToast();

  const [curRating, setCurRating] = useState(0);
  const [curReview, setCurReview] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!curRating || !curReview) {
      toast({
        title: "Add a Proper Review",
        variant: "destructive",
      });
      return;
    }

    dispatch(
      addReview({
        productId,
        userId: user?._id,
        userName: user?.name,
        ratingValue: curRating,
        reviewText: curReview,
      })
    ).then((data) => {
      if (data.payload?.success) {
        dispatch(getReviews(productId));
      }
      setOpenDetails(false);

      toast({
        title: data.payload?.message,
        variant: data?.payload?.success ? "default" : "destructive",
      });
    });

    setCurReview("");
    setCurRating(0);
  };

  return (
    <div className="max-h-[200px] mt-2 p-2 overflow-auto">
      <h2 className="text-xl font-bold mb-4">Reviews</h2>
      <div className="grid gap-6">
        {reviewList.length > 0 ? (
          reviewList.map((review, index) => (
            <ReviewTile
              key={index}
              name={review?.userName}
              rating={review?.ratingValue}
              comment={review?.reviewText}
            />
          ))
        ) : (
          <p className="text-md font-mono text-gray-800">
            No Reviews found yet ...
          </p>
        )}
      </div>
      <div className="mt-6">
        <div className="flex gap-2">
          <RatingStars
            rating={curRating}
            setRating={setCurRating}
            size="h-6 w-6"
          />
        </div>
        <div className="flex gap-2 mt-2">
          <Input
            type="text"
            value={curReview}
            onChange={(e) => setCurReview(e.target.value)}
            placeholder="Write a review..."
          />
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingReview;
