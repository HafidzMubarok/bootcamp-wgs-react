import { useState } from "react";
import axios from "axios";
import InputForm from "./InputForm";

const Videos = () => {
    const [message] = useState("Videos");
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [error, setError] = useState(null);

    const fetchVideos = async (query) => {
        const API_KEY = process.env.REACT_APP_YOUTUBE_ACCESS_KEY; // Get API access key from .env
        const maxResults = 5;

        if (!query) {
            console.error("Query is empty.");
            return; // Exit if the query is empty
        }

        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${maxResults}&q=${encodeURIComponent(query)}&key=${API_KEY}`;

        try {
            const response = await axios.get(url);
            setVideos(response.data.items);
            setSelectedVideo(response.data.items[0]); // Set first video as selected by default
        } catch (error) {
            setError(<ErrorMessage error={error} />);
            setVideos([]); // Clear videos if there's an error
            console.error('Error fetching data from Youtube:', error);
        }
    };

    return (
        <div className="ui container">
            <div className="ui center aligned segment">
                <h1 className="ui header">{message}</h1>
            </div>
            <div className="ui right aligned segment">
                <div className="ui center aligned segment">
                    <SearchVideos fetchVideos={fetchVideos} />
                </div>
                <div className="ui two column grid">
                    <div className="ten wide column">
                        <IframeVideo video={selectedVideo} />
                    </div>
                    <div className="six wide column">
                        <VideoSearchList
                            videos={videos}
                            onVideoSelect={setSelectedVideo}
                        />
                    </div>
                </div>
                {error}
            </div>
        </div>
    );
};

const SearchVideos = ({ fetchVideos }) => {
    const [query, setQuery] = useState("");

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        fetchVideos(query);
        event.preventDefault(); // Prevent the default form submission
    };

    return (
        <form onSubmit={handleSubmit} style={{ paddingBottom: "8px" }}>
            <InputForm
                type={"text"}
                name={"query"}
                handleChange={handleChange}
                placeholder={"Search videos..."}
                isSearchInput={true}
            />
        </form>
    );
};

const VideoSearchList = ({ videos, onVideoSelect }) => {
    return (
        <>
            {videos.map((video) => (
                <button
                    className="ui button"
                    key={video.id.videoId}
                    style={{ paddingBottom: "16px", paddingTop: "16px" }}
                    onClick={() => onVideoSelect(video)}
                >
                    <div className="ui two column grid">
                        <div className="six wide column">
                            <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
                        </div>
                        <div className="ten wide column right aligned">
                            <div className="ui header">
                                <h4 style={{ margin: 0, padding: 0 }}>{video.snippet.title}</h4>
                            </div>
                        </div>
                    </div>
                </button>
            ))}
        </>
    );
};

const IframeVideo = ({ video }) => {
    if (!video) { // Ther is no video
        return null;
    }

    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;

    return (
        <div>
            <div className="ui embed">
                <iframe title={video.snippet.title} src={videoSrc} />
                <h4 className="ui header">{video.snippet.title}</h4>
                <p>{video.snippet.description}</p>
            </div>
            <div className="ui container left aligned" style={{ paddingTop: "8px" }}>
                <h4 className="ui header">{video.snippet.title}</h4>
                <p>{video.snippet.description}</p>
            </div>
        </div>
    );
};

const ErrorMessage = ({error}) => {
    return (
        <div className="ui center aligned segment" style={{ padding: "64px 0px" }}>
            <h2 className="ui header">
                <h1>{error.response?.data?.error?.code}</h1>
                <div className="content">
                    Error Fetching Videos
                    <div className="sub header">Something went wrong while fetching videos from YouTube.</div>
                </div>
            </h2>
            <p>Error Message: {error.message}</p>
            <p>Reason: {error.response?.data?.error?.errors[0]?.reason}</p>
            <p>Error Code: {error.code}</p>
        </div>
    );
}

export default Videos;


/* With Class */
// import { Component } from "react";
// import axios from 'axios';
// import InputForm from "./InputForm";

// class Videos extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             message: "Videos",
//             videos: [],
//             selectedVideo: null,
//             error: [],
//         }
//         this.onVideoSelect = this.onVideoSelect.bind(this);
//     }

//     // Fetch videos from Unsplash API based on the user's search query
//     fetchVideos = async (query) => {
//         const API_KEY = process.env.REACT_APP_YOUTUBE_ACCESS_KEY;
//         const maxResults = 5;

//         if (!query) {
//             console.error("Query is empty.");
//             return; // Exit if the query is empty
//         }

//         const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${maxResults}&q=${encodeURIComponent(query)}&key=${API_KEY}`;;
        
//         try {
//             const response = await axios.get(url);
            
//             this.setState({ videos: response.data.items }); // Store the fetched images in state
//         } catch (error) {
//             this.setState({
//                 error: (
//                     <div className="ui center aligned segment" style={{ padding: "64px 0px" }}>
//                         <h2 className="ui header">
//                             <h1>{error.response.data.error.code}</h1>
//                             <div className="content">
//                                 Error Fetching Videos
//                                 <div className="sub header">Something went wrong while fetching videos from YouTube.</div>
//                             </div>
//                         </h2>
//                         <p>Error Message: {error.message}</p>
//                         <p>Reason: {error.response?.data?.error?.errors[0]?.reason}</p>
//                         <p>Error Code: {error.code}</p>
//                     </div>
//                 ),
//                 videos: [], // Clear videos if there's an error
//             });
//             console.error('Error fetching data from Youtube:', error);
//         }
//     };

//     onVideoSelect(video) {
//         this.setState({ selectedVideo: video });
//     }

//     render() {
//         return (
//             <div className="ui container">
//                 <div className="ui center aligned segment">
//                     <h1 className="ui header">{this.state.message}</h1>
//                 </div>
//                 <div className="ui right aligned segment">
//                     <div className="ui center aligned segment">
//                         <SearchVideos fetchVideos={this.fetchVideos}/>
//                     </div>
//                     <div className="ui two column grid">
//                         <div className="ten wide column">
//                             <IframeVideo
//                                 video={this.state.selectedVideo ? this.state.selectedVideo : this.state.videos[0]}
//                             />
//                         </div>
//                         <div className="six wide column">
//                             <VideoSearchList
//                                 videos={this.state.videos}
//                                 onVideoSelect={this.onVideoSelect}
//                             />
//                         </div>
//                     </div>
//                     {this.state.error}
//                 </div>
//             </div>
//         );
//     }
// }

// class SearchVideos extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             query: "",
//         }
//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     // Update the query state when the input field changes
//     handleChange(event) {
//         this.setState({ query: event.target.value });
//     }

//     // Handle the form submission to fetch images from Unsplash
//     handleSubmit(event) {
//         this.props.fetchVideos(this.state.query);
//         event.preventDefault(); // Prevent the default form submission
//     }

//     render() {
//         return (
//             <form onSubmit={this.handleSubmit} style={{ paddingBottom: "8px" }}>
//                 <InputForm
//                     type={"text"}
//                     name={"query"}
//                     handleChange={this.handleChange}
//                 />
//                 <button type="submit" name="Submit" className="ui icon primary left labeled button" style={{ marginLeft: "8px" }}>
//                     <i aria-hidden="true" className="search icon"></i>Search
//                 </button>
//             </form>
//         );
//     }
// }

// class VideoSearchList extends Component {

//     render() {
//         return (
//             <>
//                 {/* Get videos */}
//                 {this.props.videos.map(video => (
//                 <button
//                     className="ui button"
//                     key={video.id.videoId}
//                     style={{ paddingBottom: "16px", paddingTop: "16px" }}
//                     onClick={() => this.props.onVideoSelect(video)}
//                 >
//                     <div className="ui two column grid">
//                         {console.log(video.snippet.thumbnails)}
//                         <div className="six wide column"><img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} /></div>
//                         <div className="ten wide column right aligned">
//                             <div className="ui header">
//                                 <h4 style={{ margin: 0, padding: 0, }}>{video.snippet.title}</h4>
//                             </div>
//                         </div>
//                     </div>
//                 </button>
//                 ))}
//             </>
//         );
//     }
// }

// class IframeVideo extends Component {
//     render() {
//         const { video } = this.props;

//         if (!video) {
//             return <></>;
//         }

//         const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
        
//         return (
//             <div>
//                 <div className="ui embed">
//                     <iframe title={video.snippet.title} src={videoSrc} />
//                     <h4 className="ui header">{video.snippet.title}</h4>
//                     <p>{video.snippet.description}</p>
//                 </div>
//                 <div className="ui container left aligned" style={{ paddingTop: "8px" }}>
//                     <h4 className="ui header">{video.snippet.title}</h4>
//                     <p>{video.snippet.description}</p>
//                 </div>
//             </div>
//         );
//     }
// }

// export default Videos;