import { ADD_COMMENT, GET_COMMENT } from "./actionTypes";

const init = {
  data: {
    id: "001",
    author: "albert",
    body: "Whats the status?",
    timestamp: "Sun Aug 02 2020 18:08:45 GMT+0530",
    points: "2",
    replies: [
      {
        id: "003",
        author: "haren",
        body: "Wrote the test suites, waiting for approval?",
        timestamp: "Sun Aug 02 2020 18:12:45 GMT+0530",
        points: "3",
        replies: [
          {
            id: "004",
            author: "albert",
            body: "Thanks for the update!",
            timestamp: "Sun Aug 02 2020 18:15:45 GMT+0530",
            points: "8",
            replies: [],
          },
        ],
      },
      {
        id: "002",
        author: "Nrupul",
        body: "looking forward for the demo!",
        timestamp: "Sun Aug 02 2020 18:10:45 GMT+0530",
        points: "2",
        replies: [],
      },
    ],
  },
};
let count = 0;
let bool = false;
function change(root, index, value) {
  if (bool) {
    return;
  }
  console.log("count, index", count, index);
  root.forEach((el) => {
    if (bool) {
      return;
    }
    if (count === index) {
      bool = true;
      let val = {
        id: Math.random() * 9999,
        author: "Saurabh",
        body: value,
        timestamp: new Date().toString(),
        points: "50",
        replies: [],
      };
      el.replies.push(val);
      console.log("hello");
      console.log(el);
      return;
    }
    count++;
    if (el.replies !== undefined) {
      change(el.replies, index, value);
    }
    if (bool) {
      return;
    }
  });
}

export const reducer = (state = init, { type, payload }) => {
  switch (type) {
    case ADD_COMMENT:
      count = 0;
      bool = false;
      console.log("payload", payload);
      change(state.data, payload.index, payload.value);
      return {
        ...state,
      };
    case GET_COMMENT:
      return state;
    default:
      return state;
  }
};
