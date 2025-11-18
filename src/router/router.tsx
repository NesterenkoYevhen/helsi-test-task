import { MainLayout } from '@/layouts/MainLayout'
import PatientRegistrationForm from '@/pages/PatientRegistrationForm'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,

    children: [
      {
        path: '',
        element: <PatientRegistrationForm />
      }
    ]
  }
])