import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Lists from './Componenti/Lists';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       baseUrl : 'http://localhost:8080/',
    };

    
  }
  
  

  render() {
    return (
      <div className="container-fluid">
        <title>Manage Lists</title>

        <h1 className="text-center text-primary">Shopping list management</h1>
        <h2 className="text-center text-secondary">with React, Bootstrap, PostgreSQL, Knex</h2>

        <Lists baseUrl={this.state.baseUrl} />


      </div>

    );
  }
}
export default App;
