import { Component } from "react";
import axios from "axios";
import InputForm from "./InputForm";

export default class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: {},
            image: {},
            query: "",
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ query: event.target.value });
    }

    handleSubmit(event) {
        this.fetchImagesFromUnsplash(this.state.query);
        event.preventDefault();
    }
    
    fetchImagesFromUnsplash = async (query) => {
        const UNSPLASH_ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
        
        const url = `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${UNSPLASH_ACCESS_KEY}`;
        
        try {
            const response = await axios.get(url);
            console.log(response.data);
            this.setState({ response: response.data });
        } catch (error) {
            console.error('Error fetching data from Unsplash:', error);
        }
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <InputForm
                    label={"Search Image"}
                    type={"text"}
                    name={"query"}
                    handleChange={this.handleChange}
                />
                <button type="submit" name="Submit" className="ui icon primary left labeled button" style={{ marginTop: "16px" }}>
                    <i aria-hidden="true" className="search icon"></i>Search
                </button>
            </form>
        );
    }
}