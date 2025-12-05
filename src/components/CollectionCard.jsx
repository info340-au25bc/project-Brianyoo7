import React from 'react';
import { Link } from 'react-router';
import { useNavigate} from "react-router";

function CollectionCard(props) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/viewcollection/${props.id}`);
    }

    return (
        <div className="post" onClick={handleClick}>
            <div className="post-image-container">
                <img className="post-image" src={props.image} alt={props.alt} />
            </div>
            <p className="post-title">{props.title}</p>
            <button onClick={props.onEdit}>Edit</button>
        </div>
    );
}

export default CollectionCard;