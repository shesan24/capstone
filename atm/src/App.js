import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Qrscanner from './Components/Qrscanner';
import Nav from './Components/Nav'



function App() {
  return (
      <div className="App">
      <Nav/>
        <div className ="content">
        <Qrscanner/>
        </div>
      </div>
  );
}

export default App;
