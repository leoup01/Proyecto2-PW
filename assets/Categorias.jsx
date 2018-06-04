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
            categoria:[]
	  	}

	  	this.handleReload = this.handleReload.bind(this);
        this.handleChangeCategoria = this.handleChangeCategoria.bind(this);
        this.handleChangeData = this.handleChangeData.bind(this);
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
                    encargado:"",
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
    return (
    	<div>
        	<Header/>
        	<Row className="appContainer">
        		<Col sm="12" md="12" lg="8" xl="8">
        			<CategoriasForm categoria={this.state.categoria} handleChangeData={this.handleChangeData}/>
        		</Col>
        		<Col sm="12" md="12" lg="4" xl="4">
        			<CategoriasList categorias={this.state.categorias} handleChangeCategoria={this.handleChangeCategoria}/>
        		</Col>
        	</Row>
        </div>

    );
  }
 }

ReactDOM.render(<Categorias/>, document.getElementById('root'));