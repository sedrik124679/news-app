import React from 'react';
import {Link} from "react-router-dom";

const NewsFeedCard = ({props}) => {
    const date = props.date.split('T')

    return (
        <div className="news-card">
            <Link style={{'color': 'black'}} to={`/news/${props._id}`} className="news-card__descr">{props.description}</Link>
            <small className='dateOnHomeScreen'>{date[0]} | {date[1].split('.')[0]}</small>
            <hr/>
        </div>
    );
};

export default NewsFeedCard;