import React from 'react';
import './MyInput.sass'

const MyInput = (props) => {
    return (
        <input type={props.type} placeholder={props.placeholder} value={props.value}
                onChange={(event) => props.setValue(event.target.value)} required/>
    );
};

export default MyInput;