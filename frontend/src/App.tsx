import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Blog from './pages/Blog'
import { ROUTES } from './routes'
import Public from './layout/Public'
import AllBlogs from './pages/AllBlogs'
import Create from './pages/Create'
import Private from './layout/Private'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Public />}>
            <Route path={ROUTES.public.signup.absolute} element={<SignUp />} />
            <Route path={ROUTES.public.signin.absolute} element={<SignIn />} />
          </Route>
          <Route path='/' element={<Private />}>
            <Route path={`${ROUTES.private.blog.view.absolute}/:id`} element={<Blog />} />
            <Route path={ROUTES.private.blog.all.absolute} element={<AllBlogs />} />
            <Route path={ROUTES.private.blog.create.absolute} element={<Create />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App