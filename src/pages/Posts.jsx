import '../styles/App.css';
import React, {useEffect, useMemo, useRef, useState} from "react";
import Counter from "../components/Counter";
import ClassCounter from "../components/ClassCounter";
import PostItem from "../components/PostItem";
import PostList from "../components/PostList";
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";
import PostForm from "../components/PostForm";
import MySelect from "../components/UI/select/MySelect";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/MyModal/MyModal";
import {usePosts} from "../hooks/usePosts";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import {useFetching} from "../hooks/useFetching";
import {getPageCount, getPagesArray} from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";
import {useObserver} from "../hooks/useObserver";

function Posts() {

  // const [title, setTitle] = useState('')
  // const [body, setBodyCar] = useState('')
  // const bodyInputRef = useRef();

  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  const lastElement = useRef()
  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers["x-total-count"]
    setTotalPages(getPageCount(totalCount, limit))
  })

  // const [isPostsLoading, setIsPostsLoading] = useState(false);
  // const [selectedSort, setSelectedSort] = useState('')
  // const [searchQuery, setSearchQuery] = useState('')

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page+1)
  })

  useEffect(() => {
    fetchPosts()
  }, [page, limit])


  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const changePage = (page) => {
    setPage(page)
    // fetchPosts()
  }
  // async function fetchPosts(){
  //   setIsPostsLoading(true);
  //
  //   setIsPostsLoading(false);
  // }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }


  return (
    <div className="App">
      <MyButton onClick={() => setModal(true)}>
        Добавить автомобиль
      </MyButton>
      <MyModal
        visible={modal}
        setVisible={setModal}
      >
        <PostForm create={createPost}/>
      </MyModal>

      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      <MySelect
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue={'Количество элементов на странице'}
        options={[
          {value: 5, name:'5'},
          {value: 10, name:'10'},
          {value: 20, name:'20'},
        ]}
      />
      {postError &&
      <h1>Ошибка сервера ${postError}</h1>
      }
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Авто"}/>
      <div ref={lastElement} style={{height:20, background:'red'}}></div>
      {isPostsLoading &&
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}><Loader/></div>
      }
      <Pagination
        page={page}
        changePage={changePage}
        totalPages={totalPages}
      />
    </div>
  );
}

export default Posts;