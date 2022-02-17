import { useRef, useState } from "react";
import "./Comment.css";

export const Comment = ({ data }) => {
  const [click, setClick] = useState(false);
  const [displayInput, setDisplayInput] = useState(false);
  const inputData = useRef({ current: "" });

  function addreply() {
    let payload = {
      id: Math.random() * 1000000,
      author: "Saurabh",
      body: inputData.current,
      timestamp: new Date().toString(),
      points: "8",
      replies: [],
    };
    data.replies = [...data.replies, payload];
    setClick(true);
    setDisplayInput(false);
  }

  function calculateTime(timestamp) {
    let monthObj = {
      Jan: 1,
      Feb: 2,
      Mar: 3,
      Apr: 4,
      May: 5,
      Jun: 6,
      Jul: 7,
      Aug: 8,
      Sept: 9,
      Oct: 10,
      Nov: 11,
      Dec: 12,
    };
    let today = new Date();
    let arr = timestamp.split(" ");
    let time = arr[4].split(":");
    if (today.getFullYear() - Number(arr[3]) > 0) {
      return today.getFullYear() - Number(arr[3]) + " Years Ago";
    } else if (today.getMonth() - monthObj[arr[1]] > 0) {
      return today.getMonth() - monthObj[arr[1]] + 1 + " Months Ago";
    } else if (today.getDate() - Number(arr[2]) > 0) {
      return today.getDate() - Number(arr[2]) + " Days Ago";
    } else if (today.getHours() - time[0] > 0) {
      return today.getHours() - time[0] + " Hours Ago";
    } else if (today.getMinutes() - time[1] > 0) {
      return today.getMinutes() - time[1] + " Minutes Ago";
    } else {
      return today.getSeconds() - time[2] + " Seconds Ago";
    }
  }

  if (data?.replies?.length > 0) {
    return (
      <div className="mainDiv">
        <p>
          {data.author} {data.points + " Points"}{" "}
          {calculateTime(data.timestamp)}
        </p>
        <h3>{data.body}</h3>
        <div>
          <span
            className="spanElem replyBtn"
            onClick={() => setDisplayInput(!displayInput)}
          >
            Reply
          </span>
          <span className="spanElem">Give Award</span>
          <span className="spanElem">Share</span>
          <span className="spanElem">Report</span>
          <span className="spanElem">Save</span>
        </div>
        <div style={{ display: displayInput ? "block" : "none" }}>
          <input
            placeholder="Enter your reply"
            onChange={(e) => {
              inputData.current = e.target.value;
            }}
          ></input>
          <button onClick={addreply}>Add Reply</button>
        </div>
        {data.replies.length !== 0 ? (
          <button onClick={() => setClick(!click)}>Expand</button>
        ) : null}
        {click ? (
          <div>
            {data.replies.map((el) => (
              <Comment data={el} key={Math.random() * 111111}></Comment>
            ))}
          </div>
        ) : null}
      </div>
    );
  } else {
    return (
      <div key={Math.random() * 99999} className="mainDiv">
        <p>
          {data.author} {data.points + " Points"}{" "}
          {calculateTime(data.timestamp)}
        </p>
        <h3>{data.body}</h3>
        <div>
          <span
            className="spanElem replyBtn"
            onClick={() => setDisplayInput(!displayInput)}
          >
            Reply
          </span>
          <span className="spanElem">Give Award</span>
          <span className="spanElem">Share</span>
          <span className="spanElem">Report</span>
          <span className="spanElem">Save</span>
        </div>
        <div style={{ display: displayInput ? "block" : "none" }}>
          <input
            placeholder="Enter your reply"
            onChange={(e) => {
              inputData.current = e.target.value;
            }}
          ></input>
          <button onClick={addreply}>Add Reply</button>
        </div>
      </div>
    );
  }
};
