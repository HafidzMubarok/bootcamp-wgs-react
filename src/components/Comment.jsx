import { faker } from "@faker-js/faker";

export default function Comment() {
  const title = "Comment";
  // Buat array data untuk feed
  const commentData = Array.from({ length: 10 }).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    date: faker.date.weekday(),
    time: faker.date.recent().toLocaleTimeString(),
    text: faker.lorem.sentence(),
    // likes: faker.random.number({ min: 1, max: 100 }),
  }));

  return (
    <div className="ui comments">
      <h3 class="ui dividing header">Comments</h3>
      {commentData.map((data, index) => (
        <div className="comment" key={index}>
          <a className="avatar">
            <img src={data.avatar} alt={`${data.name}'s avatar`} />
          </a>
          <div className="content">
            <a className="author">{data.name}</a>
            <div className="metadata">
              <span className="date">
                {data.date} {data.time}
              </span>
            </div>
            <div className="text">{data.text}</div>
            <div className="actions"></div>
          </div>
        </div>
      ))}
      <form class="ui reply form">
        <div class="field">
          <textarea rows="3"></textarea>
        </div>
        <button class="ui icon primary left labeled button">
          <i aria-hidden="true" class="edit icon"></i>Add Reply
        </button>
      </form>
    </div>
  );
}
