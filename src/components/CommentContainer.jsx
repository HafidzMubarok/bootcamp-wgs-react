import { Component } from 'react';

export default class CommentContainer extends Component {
  render() {
      return (
        <>
            <a className="avatar">
              <img src={this.props.data.avatar} alt={`${this.props.data.name}'s avatar`} />
            </a>
            <div className="content">
              <a className="author">{this.props.data.name}</a>
              <div className="metadata">
                <span className="date">
                  {this.props.data.date} {this.props.data.time}
                </span>
              </div>
              <div className="text">{this.props.data.text}</div>
              <div className="actions"></div>
            </div>
        </>
    );
  }
}
