import { ADD_COMMENT, GET_COMMENT } from "./actionTypes";

export const addComment = (payload) => ({
  type: ADD_COMMENT,
  payload,
});

export const getComment = (payload) => ({
  type: GET_COMMENT,
  payload,
});
