import React from 'react';

const Comment = ({props}) => {

    return (
        <div className="comment">
            <small>{props.userName}</small>
            <p>{props.comment}</p>
            <small>{props.date.split('T')[0]} | {props.date.split('T')[1].split('.')[0]}</small>
        </div>
    );
};

export default Comment;