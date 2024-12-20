import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import style from "./SpotsCurrent.module.css";
import { getSpotsByUser, selectSpotsByUser } from "../../store/spot";
import SpotTileManage from "../SpotTileManage";

const UserExists = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const spots = useSelector(selectSpotsByUser(user));

  useEffect(() => {
    dispatch(getSpotsByUser(user));
  }, [dispatch, user]);

  return (
    <section className={style.spots}>
      <header>
        <h2>Manage Spots</h2>
      </header>
      {spots.length ? (
        spots.map((spot) => (
          <SpotTileManage key={spot.id} spot={spot} />
        ))
      ) : (
        <Link className={style.link} to="/spots/new">
          Create a New Spot
        </Link>
      )}
    </section>
  );
};

const SpotsCurrent = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);
  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  if (!user) return <h2>going home</h2>;

  return <UserExists />;
};
export default SpotsCurrent;
