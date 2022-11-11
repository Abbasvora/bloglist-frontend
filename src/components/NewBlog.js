/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

const NewBlog = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <>
      <h2>Create New</h2>
      <form onSubmit={handleCreateBlog} >
        <div>
          title
          <input className='title' type={'text'} value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author
          <input className='author' type={'text'} value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url
          <input className='url' type={'text'} value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button className='create' type='submit'>create</button>
      </form>
    </>
  )
}

NewBlog.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default NewBlog