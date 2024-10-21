import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './appRoutes';
import { ToastContainer} from 'react-toastify';



function App() {
  return (
    <div className="App">
      <AppRoutes />
      <ToastContainer theme='colored'/>
    </div>
  );
}

export default App;
