import './App.css';
import {Route, Routes, Navigate} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Authorization from "./components/Pages/Authorization";
import Home from "./components/Pages/Home/Home";
import News from "./components/Pages/News/News";
import AddNews from "./components/Pages/AddNews/AddNews";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {auth} from "./actions/userAction";
import SingleNews from "./components/Pages/SingleNews/SingleNews";

function App() {

    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.user.isAuth)
    const user = useSelector(state => state.user.currentUser)
    const role = useSelector(state => state.user.currentUser.role)


    useEffect(() => {
        dispatch(auth())
    }, [])

    return (
        <div className="App">
            <Navbar/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                {!isAuth
                    ? <Route path='/authorization' element={<Authorization/>}/>
                    : null
                }
                <Route path='/news' element={<News/>}/>
                {role === 'Admin'
                    ? <Route path='/add' element={<AddNews/>}/>
                    : null
                }
                <Route path='/news/:id' element={<SingleNews />}/>
                <Route path='/*' element={<Navigate to={'/'} />} />
            </Routes>
        </div>
    );
}

export default App;
