import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLikeUpdate, user, handleDeleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'hide' : 'view' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)
  return (
    <div style={blogStyle} className='blogs' >
      <div className='blog'>
        <span>{blog.title} {blog.author}</span>
        <button onClick={toggleVisibility} className='visible'>{hideWhenVisible.display}</button>
      </div>
      <div style={showWhenVisible} className='details'>
        <p>{blog.url}</p>
        <p>{blog.likes}<button onClick={() => handleLikeUpdate(blog)} className='like'>Like</button></p>
        <p>{blog?.user.name}</p>
        {blog.user.username !== user.username ? null : <button onClick={() => handleDeleteBlog(blog)}>Remove</button>}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLikeUpdate: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired,
}
export default Blog