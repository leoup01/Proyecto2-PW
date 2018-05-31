var Container = Reactstrap.Container;
var Col = Reactstrap.Col;
var Row = Reactstrap.Row;

class Agencias extends React.Component {
    constructor(props) {
    	super(props);
    	this.state = {
        agencias:[],
    		agencia:[],
        rol: this.handleGetRol()
	  	}
      this.handleGetRol = this.handleGetRol.bind(this);
	  	this.handleReload = this.handleReload.bind(this);
	  	this.handleChangeData = this.handleChangeData.bind(this);
      this.handleChangeAgencia = this.handleChangeAgencia.bind(this);
  	}
    
    handleGetRol () {
          const user = localStorage.getItem('userIdLS');
          console.log("user: "+user);
          if(user !== null){
            fetch('/server/index.php/usuarios/'+ user)
             .then((response) => {
                return response.json()
             })
             .then((data) => {
                this.setState({ rol: data[0].rol });
              });
          }
    }

  	handleReload() {
      console.log("handleReload agencias");
          fetch('/server/index.php/agencias')
           .then((response) => {
            console.log(response);
               return response.json()
           })
           .then((data) => {
              console.log("handleReload");
              console.log(data);
               this.setState({ agencias: data });
               //this.setState({ agencia: [] });
               this.forceUpdate();
           });
    }

    handleChangeAgencia(data) {
           this.setState({agencia: data});
       }

    componentWillMount() {
        this.handleReload();
    }

    handleChangeData() {
        this.handleReload();
    }

  render() {
    console.log("RENDER AGENCIAS");
    console.log(this.state);
    return (
    	<div>
        	<Header/>
        	<Row className="appContainer">
            <Col sm="12" md="12" lg="4" xl="4">
              <AgenciasForm agencia={this.state.agencia}
                handleChangeData={this.handleChangeData}
                handleChangeAgencia={this.handleChangeAgencia}
                rol={this.state.rol}/>
            </Col>
            <Col sm="12" md="12" lg="8" xl="8">
              <AgenciasList agencias={this.state.agencias} handleChangeAgencia={this.handleChangeAgencia}/>
            </Col>
          </Row>
        </div>

    );
  }
 }

ReactDOM.render(<Agencias/>, document.getElementById('root'));