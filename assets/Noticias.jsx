var Container = Reactstrap.Container;
var Col = Reactstrap.Col;
var Row = Reactstrap.Row;
var Form = Reactstrap.Form;
var Button = Reactstrap.Button;
var FormGroup = Reactstrap.FormGroup;
var Label = Reactstrap.Label;
var Input = Reactstrap.Input;
var FormText = Reactstrap.FormText;

class Noticias extends React.Component {
    constructor(props) {
    	super(props);
    	this.state = {
    		noticias:[],
            noticia:[],
            checkedCats: [-1],
            rol: this.handleGetRol()
	  	}

	  	this.handleReload = this.handleReload.bind(this);
        this.handleChangeNoticia = this.handleChangeNoticia.bind(this);
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
        fetch('/server/index.php/noticias')
        .then((response) => {
        console.log(response);
            return response.json()
        })
        .then((data) => {
            console.log("handleReload");
            console.log(data);
            this.setState({ noticias: data,
                            noticia: {
                                idNoticia:"",
                                fecha:"",
                                lugar:"",
                                titulo:"",
                                cuerpo:"",
                                periodista: 1,
                                agencia: 1,
                                boletin: 1
                        },
                        checkedCats: [-1]
            });
        });
    }
    
    componentWillMount() {
        this.handleReload();
    }

    handleChangeData(){
        this.handleReload();
    }

    handleChangeNoticia(data) {
        fetch('/server/index.php/clasificadas?noticia='+data.idNoticia)
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((response) => {
            console.log("CLASIFICADAS SON: ");
            console.log(response);
            let checkedCats = [];
            for(let i=0;i<response.length;i++){
                checkedCats[response[i].categoria] = true;
            }
            this.setState({
                noticia: data,
                checkedCats: checkedCats
            })
        });        
    }

  render() {
    const content = ((this.state.rol === 'Periodista') || (this.state.rol === 'Jefe de redacción') || (this.state.rol === 'Administrador'))?
                      <Row className="appContainer">
                            <Col sm="12" md="12" lg="8" xl="8">
                                <NoticiasForm noticia={this.state.noticia} checkedCats={this.state.checkedCats} handleChangeData={this.handleChangeData}/>
                            </Col>
                            <Col sm="12" md="12" lg="4" xl="4">
                                <NoticiasList noticias={this.state.noticias} handleChangeNoticia={this.handleChangeNoticia}/>
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

ReactDOM.render(<Noticias/>, document.getElementById('root'));