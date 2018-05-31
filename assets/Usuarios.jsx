var Container = Reactstrap.Container;
var Col = Reactstrap.Col;
var Row = Reactstrap.Row;

class Usuarios extends React.Component {
    constructor(props) {
    	super(props);
    	this.state = {
        usuarios:[],
    		usuario:[],
        rol: this.handleGetRol()
	  	}
      this.handleGetRol = this.handleGetRol.bind(this);
	  	this.handleReload = this.handleReload.bind(this);
	  	this.handleChangeData = this.handleChangeData.bind(this);
      this.handleChangeUsuario = this.handleChangeUsuario.bind(this);
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
      console.log("handleReload usuarios");
          fetch('/server/index.php/usuarios')
           .then((response) => {
            console.log(response);
               return response.json()
           })
           .then((data) => {
              console.log("handleReload");
              console.log(data);
               this.setState({ usuarios: data });
               this.forceUpdate();
           });
    }

    handleChangeUsuario(data) {
           this.setState({usuario: data});
       }

    componentWillMount() {
        this.handleReload();
    }

    handleChangeData() {
        this.handleReload();
    }

  render() {
    const content = (this.state.rol === 'Administrador')?
                      <Row className="appContainer">
                        <Col sm="12" md="12" lg="4" xl="4">
                          <UsuariosForm usuario={this.state.usuario} handleChangeData={this.handleChangeData}/>
                        </Col>
                        <Col sm="12" md="12" lg="8" xl="8">
                          <UsuariosList usuarios={this.state.usuarios} handleChangeUsuario={this.handleChangeUsuario}/>
                        </Col>
                      </Row>
                      :<Row className="appContainer">
                        <p>No tiene los permisos requeridos para entrar a esta seccion</p>
                        </Row>;
    return (
    	<div>
        	<Header/>
        	{content}
        </div>

    );
  }
 }

ReactDOM.render(<Usuarios/>, document.getElementById('root'));