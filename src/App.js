import React, { useState, useEffect, useRef } from 'react'
import './app.css'
import Blog from './components/Blog'
import blogService from './services/blogs'
import login from './services/login'
import LoginForm from './components/LoginForm'
import Togleable from './components/Togleable'
import NewBlog from './components/NewBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)


  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll()
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    }
    getBlogs()
  }, [])

  useEffect(() => {
    const userData = JSON.parse(window.localStorage.getItem('blogsLoggedInUser'))
    if (userData) {
      setUser(userData)
      blogService.setToken(userData.token)
    }
  }, [])

  const showNotification = (classname, message) => {
    setNotification({ classname: classname, message })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const sortAndUpdateBlogs = (blogs) => {
    blogs.sort((a, b) => b.likes - a.likes)
    setBlogs(blogs)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userData = await login({ username, password })
      setUser(userData)
      blogService.setToken(userData.token)
      window.localStorage.setItem('blogsLoggedInUser', JSON.stringify(userData))
      setPassword('')
      setUsername('')
      showNotification('success', `Welcome ${userData.name}`)
    } catch (error) {
      console.log(error)
      showNotification('error', 'Wrong Credentials')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('blogsLoggedInUser')
    setUser(null)
    showNotification('success', 'Logout Successfull')
  }

  const updateBlogs = (newBlog) => {
    let updatedBlogs = blogs.map(blog => {
      if (blog.id === newBlog.id) {
        newBlog['user'] = blog.user
        return newBlog
      } else {
        return blog
      }
    })
    sortAndUpdateBlogs(updatedBlogs)
  }

  const handleLikeUpdate = async (blog) => {
    const updateBlog = { ...blog }
    delete updateBlog.user
    updateBlog.likes += 1
    const newBlog = await blogService.put(updateBlog)
    updateBlogs(newBlog)
  }

  const removeBlog = (removeBlog) => {
    const updatedBlogs = blogs.filter(blog => blog.id !== removeBlog.id)
    sortAndUpdateBlogs(updatedBlogs)
  }

  const handleDeleteBlog = async (blog) => {
    if (window.confirm(`Remove Blog ${blog.title} by ${blog.author}`)) {
      await blogService.deleteBlog(blog)
      removeBlog(blog)
    }
  }

  const createBlog = async (newblog) => {
    try {
      newBlogRef.current.toggleVisibility()
      const blog = await blogService.create(newblog)
      blog.user = {
        name: user.name,
        username: user.username
      }
      setBlogs(blogs.concat(blog))
      showNotification('success', `a new blog ${blog.title} by ${blog.author} added`)
    } catch (error) {
      showNotification('error', 'Something went worng while adding blog')
    }
  }

  const newBlogRef = useRef()

  const loginForm = () => {
    return (
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    )
  }

  const displayBlogs = () => {
    return (
      <div>
        <h2>Blogs</h2>
        <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>

        <Togleable buttonLabel='new blog' ref={newBlogRef}>
          <NewBlog
            createBlog={createBlog}
            showNotification={showNotification} />
        </Togleable>
        {
          blogs.map(blog =>
            <Blog key={blog.id}
              blog={blog}
              handleLikeUpdate={handleLikeUpdate}
              user={user}
              handleDeleteBlog={handleDeleteBlog} />
          )
        }
      </div >
    )
  }

  return (
    <div>
      {notification === null ? null : <div className={notification.classname}>{notification.message}</div>}
      {user === null ? loginForm() : displayBlogs()}
    </div>
  )
}

export default App
