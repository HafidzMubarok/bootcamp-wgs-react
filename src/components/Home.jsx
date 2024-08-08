import { Component } from "react";
import Count from "./Count";
import SearchImages from "./SearchImages"

export default class Home extends Component {
    // const title = "Home";
    constructor(props) {
        super(props)
        this.state = {
            message: "Welcome to ReactJS experiment!",
            counterName: "Likes",
            min: <i className="thumbs down icon"></i>,
            plus: <i className="thumbs up icon"></i>,
        }
    }

    render() {
        return (
            <>
                <div className="ui container">
                    <div className="ui center aligned segment">
                        <h1 className="ui header">{this.state.message}</h1>
                    </div>
                    <div className="ui centered cards" style={{ paddingTop: "64px" }}>
                        <div className="ui card">
                            <div className="content">
                                <div className="center aligned header">
                                    <i className="heart icon"></i>
                                    Likes
                                </div>
                                <div className="center aligned description" style={{ paddingTop: "16px" }}>
                                    <Count
                                        counterName={this.state.counterName}
                                        min={this.state.min}
                                        plus={this.state.plus}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ui centered cards" style={{ paddingTop: "32px" }}>
                        <div className="ui card">
                            <div className="content">
                                <div className="center aligned header">
                                    <i className="search icon"></i>
                                    Search Images From Unsplash
                                </div>
                                <div className="center aligned description" style={{ paddingTop: "16px" }}>
                                    <SearchImages />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}