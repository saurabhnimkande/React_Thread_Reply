import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addComment } from "../Redux/comment/actions";
import "./Comment.css";

export const Comment = () => {
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const { data } = useSelector((state) => ({
    data: state.data,
  }));

  function addData(ind) {
    console.log(ind);
    let input = document.getElementsByClassName("inputData");
    for (let i = 0; i < input.length; i++) {
      if (input[i].value !== "") {
        dispatch(addComment({ value: input[i].value, index: ind }));
      }
    }
  }

  function getIndex(ids) {
    console.log(ids);
    let parent = document.getElementsByClassName("hello")[ids];
    let input = document.createElement("input");
    input.placeholder = "Enter input";
    input.className = "inputData";
    let button = document.createElement("button");
    button.innerText = "Add Reply";
    button.addEventListener("click", () => addData(ids));
    parent.append(input, button);
  }
  let index = 0;
  function displayResult(data) {
    return data.map((el) => {
      el.placeholder = index++;
      // console.log("Index", index, el.id);
      return (
        <div key={Math.random() * 99999} className="mainDiv">
          <p>
            {el.author} {el.points + " Points"} {calculateTime(el.timestamp)}
          </p>
          <h3>{el.body}</h3>
          <div>
            <span
              className="spanElem replyBtn"
              onClick={() => getIndex(el.placeholder)}
            >
              Reply
            </span>
            <span className="spanElem">Give Award</span>
            <span className="spanElem">Share</span>
            <span className="spanElem">Report</span>
            <span className="spanElem">Save</span>
          </div>
          <div className="hello"></div>
          <button onClick={() => setClick(!click)}>Expand</button>
          {click ? displayResult(el.replies) : null}
        </div>
      );
    });
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

  return (
    <div>
      <h1>Comments</h1>
      {displayResult(data)}
    </div>
  );
};
