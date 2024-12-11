export default function GetAvgRating(ratingArr) {
    console.log("rating array",ratingArr);
    if (!ratingArr || ratingArr.length === 0) return 0;
    const totalReviewCount = ratingArr?.reduce((acc, curr) => {
      if (curr.rating !== undefined && !isNaN(curr.rating)) {
        acc += parseFloat(curr.rating);
      }
      return acc
    }, 0)
  
    const multiplier = Math.pow(10, 1)
    const avgReviewCount =
      Math.round((totalReviewCount / ratingArr?.length) * multiplier) / multiplier
      console.log("RATING IS .....",avgReviewCount);
  
    return avgReviewCount
  }