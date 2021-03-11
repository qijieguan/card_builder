import React, { useState } from 'react';
const Filter = ({ sortByName, searchByName }) => {
    const [inputName, setInputName] = useState('');
    const handleChange = event => {
        setInputName(event.target.value);
    }
    return (
        <div>
            <input className="search-bar" 
                value={inputName} 
                placeholder="Enter name of user here" 
                onChange={handleChange}
            />
            <button style={{height: '30px', marginTop: '50px'}} onClick={()=>searchByName(inputName)}>SEARCH</button>
            <button className="alphabetized" onClick={()=>sortByName()}>Alphabetized</button>
        </div>
    );
}

export default Filter;