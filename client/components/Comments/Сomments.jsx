import React, {useState} from 'react';
import {addCommentToNews, getCommentFromSingleNews} from "../../actions/newsAction";
import {useDispatch} from "react-redux";

const Comments = ({id}) => {
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()

    const keyPressedHandler = (e) => {
        if(e.key === 'Enter'){
            if(comment !== '') {
                addCommentToNews(id, comment)
                dispatch(getCommentFromSingleNews(id))
                setComment('')
            } else {
                alert('Input can`t be empty')
            }
        }
    }

    return (
        <div className='single-news__comments'>
            <h5>Коментарі:</h5>

            <div className="row">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s6">
                            <i className="material-icons prefix">mode_edit</i>
                            <textarea id="icon_prefix2" value={comment} onKeyPress={e => keyPressedHandler(e)} onChange={e => setComment(e.target.value)} className="materialize-textarea" style={{'width': '600px'}}></textarea>
                            <label htmlFor="icon_prefix2">Залиште свій коментарій</label>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Comments;