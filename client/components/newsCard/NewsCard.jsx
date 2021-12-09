import React from 'react';
import {Link} from "react-router-dom";
import './NewsCard.css'

const NewsCard = ({props}) => {

    return (
        <div className="card">
            <div className="card-image waves-effect waves-block waves-light">
                <img className="activator" src={`${props.urlIMG}`} alt={`${props.title}`} />
            </div>
            <div className="card-content">
                        <span className="card-title activator grey-text text-darken-4">{props.title}<i
                            className="material-icons right">more_vert</i></span>
                <p><Link to={`/news/${props._id}`}>Перейти до новини</Link></p>
            </div>
            <div className="card-reveal">
                        <span className="card-title grey-text text-darken-4">{props.title}<i
                            className="material-icons right">close</i></span>
                <p className='description'>{props.description}</p>
            </div>
        </div>
    );
};

export default NewsCard;