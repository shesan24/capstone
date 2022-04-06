import {Navbar} from 'react-bootstrap';
import './components.css';
import logo from './logo.png';

function Nav(){
    return(
        <Navbar bg="dark" variant="dark">
          <div className="navbar-container">
            <Navbar.Brand>
            <img src={logo} width="60" height="55" alt="logo"/>{'  '}

            <a className="blue logo">Go</a><a className="green logo">Cash</a>
            </Navbar.Brand>
          </div>
          
      </Navbar>
    )
}

export default Nav;