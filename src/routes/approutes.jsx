import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from '../components/Layout'
import Dashboard from '../components/Dashboard'
import Home from '../pages/Home'
import About from '../pages/About'
import Projects from '../pages/Projects'
import Skills from '../pages/Skills'
import Experience from '../pages/Experience'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Projects />} />
          <Route path="skills" element={<Skills />} />
          <Route path="experience" element={<Experience />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRoutes
