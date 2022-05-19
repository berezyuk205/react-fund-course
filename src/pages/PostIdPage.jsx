import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import PostService from "../API/PostService";
import {useFetching} from "../hooks/useFetching";
import Loader from "../components/UI/Loader/Loader";

const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState(1)
  const [comments, setComments] = useState([])
  const [fetchPostById, isLoading, error] = useFetching(async () => {
    const response = await PostService.getById(params.id)
    setPost(response.data)
  })
  const [fetchComments, isComments, errorComments] = useFetching(async () => {
    const response = await PostService.getIdComments(params.id)
    setComments(response.data)
  })


  useEffect(() => {
    fetchPostById()
    fetchComments()
  },[])

  return (
    <div>
      <h1>Вы попали id {params.id}</h1>
      {
        isLoading
        ? <Loader/>
        : <div>{post.id}. {post.title}</div>
      }
      <h1>Комментарии</h1>
      {isComments
        ? <Loader/>
        : <div style={{width: '500px'}}>
            {comments.map(el =>
            <div style={{marginTop: 1}}>
              <h5>{el.email}</h5>
              <div>{el.body}</div>
            </div>
        )}</div>
      }
    </div>
  );
};

export default PostIdPage;