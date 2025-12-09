import React from "react";
import { Link, useNavigate } from "react-router";
import { getDatabase, ref, remove } from "firebase/database";

function CollectionCard(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/viewcollection/${props.id}`);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    const db = getDatabase();
    const collectionRef = ref(db, "collections/" + props.id);
    try {
      await remove(collectionRef);
      console.log("Collection deleted:", props.id);
    } catch (err) {
      console.error("Error deleting collection:", err);
    }
  };

  return (
    <div className="collection-post" onClick={handleClick}>
      <div className="post-image-container">
        <img className="post-image" src={props.image} alt={props.alt} />
      </div>
      <p className="post-title">{props.title}</p>
      <div className="card-actions">
        <Link to={`/editcollection/${props.id}`}>
          <button className="collections-edit">Edit</button>
        </Link>
        <button onClick={handleDelete} className="collections-edit">
          Delete
        </button>
      </div>
    </div>
  );
}

export default CollectionCard;
