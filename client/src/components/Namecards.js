import React, { useState, useEffect } from 'react';
import Modal from "react-modal";
import Namecard from './Namecard.js';
import {FaTimes} from 'react-icons/fa';
import Filter from './Filter.js';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import set_CardList from './actions/index.js';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    width                 : '50%',
    height                 : '50%',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement(document.getElementById('root'))

export default function Namecards() {
  const [id, setID] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [desc, setDesc] = useState("");
  const [url, setURL] = useState("");
  const [modal, setModal] = useState(false);
  
  const dispatch = useDispatch();
  const CardList = useSelector(state => state.CardList);

  useEffect(() => {
    if (localStorage.getItem("isLogged")) {
      axios.get('/api/namecards').then((response) => {
        dispatch(set_CardList(response.data));
      });
    }
  }, []);

  const onDelete = (id) => {
    dispatch(set_CardList(CardList.filter((card) => card.id !== id)));
    axios.delete(`/api/delete/${id}`);
  }

  const openModal = (card) => {
    setID(card.id);
    setFname(card.first_name);
    setLname(card.last_name);
    setDesc(card.description);
    setURL(card.image_url);
    setModal(true);
  }

  const handleEdit = event => {
    event.preventDefault();
    axios.put('/api/update', {
      id: id,
      fname: fname,
      lname: lname,
      desc: desc,
      img_url: url
    });
    dispatch(set_CardList(
      CardList.map((card) => (card.id === id) ? 
        {...card, 
          first_name: fname,
          last_name: lname,
          description: desc,
          image_url: url
        }
        : card))
    );
    closeModal();
  }

  const closeModal = () => {
    setID("");
    setFname("");
    setLname("");
    setDesc("");
    setURL("");
    setModal(false);
  }

  const handleChange = event => {
    if (event.target.name == "fname") {
      setFname(event.target.value);
    }
    else if (event.target.name == "lname") {
      setLname(event.target.value);
    }
    else if (event.target.name == "desc") {
      setDesc(event.target.value);
    }
    else {
      setURL(event.target.value);
    }
  }

  const sortByName = () => {
    let detail = CardList;
    detail.sort(function(a,b){
      if (a.first_name < b.first_name) {
        return -1;
      }
      if (a.first_name > b.first_name) {
        return 1
      }
      return 0;
    });
    dispatch(set_CardList([]));
    dispatch(set_CardList(detail));
    console.log(CardList);
  }

  const searchByName = (name) => {
    let array = name.split(" ");
    let fname = "";
    let lname = "";
    if (array.length >= 2) {
      fname = array[0];
      lname = array[1];
      dispatch(set_CardList(CardList.filter((card) => (card.first_name === fname && card.last_name === lname))));
    }
    else {
      fname = array[0];
      lname = array[0];
      dispatch(set_CardList(CardList.filter((card) => (card.first_name === fname || card.last_name === fname))));
    }  
  }

  return (
    <div className="page-container">
      <div className='filter-container'>
        <Filter sortByName={sortByName} searchByName={searchByName}/>
      </div>
      <div className="namecards-container">
        {CardList.length > 0 ? (CardList.map(card => 
          <Namecard card={card} key={card.id} onDelete={onDelete} onEdit={openModal}/>)) 
          : <div 
              style={{fontSize: '32px', fontWeight: 'bold', textAlign: 'center', marginTop: '100px'}}
            > {localStorage.getItem('isLogged') ? 'No namecards to display here' : 'Log in to view your cards'}
            </div>
        }
      </div>
      <Modal
        isOpen={modal}
        style={customStyles}
      >
        <button onClick={closeModal} className="close-button" style={{margin: '0 0 25px 0'}}>
          <FaTimes style={{color: "white", background: "red"}}/>
        </button>
        <form onSubmit={handleEdit} className="editForm">
          <input 
            name="fname" 
            value={fname}
            onChange={handleChange}
            placeholder="Enter new first name"
          />
          <br/><br/>
          <input 
            name="lname" 
            value={lname}
            onChange={handleChange}
            placeholder="Enter new last name"
          /> 
          <br/><br/>
          <textarea 
            name="desc" 
            value={desc}
            onChange={handleChange}
            placeholder="Type your description here..."
          />
          <br/><br/>
          <input 
            name="url" 
            value={url}
            onChange={handleChange}
            placeholder="Paste your image URL here"
          /> 
          <br/><br/>
            <button type="submit" 
              className="btn waves-effect green" 
          >SUBMIT</button> 
        </form>
      </Modal>
    </div>
  );
}
