import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCommentFromSingleNews, getNewsFromState, getSingleNewsFromState} from "../../../actions/newsAction";
import './SingleNews.sass'
import NewsFeedCard from "../../newsFeedCard/NewsFeedCard";
import Loader from "../../UI/Loader/Loader";
import Comments from "../../Comments/Сomments";
import Comment from "../../Comments/Comment/Comment";

const SingleNews = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    const id = useParams().id
    const isLoading = useSelector(state => state.news.isLoading)

    useEffect(() => {
        dispatch(getSingleNewsFromState(id))
        dispatch(getCommentFromSingleNews(id))
    }, [id])
    useEffect(() => {
        dispatch(getNewsFromState())
    }, [])

    const singleNews = useSelector(state => state.news.singleNews)
    const news = useSelector(state => state.news.news)
    const comments = useSelector(state => state.news.singleNewsComments)
    console.log(comments)

    const {title, description, urlIMG, date} = singleNews

    if(isLoading) {
        return <Loader />
    }

    return (
        <div className='container single-news'>
            <div className="single-news__container">
                <h4 className='single-news__title'>{title}</h4>
                <small className="single-news__date">{date && <>{date.split('T')[0]} | {date.split('T')[1].split('.')[0]}</>}</small>
                <hr/>
                <div className="single-news__img">
                    <img src={`${urlIMG}`} alt="singlepagenews"/>
                </div>
                <hr/>
                <div className='single-news__descr'>{description}</div>
                {isAuth
                    ? <Comments id={id} />
                    : <h6 style={{'width': '400px'}}>Увійдіть в аккаунт щоб залишати коментарі</h6>
                }
                <div className="other-comments">
                    {comments.length !== 0
                        ? comments.map(comment => {
                            return <Comment key={comment.id} props={comment} />
                        })
                        : <h6>Коментарів немає</h6>
                    }
                </div>
            </div>
            <div className="single-page__feed">
                <h4>Читайте також</h4>
                {news.map(news => {
                    return <NewsFeedCard key={news._id} props={news} />
                })}
            </div>
        </div>
    );
};

export default SingleNews;