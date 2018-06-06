
class App extends React.Component {
     constructor(props) {
    super(props);
  }

  render() {
    return (
    	<div>
        	<Dashboard/>
        </div>
    );
  }
 }

ReactDOM.render(<App/>, document.getElementById('root'));