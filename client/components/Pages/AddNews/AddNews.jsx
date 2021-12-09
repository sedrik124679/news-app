import React, {useState} from 'react';
import './AddNews.sass'
import MyInput from "../../UI/MyInput/MyInput";
import {useDispatch} from "react-redux";
import {addToNews} from "../../../actions/newsAction";

const AddNews = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [urlIMG, setUrlIMG] = useState('')

    const addNewsToDB = () => {

        addToNews(title, description, urlIMG)
        setTitle('')
        setDescription('')
        setUrlIMG('')
    }

    return (
        <div>
            <div className="container">
                <div className='add-form__container'>
                    <MyInput placeholder={'Title'} value={title} setValue={setTitle} type={'text'}/>
                    <MyInput placeholder={'Description'} value={description} setValue={setDescription} type={'text'}/>
                    <MyInput placeholder={'UrlIMG'} value={urlIMG} setValue={setUrlIMG} type={'text'}/>
                    <a className="btn-floating btn-large waves-effect waves-light red" onClick={() => addNewsToDB()} ><i className="material-icons">add</i></a>
                </div>
            </div>
        </div>
    );
};

export default AddNews;