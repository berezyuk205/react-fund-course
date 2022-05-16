import React from 'react';
import MyButton from "./UI/button/MyButton";
import '../styles/App.css';

const PostItem = (props) => {
  return (
    <div className="post">
      <div className='post__content'>
        <strong>{props.number}. {props.post.title}</strong>
        <div className='post__details'>
          {props.post.body}
        </div>
      </div>
      <div className='post__btns'>
        <MyButton onClick={() => props.remove(props.post)}>Удалить</MyButton>
      </div>
    </div>
  );
};

export default PostItem;