import React, { useState } from "react";
import { useSelector } from "react-redux";
import CommentAction from "./CommentAction";
import CommentForm from "./CommentForm";
import dayjs from "dayjs";

function CommentItem({ data }) {
  const dataChildComment = useSelector(
    (state) => state.COMMENT.dataChildComment
  );

  console.log("dataChildComment: ", dataChildComment);

  const currentDataChildComment = dataChildComment[data.id];

  const { list, currentPage, total } = currentDataChildComment || {
    list: [],
    currentPage: 0,
    total: data.comment_reply_count,
  };

  const restTotal = total - list.length;

  // DayJS
  let Date = data.date;

  if (typeof date === "string") {
    Date = data.date.slice(0, 11);
  } else {
    Date = data.date;
  }
  var relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);

  Date = dayjs(Date).fromNow();

  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(!showForm)
  }

  if (!data) {
    return <></>;
  }

  return (
    <>
      <li className="item">
        <div className="comments__section">
          <div className="comments__section--avatar">
            <a href="/">
              <img src={data.author_avatar_urls[48]} alt="" />
            </a>
          </div>
          <div className="comments__section--content">
            <a href="/" className="comments__section--user">
              {data.author_name}
            </a>
            <p className="comments__section--time">{Date}</p>
            <div
              className="comments__section--text"
              dangerouslySetInnerHTML={{ __html: data.content.rendered }}
            ></div>
            {data.parent === 0 ? (
              <i className="ion-reply comments__section--reply" onClick={handleShowForm}></i>
            ) : (
              <></>
            )}
          </div>
        </div>
        <ul className="comments">
          {list.map((item) => (
            <CommentItem key={item.id} data={item} />
          ))}
        </ul>

        {restTotal > 0 && (
          <CommentAction
            restTotal={restTotal}
            parent={data.id}
            currentPage={currentPage}
          />
        )}
      </li>
      {showForm && <CommentForm handleShowForm={handleShowForm} parentComment={data.id} postId={data.post} authorId={data.author} />}
    </>
  );
}

export default CommentItem;
