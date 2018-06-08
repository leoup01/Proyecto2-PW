var Container = Reactstrap.Container;
var Col = Reactstrap.Col;
var Row = Reactstrap.Row;
var Form = Reactstrap.Form;
var Button = Reactstrap.Button;
var FormGroup = Reactstrap.FormGroup;
var Label = Reactstrap.Label;
var Input = Reactstrap.Input;
var FormText = Reactstrap.FormText;

class Categorias extends React.Component {
    constructor(props) {
    	super(props);
    	this.state = {
    		categorias:[],
            categoria:[],
            rol: this.handleGetRol()
	  	}
        this.handleGetRol = this.handleGetRol.bind(this);
	  	this.handleReload = this.handleReload.bind(this);
        this.handleChangeCategoria = this.handleChangeCategoria.bind(this);
        this.handleChangeData = this.handleChangeData.bind(this);
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
        fetch('/server/index.php/categorias')
        .then((response) => {
        console.log(response);
            return response.json()
        })
        .then((data) => {
            console.log("handleReload");
            console.log(data);
            this.setState({ 
                categorias: data,
                categoria: {
                    idCategoria:"",
                    nombre:"",
                    zona:"",
                    encargado:1,
                }
            });
        });
    }

    componentWillMount() {
        this.handleReload();
    }

    handleChangeData(){
        this.handleReload();
    }

    handleChangeCategoria(data) {
        this.setState({categoria: data})
    }

  render() {
    //console.log("ROL: "+this.state.rol);
    const content = ((this.state.rol === 'Jefe de redacción') || (this.state.rol === 'Administrador'))?
                      <Row className="appContainer">
                        <Col sm="12" md="12" lg="8" xl="8">
                            <CategoriasForm
                                categoria={this.state.categoria}
                                handleChangeData={this.handleChangeData}
                                rol={this.state.rol}/>
                        </Col>
                        <Col sm="12" md="12" lg="4" xl="4">
                            <CategoriasList categorias={this.state.categorias} handleChangeCategoria={this.handleChangeCategoria}/>
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

ReactDOM.render(<Categorias/>, document.getElementById('root'));