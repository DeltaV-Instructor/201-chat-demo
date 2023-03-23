"use strict";
console.log("app connected!");

//create constructor for our messages
const Comment = function (userName, text) {
  this.userName = userName;
  this.text = text;
};

Comment.prototype.render = function () {
  const listItem = document.createElement("li");
  listItem.innerHTML =
    '<img width="120px" src="img/' +
    this.userName +
    '.png" />' +
    this.userName +
    ": </b><em>" +
    this.text +
    "</em>";

  return listItem;
};

//globals
const chatList = document.getElementById("chat-list");
const chatForm = document.getElementById("chat-form");
const clearChatList = document.getElementById("clear-chat-list");
// console.log(chatList,chatForm, clearChatList);

let allComments = [];

const renderAllComments = function () {
  chatList.innerHTML = "";
  for (let i = 0; i < allComments.length; i++) {
    //render our comments to the chat list ul
    chatList.appendChild(allComments[i].render());
  }
};

function handleCommentSubmit(event) {
  event.preventDefault();
  console.log(event);

  if (!event.target.says.value || !event.target.who.value) {
    return alert("Fields cannot be empty!");
  }

  const commenter = event.target.who.value;
  console.log(
    "🚀 ~ file: chat.js:52 ~ handleCommentSubmit ~ commenter:",
    event.target.who.value
  );
  let remark = event.target.says.value;
  if (commenter === "Bob") {
    remark = "@$^#$%$^@#$%@";
  }

  if (commenter === "patrick") {
    remark = remark.toUpperCase();
  }

  if (commenter === "squid") {
    remark = "!!!";
  }

  const newComment = new Comment(commenter, remark);
  console.log("Comment by " + event.target.who.value + " at " + Date());
  event.target.who.value = null;
  event.target.says.value = null;

  allComments.push(newComment);
  renderAllComments();
} //closes function

//event listener on the form to grab the event
chatForm.addEventListener("submit", handleCommentSubmit);

clearChatList.addEventListener("click", function () {
  chatList.innerHTML = "";
  console.log("list is cleared!");
  allComments = [];
});
