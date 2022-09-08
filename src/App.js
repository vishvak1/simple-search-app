import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.scss';
import { Component } from 'react';
import ListValues from './ListValues';

class App extends Component {
  constructor() { // Initalize the state object with people and query objects...
    super();

    this.state = {
      people: [],
      query: ''
    }
  }

  componentDidMount() { // Fetch API and Update the people object in the state before the component is rendered
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) =>
        this.setState(
          () => {
            return { people: users };
          }
        )
      );
  }

  onSearchChange = (e) => { // Update query in the state dynamically when input text box value is changed
    this.setState(
      () => {
        return { query: e.target.value }
      }
    )
  }

  onSearchClick = () => { // Handle search button -- Update query in the state when search button is pressed
    this.setState(
      () => {
        return { query: document.getElementById('search-rolodex').value }
      }
    )
  }

  onSearchSubmit = (e) => { // Handle form submit -- Update query in the staet when "Enter" is pressed on the input text box
    e.preventDefault(); // Prevents the form from refreshing/reloading the page on submission
    this.onSearchClick();
  }

  render() {
    return (
      <div className="App">
        <div class="container px-4 mt-3 mb-2">
          <form action="" id='search-rolodex-form' className='row gx-3 gy-2' onSubmit={this.onSearchSubmit}>
            <div className="col-md">
              <input type="text" name="search" id="search-rolodex" className="form-control" placeholder='Search people...' onChange={this.onSearchChange} autoComplete='off' />
            </div>

            <div className="col-md-3">
              <button id='search-rolodex-button' type='button' className='btn btn-outline-primary form-control' onClick={this.onSearchClick}>
                <i className="bi bi-search me-2"></i>
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>

        <div id='list-values-div' className='row px-5'>
          <ListValues list={this.state.people} value={this.state.query} />
        </div>
      </div>
    );
  }
}

export default App;
