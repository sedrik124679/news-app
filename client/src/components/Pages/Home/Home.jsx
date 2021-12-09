import React, {useEffect} from 'react';
import './Home.css'
import NewsFeedCard from "../../newsFeedCard/NewsFeedCard";
import {useDispatch, useSelector} from "react-redux";
import {getNewsFromState} from "../../../actions/newsAction";

const Home = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getNewsFromState())
    }, [])

    const news = useSelector(state => state.news.news)

    return (
        <div className='home-container'>
            <iframe className='mainVideo' src="https://www.youtube.com/embed/C--VG46HN04" title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen></iframe>
            <div className="news-feed">
                <div className="news-feed__title">News feed</div>
                {news.map(news => {
                    return <NewsFeedCard key={news._id} props={news} />
                })}
            </div>
        </div>
    );
};

export default Home;