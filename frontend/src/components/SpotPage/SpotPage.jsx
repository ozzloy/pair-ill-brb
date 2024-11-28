import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpot, selectSpot } from "../../store/spot";
import { useEffect } from "react";
import { FaMagnifyingGlassMinus } from "react-icons/fa6";

import style from "./SpotPage.module.css";

/**
 * On the spot's detail page, the following information should be
 * present: a Heading <spot name>, Location: <city>, <state>,
 * <country>, Images (1 large image and 4 small images), Text: Hosted
 * by <first name>, <last name>, Paragraph: <description>, and the
 * callout information box on the right, below the images.
 */

/**
 *  {
 *    "id": 1,
 *    "ownerId": 1,
 *    "address": "123 Disney Lane",
 *    "city": "San Francisco",
 *    "state": "California",
 *    "country": "United States of America",
 *    "lat": 37.7645358,
 *    "lng": -122.4730327,
 *    "name": "App Academy",
 *    "description": "Place where web developers are created",
 *    "price": 123,
 *    "createdAt": "2021-11-19 20:39:36",
 *    "updatedAt": "2021-11-19 20:39:36" ,
 *    "numReviews": 5,
 *    "avgStarRating": 4.5,
 *    "SpotImages": [
 *      {
 *        "id": 1,
 *        "url": "image url",
 *        "preview": true
 *      },
 *      {
 *        "id": 2,
 *        "url": "image url",
 *        "preview": false
 *      }
 *    ],
 *    "Owner": {
 *      "id": 1,
 *      "firstName": "John",
 *      "lastName": "Smith"
 *    }
 *  }
 */

const SpotExists = ({
  name,
  city,
  state,
  country,
  description,
  SpotImages,
  Owner: { firstName, lastName },
  price,
}) => {
  const previewImage = SpotImages.find((image) => image.preview);
  const images = SpotImages.filter((image) => !image.preview);

  return (
    <>
      <h2 className={style.header}>{name}</h2>
      <div className={style.location}>
        <span className={style.label}>location:</span>
        <span className={style.detail}>
          {city}, {state}, {country}
        </span>
      </div>
      <div className={style.hosted}>
        <span className={style.label}>hosted by:</span>
        <span className={style.detail}>
          {firstName} {lastName}
        </span>
      </div>
      {previewImage ? (
        <img className={style.preview} src={previewImage.url} />
      ) : (
        <span className={style.loading} style={{ fontSize: "400px" }}>
          <FaMagnifyingGlassMinus />
        </span>
      )}
      {images.map(({ url }) => (
        <img key={url} className={style.images} src={url} />
      ))}
      <div className={style.details}>
        <p className={style.description}>{description}</p>
        <div className={style.callout}>
          <span className={style.price}>{price} / night</span>
          <button onClick={() => alert("Feature coming soon")}>
            reserve
          </button>
        </div>
      </div>
    </>
  );
};

const SpotPage = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector(selectSpot(spotId));

  useEffect(() => {
    dispatch(getSpot(spotId));
  }, [dispatch]);

  const requiredKeys = [
    "name",
    "price",
    "city",
    "state",
    "country",
    "description",
    "SpotImages",
    "Owner",
  ];
  const spotHasRequiredKeys =
    spot && requiredKeys.every((key) => key in spot);
  if (!spotHasRequiredKeys) return <h2>loading spot details...</h2>;
  return SpotExists(spot);
};
export default SpotPage;
