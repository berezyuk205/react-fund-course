import React from 'react';
import MyButton from "./UI/button/MyButton";
import '../styles/App.css';
import {useNavigate} from "react-router-dom";

const PostItem = (props) => {
  const router = useNavigate()
  return (
    <div className="post">
      <div className='post__content'>
        <strong>{props.post.id}. {props.post.title}</strong>
        <div className='post__details'>
          {props.post.body}
        </div>
      </div>
      <div className='post__btns'>
        <MyButton onClick={() => router(`/posts/${props.post.id}`)}>Редактировать</MyButton>
        <MyButton onClick={() => props.remove(props.post)}>Удалить</MyButton>
      </div>
    </div>
  );
};

export default PostItem;