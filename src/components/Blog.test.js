import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('<Blog>', () => {
  let container
  const mockHandleLikeUpdate = jest.fn()
  const mockHandleDeleteBlog = jest.fn()
  beforeEach(() => {
    const blog = {
      title: 'Hello',
      author: 'james',
      url: 'james.com/hello',
      likes: 14,
      user: {
        name: 'james',
        username: 'james21'
      }
    }

    container = render(<Blog
      blog={blog}
      user={blog.user}
      handleDeleteBlog={() => mockHandleDeleteBlog(blog)}
      handleLikeUpdate={() => mockHandleLikeUpdate(blog)} />)
      .container
  })
  test('renders content', () => {
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('Hello james')
    expect(div).not.toHaveTextContent('james.com/hello')
    expect(div).not.toHaveTextContent('14')
  })
  test('details are rendered when clicked view', async () => {
    const user = userEvent.setup()
    const button = container.querySelector('.visible')
    await user.click(button)

    const div = container.querySelector('.details')

    expect(div).toHaveTextContent('james.com/hello')
    expect(div).toHaveTextContent('14')
  })
  test('when like is cliked eventHandler is called', async () => {
    const user = userEvent.setup()
    const button = container.querySelector('.like')

    await user.click(button)
    await user.click(button)

    expect(mockHandleLikeUpdate.mock.calls).toHaveLength(2)
  })
})
