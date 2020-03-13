import React from 'react';
import './App.css';
import axios from "axios";

export default class App extends React.Component {
  // const [state, setState] = useState();
  state = { projects:[]}
  componentDidMount(){  
    axios
    .get("http://localhost:4000/api/projects")
    .then(res => {
      console.log(res.data);
      const projects= res.data;
      this.setState({projects})
      // setState(res.data);
      // console.log(state)
    })
    .catch(err => {
      console.log(err)
    })}
render(){
  return (
    <div className="App">
      <header className="App-header">
        {this.state.projects.map(e => 
          <div key={e.id}>
            <h1>{e.name}</h1>
            <p>{e.description}</p>
          </div>
        )}
      </header>
    </div>
  );
}

}

// export default App;
