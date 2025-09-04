import Introduction from './pages/Introduction';
import Login from './pages/Login'
import {Route, Routes, Navigate} from 'react-router-dom';
import Home from './pages/Home';
import TPView from './pages/TPView';
import MultiStepForm from './pages/MultiStepForm';
import Sample from './Sample';
import Finished from './pages/Finished';
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Introduction />}/>
        <Route path='/login' element={<Login />}/>

        <Route path='/home' element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path='/tp' element={
          <ProtectedRoute>
            <TPView />
          </ProtectedRoute>
        } />
        <Route path='/investigations' element={
          <ProtectedRoute>
            <MultiStepForm />
          </ProtectedRoute>
        } />
        <Route path='/investigations/:caseNumber' element={
          <ProtectedRoute>
            <MultiStepForm />
          </ProtectedRoute>
        } />
        <Route path='/sample/:caseNumber' element={
          <ProtectedRoute>
            <Sample />
          </ProtectedRoute>
        } />
        <Route path='/finished' element={
          <ProtectedRoute>
            <Finished />
          </ProtectedRoute>
        } />
        
        {/* Redirect / to /home for authenticated users */}
        <Route path='/' element={
          <ProtectedRoute>
            <Navigate to="/home" replace />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  )
}

export default App;
