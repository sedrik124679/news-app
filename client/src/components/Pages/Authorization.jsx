import React, {useState} from 'react';
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import './Authorization.sass'
import {Link} from "react-router-dom";
import MyInput from "../UI/MyInput/MyInput";
import 'react-tabs/style/react-tabs.css';
import {useDispatch} from "react-redux";
import {login, registration} from "../../actions/userAction";

const Authorization = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    return (
        <Tabs className='authorization'>
            <TabList className='authorization__titles'>
                <Tab>Login</Tab>
                <Tab>Register</Tab>
            </TabList>
            <TabPanel>
                <div className='authorization__header'>Login</div>
                <MyInput value={email} setValue={setEmail} type='email' placeholder='Enter a login'/>
                <MyInput value={password} setValue={setPassword} type='password' placeholder='Enter a password'/>
                <button className='authorization__btn' onClick={() => dispatch(login(email, password))}>Login</button>
            </TabPanel>
            <TabPanel>
                <div>
                    <div className='authorization__header'>Registration</div>
                    <MyInput value={email} setValue={setEmail} type='email' placeholder='Enter a login'/>
                    <MyInput value={password} setValue={setPassword} type='password' placeholder='Enter a password'/>
                    <button className='authorization__btn' onClick={() => registration(email, password)}>Register</button>
                </div>
            </TabPanel>
        </Tabs>
    );
};

export default Authorization;