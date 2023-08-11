"use strict";
addReview(req, Request, res, Response, next, NextFunction);
{
    try {
        var _a = req.body, message = _a.message, rating = _a.rating, foodId = _a.foodId;
        if (!req.user) {
            next(new AppError("Login to access this resource", 404));
            return;
        }
        // * Create or push review
        var foodReview = await pushReview({
            message: message,
            rating: parseInt(rating),
            user: req.user._id,
            verified: true,
            create: new Date(),
            update: new Date(),
        }, foodId);
        if (!foodReview)
            return next(new AppError('Something went worng', 500));
        var totalRating = foodReview.reviews.reduce(function (sum, review) { return sum + review.rating; }, 0);
        var totalNumberOfRating = foodReview.reviews.length;
        var foodRating = totalRating / totalNumberOfRating;
        var foodQuery = Food.findByIdAndUpdate(foodId, {
            $push: { reviews: foodReview._id },
            $inc: { totalNumberOfRating: 1 },
            $set: { rating: foodRating },
        }, { new: true });
        var userquery = User.findByIdAndUpdate({ _id: req.user._id }, { $push: { reviews: foodReview._id } } // Push the new review into the reviews array
        );
        var _b = await Promise.all([userquery, foodQuery]), user = _b[0], food = _b[1];
        res.status(200).json({
            success: true,
            reviews: foodReview,
        });
    }
    catch (error) {
        next(new AppError("Something went wrong, try again later", 500));
    }
}
//# sourceMappingURL=temp.js.map