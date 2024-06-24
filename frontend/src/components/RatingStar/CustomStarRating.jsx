import { Rating, RoundedStar } from '@smastrom/react-rating'
import './CustomStarRating.css'

import '@smastrom/react-rating/style.css'
function CustomStarRating({rating}) {
    const customStyles = {
        itemShapes: RoundedStar,
        activeFillColor: '#ffff',
      };
    return (
      <Rating
        style={{ maxWidth: 105 }}
        value={rating}
        readOnly
        itemStyles={customStyles}
      />
    );
  }

  export default CustomStarRating