import { Component } from "react";
import SearchImages from "./SearchImages";

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "Gallery",
        }
    }

    render() {
        return (
            <div className="ui container">
                <div className="ui center aligned segment">
                    <h1 className="ui header">{this.state.message}</h1>
                </div>
                <SearchImages />
            </div>
        );
    }
}

export default Gallery;