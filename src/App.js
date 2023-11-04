
import './App.css';
import MyNavBar from './comp/MyNavBar';
import MyFooter from './comp/MyFooter';
import MyHome from './comp/MyHome';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className='d-flex flex-column '>
        <MyNavBar />
        <MyHome className='flex-grow-1 '/> 
        <MyFooter/>
    </div>
  );
}

export default App;
