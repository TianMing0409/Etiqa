
import './App.css';
import FreelancerCrud from './components/FreelancersCrud';

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">CDN</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              {/* Add more nav items here */}
            </ul>
          </div>
        </div>
      </nav>

      <FreelancerCrud />
      <footer className="footer" style={{ height: '40px', backgroundColor: 'black' }}>
        <div className="container">
          <p style={{ textAlign: 'center', color: 'white', paddingTop: '7px', fontSize: '15px' }}>&copy; 2023 CDN. All rights reserved.</p>
        </div>
      </footer>
    </div>

  );
}

export default App;
