import { Component } from "react";
import axios from "axios";
import InputForm from "./InputForm";
import "./style/gallery.css"

export default class SearchImages extends Component {
    constructor(props) {
        super(props);
        // Initialize state to store image data, image heights, query, and loading status
        this.state = {
            imageHeights: {}, // Store the heights of images after they are loaded
            images: [], // Store the fetched images from Unsplash
            imageLoaded: false, // Track if all images are loaded
            query: "", // Store the user's search query
            imagesLoadedCount: 0, // Count how many images have loaded
        };

        // Bind methods to `this` context
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.imageRefs = {}; // Object to store references to image elements
    }

    // Update the query state when the input field changes
    handleChange(event) {
        this.setState({ query: event.target.value });
    }

    // Handle the form submission to fetch images from Unsplash
    handleSubmit(event) {
        this.setState({ 
            imageLoaded: false, 
            imageHeights: {}, 
            imagesLoadedCount: 0 
        }, () => {
            this.fetchImagesFromUnsplash(this.state.query);
        });
        event.preventDefault(); // Prevent the default form submission
    }

    // Store a reference to the image element by its ID
    setImageRef = (id, element) => {
        this.imageRefs[id] = element;
    }

    // Lifecycle method to detect when component updates
    componentDidUpdate(prevProps, prevState) {
        // Reset image references if the images state has changed
        if (prevState.images !== this.state.images) {
            this.imageRefs = {};
        }

        // Check if all images have loaded, then calculate their heights
        if (prevState.imagesLoadedCount !== this.state.imagesLoadedCount &&
            this.state.imagesLoadedCount === this.state.images.length) {
            this.setState({ imageLoaded: true }, this.calculateHeights);
        }
    }

    // Calculate the heights of all loaded images and store them in state
    calculateHeights() {
        const newHeights = {};
        Object.keys(this.imageRefs).forEach(id => {
            const height = this.imageRefs[id].getBoundingClientRect().height;
            newHeights[id] = height; // Store the height of each image
        });

        this.setState({ imageHeights: newHeights });
    }

    // Calculate the row span for the CSS grid based on the image height
    calculateRowSpan = (height) => {
        const rowHeight = 10; // Define the height of each row in the grid
        return Math.ceil(height / rowHeight); // Calculate the row span needed
    }

    // Fetch images from Unsplash API based on the user's search query
    fetchImagesFromUnsplash = async (query) => {
        const UNSPLASH_ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

        if (!query) {
            console.error("Query is empty.");
            return; // Exit if the query is empty
        }

        const url = `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${UNSPLASH_ACCESS_KEY}`;

        try {
            const response = await axios.get(url);
            this.setState({ images: response.data.results }); // Store the fetched images in state
        } catch (error) {
            console.error('Error fetching data from Unsplash:', error);
        }
    };

    // Render the search form and image gallery
    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <InputForm
                        label={"Search Image"}
                        type={"text"}
                        name={"query"}
                        handleChange={this.handleChange}
                    />
                    <button type="submit" name="Submit" className="ui icon primary left labeled button" style={{ marginLeft: "8px" }}>
                        <i aria-hidden="true" className="search icon"></i>Search
                    </button>
                </form>
                <div className="gallery-grid" style={{ paddingTop: "32px" }}>
                    {this.state.images.map(image => (
                        <div
                            key={image.id}
                            className="gallery-item"
                            style={{ gridRowEnd: `span ${this.calculateRowSpan(this.state.imageHeights[image.id] || 0)}` }}
                        >
                            <img
                                src={image.urls.thumb}
                                alt={image.description}
                                ref={(el) => this.setImageRef(image.id, el)} // Store a reference to each image
                                onLoad={() => this.setState(prevState => ({
                                    imagesLoadedCount: prevState.imagesLoadedCount + 1 // Increment count when an image loads
                                }))}
                            />
                        </div>
                    ))}
                </div>
            </>
        );
    }
}