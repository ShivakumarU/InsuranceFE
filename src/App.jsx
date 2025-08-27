import Introduction from './pages/Introduction';
import Login from './pages/Login'
import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import MultiStepForm from './pages/MultiStepForm';
import Sample from './Sample';
import Finished from './pages/Finished';
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <div>
      <Routes>
        {/* Public routes */}
        <Route path='/' element={<Introduction />}/>
        <Route path='/login' element={<Login />}/>

        {/* Protected routes */}
        <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/investigations' element={<ProtectedRoute><MultiStepForm /></ProtectedRoute>} />
        <Route path='/investigations/:caseNumber' element={<ProtectedRoute><MultiStepForm /></ProtectedRoute>} />
        <Route path='/sample/:caseNumber' element={<ProtectedRoute><Sample /></ProtectedRoute>} />
        <Route path='/finished' element={<ProtectedRoute><Finished /></ProtectedRoute>} />
      </Routes>
    </div>
  )
}

export default App;
