import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Resources from './pages/Resources'
import Progress from './pages/Progress'
import Action from './pages/Action'
import LoginGate from './components/LoginGate'

export default function App() {
  return (
    <LoginGate>
      <BrowserRouter basename="/home">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="progress" element={<Progress />} />
            <Route path="resources" element={<Resources />} />
            <Route path="action" element={<Action />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LoginGate>
  )
}
