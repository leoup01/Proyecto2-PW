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
            boletin:[]
	  	}

	  	this.handleReload = this.handleReload.bind(this);
        this.handleChangeBoletin = this.handleChangeBoletin.bind(this);
        this.handleChangeData = this.handleChangeData.bind(this);
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
    return (
    	<div>
        	<Header/>
        	<Row className="appContainer">
        		<Col sm="12" md="12" lg="8" xl="8">
        			<BoletinesForm boletin={this.state.boletin} handleChangeData={this.handleChangeData}/>
        		</Col>
        		<Col sm="12" md="12" lg="4" xl="4">
        			<BoletinesList boletines={this.state.boletines} handleChangeBoletin={this.handleChangeBoletin}/>
        		</Col>
        	</Row>
        </div>

    );
  }
 }

ReactDOM.render(<Boletines/>, document.getElementById('root'));