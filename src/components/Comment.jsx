import { Component } from 'react';
import { faker } from "@faker-js/faker";
import CommentContainer from './CommentContainer';

export default class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "comment",
      commentData: this.newComment(),
    }
  }

  newComment = () => {
    return Array.from({ length: 5 }).map(() => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      date: faker.date.weekday(),
      time: faker.date.recent().toLocaleTimeString(),
      text: faker.lorem.sentence(),
      // likes: faker.random.number({ min: 1, max: 100 }),
    }));
  }

  loadComment = () => {
    this.setState({ commentData: this.newComment() });
  }

  render() {
    return (
      <div className="ui comments">
        <h3 className="ui dividing header">{this.state.title}</h3>
        <button className="ui icon success left labeled button" onClick={this.loadComment}>
          <i aria-hidden="true" className="refresh icon"></i>Load New Comment
        </button>
        {this.state.commentData.map((data, index) => (
          <div className="comment" key={index}>
            <CommentContainer data={data} />
          </div>
        ))}
        <form className="ui reply form">
          <div className="field">
            <textarea rows="3"></textarea>
          </div>
          <button className="ui icon primary left labeled button">
            <i aria-hidden="true" className="edit icon"></i>Add Reply
          </button>
        </form>
      </div>
    );
  }
}
