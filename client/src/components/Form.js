import React, {Component} from 'react';
import axios from 'axios';
export default class Form extends Component {
    state = {
        fname: "",
        lname: "",
        desc: "",
        img_url: "",
    }

    handleChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    } 

    handleSubmit = event => {
        event.preventDefault();
        if (!this.state.fname || !this.state.lname) {return;}
        const getImageURL = this.state.img_url ? this.state.img_url : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
        axios.post('/api/insert', {
            fname: this.state.fname,
            lname: this.state.lname,
            desc: this.state.desc,
            img_url: getImageURL
        });
        this.setState({
            fname: "",
            lname: "",
            desc: "",
            img_url: "",
            isModalOpen: false
        });
    }

    render() {
        return (
            <div>
                <main>
                    <br/><br/>
                    <form className="create-form" onSubmit={this.handleSubmit}>
                        <input 
                            name="fname"
                            value={this.state.fname} 
                            placeholder="Enter first name"
                            onChange={this.handleChange} 
                        ></input><br/><br/>
                        <input 
                            name="lname"
                            value={this.state.lname}
                            placeholder="Enter last name"
                            onChange={this.handleChange} 
                        ></input><br/><br/><br/><br/>
                        <textarea 
                            name="desc"
                            value={this.state.desc}
                            placeholder="Type your description here..."
                            onChange={this.handleChange} 
                        ></textarea><br/><br/><br/>
                        <input
                            name="img_url"
                            value= {this.state.img_url} 
                            placeholder="Paste your image URL here"
                            onChange={this.handleChange} 
                        ></input><br/><br/>
                        <button type="submit" 
                            className="btn waves-effect green" 
                            style={{width: '100%', height: '50px', background: 'green', color: 'white'}}
                        >CREATE</button>
                    </form>
                </main>
            </div>
        );
    }
}