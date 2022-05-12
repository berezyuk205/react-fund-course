import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import PostList from "./PostList";

const PostForm = ({create}) => {
  const [post, setPost] = useState({title: '', body: ''})

  const addNewCar = (event) => {
    event.preventDefault();
    const newPost = {
      ...post, id: Date.now()
    }
    // setPosts([...posts, {...post, id: Date.now()}])
    setPost({title: '', body: ''})
    create(newPost)
    // setTitle('')
    // setBodyCar('')
  }

  return (
    <form>
      {/*Управляемый компонент*/}
      <MyInput type="text" placeholder='Марка машины'
               value={post.title}
               onChange={event => setPost({...post, title: event.target.value})}/>
      {/*Неправляемый компонент*/}
      {/*<MyInput type="text" placeholder='Модель'*/}
      {/*         ref={bodyInputRef}/>*/}
      <MyInput type="text" placeholder='Модель'
               value={post.body}
               onChange={event => setPost({...post, body: event.target.value})}
      />
      <MyButton onClick={addNewCar}>Добавить машину</MyButton>
    </form>
  );
};

export default PostForm;