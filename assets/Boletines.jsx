var Container = Reactstrap.Container;
var Col = Reactstrap.Col;
var Row = Reactstrap.Row;
var Form = Reactstrap.Form;
var Button = Reactstrap.Button;
var FormGroup = Reactstrap.FormGroup;
var Label = Reactstrap.Label;
var Input = Reactstrap.Input;
var FormText = Reactstrap.FormText;

class Boletines extends React.Component {
    constructor(props) {
    	super(props);
    	this.state = {
    		boletines:[],
            boletin:[],
            rol: this.handleGetRol()
	  	}

	  	this.handleReload = this.handleReload.bind(this);
        this.handleChangeBoletin = this.handleChangeBoletin.bind(this);
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
        fetch('/server/index.php/boletines')
        .then((response) => {
        console.log(response);
            return response.json()
        })
        .then((data) => {
            console.log("handleReload");
            console.log(data);
            this.setState({ 
                boletines: data,
                boletin: {
                    idBoletin:0,
                    numero:"",
                    fecha:"",
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

    handleChangeBoletin(data) {
        this.setState({boletin: data})
    }

  render() {
    const content = ((this.state.rol === 'Periodista') || (this.state.rol === 'Jefe de redacción') || (this.state.rol === 'Administrador'))?
                      <Row className="appContainer">
                            <Col sm="12" md="12" lg="8" xl="8">
                                <BoletinesForm boletin={this.state.boletin} handleChangeData={this.handleChangeData}/>
                            </Col>
                            <Col sm="12" md="12" lg="4" xl="4">
                                <BoletinesList boletines={this.state.boletines} handleChangeBoletin={this.handleChangeBoletin}/>
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

ReactDOM.render(<Boletines/>, document.getElementById('root'));