import React from 'react';
import ReactDOM from 'react-dom';
import Pagination from "react-js-pagination";
import "bootstrap/less/bootstrap.less";

const User = (props) => (
  <tr>
    {
      <td>{props.name}</td>}
    {
      <td>{props.email}</td>
    }
    {
      <td><span className="badge badge-success">{props.status}</span></td>
    }
  </tr>
)

class Worklist extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      users: [],
      activePage: 1,
      rows: 10,
      pages: 10
    }

    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(pageNumber) {
    console.log('Cambio de pagina')
    console.log('Pagina activa: ' + this.state.activePage)
    console.log('Registros por pagina: ' + this.state.rows)
    console.log('Paginas a mostrar: ' + this.state.pages)
    
    this.setState({activePage: pageNumber})
    this.request()
  }


  componentWillMount() {
    this.request()
  }

  request() {
    this.setState({ users: []})
    fetch('https://randomuser.me/api/?page=' + this.state.activePage + '&results=' + this.state.rows + '&seed=abc')
      .then(response => response.json())
      .then(users => {
        users.results.forEach(user => {
          let data = {
            name: user.name.first,
            email: user.email,
            status: 'Ok',
            key: user.login.uuid
          }
          this.setState({ users: this.state.users.concat([data])})
        })
      })
  }

  render() {
    if (this.state.users.length > 0) {
      return (
        <div>
          <table className="table table-responsive-sm table-bordered table-striped table-sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>

              {
                this.state.users.map(user => (
                  <User key={user.key} name={user.name} email={user.email} status={user.status} />
                ))
              }

            </tbody>
          </table>
          
          <div>
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.state.rows}
          totalItemsCount={100}
          pageRangeDisplayed={this.state.pages}
          onChange={this.handlePageChange}
        />
      </div>

        </div>
      );
    }
    return (
      <p>Loading...</p>
    );
  }
}

// ========================================

ReactDOM.render(
  <Worklist />,
  document.getElementById('worklist'), null
);
