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
            noticia:[]
	  	}

	  	this.handleReload = this.handleReload.bind(this);
        this.handleChangeNoticia = this.handleChangeNoticia.bind(this);
        this.handleChangeData = this.handleChangeData.bind(this);
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
            this.setState({ noticias: data });
        });
    }

    componentWillMount() {
        this.handleReload();
    }

    handleChangeData(){
        this.handleReload();
    }

    handleChangeNoticia(data) {
        console.log("CURRENT NOTICIA IS:");
        console.log(data);
        this.setState({noticia: data})
    }

  render() {
    return (
    	<div>
        	<Header/>
        	<Row className="appContainer">
        		<Col sm="12" md="12" lg="8" xl="8">
        			<NoticiasForm noticia={this.state.noticia} handleChangeData={this.handleChangeData}/>
        		</Col>
        		<Col sm="12" md="12" lg="4" xl="4">
        			<NoticiasList noticias={this.state.noticias} handleChangeNoticia={this.handleChangeNoticia}/>
        		</Col>
        	</Row>
        </div>

    );
  }
 }

ReactDOM.render(<Noticias/>, document.getElementById('root'));