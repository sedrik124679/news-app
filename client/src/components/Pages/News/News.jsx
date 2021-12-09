import React, {useEffect} from 'react';
import './News.sass'
import NewsCard from "../../newsCard/NewsCard";
import {useDispatch, useSelector} from "react-redux";
import {getNewsFromState} from "../../../actions/newsAction";
import Loader from "../../UI/Loader/Loader";

const News = () => {

    const dispatch = useDispatch()
    const news = useSelector(state => state.news.news)
    const isLoading = useSelector(state => state.news.isLoading)
    console.log(news)
    useEffect(() => {
        dispatch(getNewsFromState())
    }, [])

    if(isLoading) {
        return <Loader />
    }

    return (
        <div className='news-container'>
            {news.length === 0
                ? <h3 style={{'textAlign': 'center'}}>Новин немає</h3>
                : <>
                    <h3 style={{'textAlign': 'center'}}>Новини за останні дні</h3>
                    <div className="container container-cards">
                        {news.map(news => {
                            return <NewsCard key={news._id} props={news} />
                        })}
                    </div>
                </>
            }
        </div>
    );
};

export default News;