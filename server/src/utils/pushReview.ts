import { HydratedDocument } from 'mongoose'
import Review, { IReviewModel, IReview } from '../models/reviews.model'

// Function to push a new review into the reviews array
export const pushReview = (
  reviewData: IReview,
  restaurantId: string
): Promise<HydratedDocument<IReviewModel> | null> => {
  return new Promise(async (resolve, reject) => {
    try {
      const review = await Review.findOneAndUpdate(
        { restaurant: restaurantId },
        { $push: { reviews: reviewData } }, // Push the new review into the reviews array
        { new: true } // Return the updated document
      )

      if (!review) {
        const newReview = new Review({
          restaurant: restaurantId,
          reviews: [reviewData],
        })
        const savedReview = await newReview.save()
        resolve(savedReview as HydratedDocument<IReviewModel>)
      } else {
        resolve(review as HydratedDocument<IReviewModel>)
      }
      console.log(review, 'review')
    } catch (error) {
      console.error('Error adding review:', error)
      reject(error)
    }
  })
}
