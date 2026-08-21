import './styles/App.css'

import AppRoutes from './routes/AppRoutes';

function App() {
    console.log({
    width: window.innerWidth,
    height: window.innerHeight,
    dpr: window.devicePixelRatio,
  });
  return <AppRoutes />

}

export default App
