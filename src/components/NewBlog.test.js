import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlog from './NewBlog'

test('<NewBlog/> updates the state and handles on submit', async () => {
  const user = userEvent.setup()

  const createBlog = jest.fn()
  const { container } = render(<NewBlog createBlog={createBlog} />)

  const titleInput = container.querySelector('.title')
  const authorInput = container.querySelector('.author')
  const urlInput = container.querySelector('.url')
  const createButton = container.querySelector('.create')

  const title = 'Hello World'
  const author = 'James'
  const url = 'james.com/hello-world'

  await user.type(titleInput, title)
  await user.type(authorInput, author)
  await user.type(urlInput, url)

  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)

})