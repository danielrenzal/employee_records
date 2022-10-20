import React, {Component} from 'react';
import NavigationBar      from './components/navigationBar';
import ViewRecords        from './components/viewRecords';


class App extends Component{
  render(){
    return (
      <React.Fragment>
        <NavigationBar/>
        <ViewRecords/>
      </React.Fragment>
    )
  }
}


export default App;
