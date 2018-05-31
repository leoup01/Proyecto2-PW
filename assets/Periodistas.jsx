var Container = Reactstrap.Container;
var Col = Reactstrap.Col;
var Row = Reactstrap.Row;
var Form = Reactstrap.Form;
var Button = Reactstrap.Button;
var FormGroup = Reactstrap.FormGroup;
var Label = Reactstrap.Label;
var Input = Reactstrap.Input;
var FormText = Reactstrap.FormText;

class Periodistas extends React.Component {
    constructor(props) {
    	super(props);
    	this.state = {
    		periodistas:[],
    		periodista:[],
	  	  rol: this.handleGetRol()
      }
      this.handleGetRol = this.handleGetRol.bind(this);
	  	this.handleReload = this.handleReload.bind(this);
	  	this.handleChangeData = this.handleChangeData.bind(this);
      this.handleChangePeriodista = this.handleChangePeriodista.bind(this);
	  	/*
	  	this.handleGetProducts = this.handleGetProducts.bind(this);
        this.handleGetReceipt = this.handleGetReceipt.bind(this);
        
        this.handleChangeReceipt = this.handleChangeReceipt.bind(this);
       
        this.handleFind = this.handleFind.bind(this);
         */
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
         fetch('/server/index.php/periodistas')
           .then((response) => {
           	console.log(response);
               return response.json()
           })
           .then((data) => {
           		console.log("handleReload");
           		console.log(data);
               this.setState({ periodistas: data });
               this.forceUpdate();
           })
    }

    handleChangePeriodista(data) {
            console.log("handleChangePeriodista");
            console.log(data);
           this.setState({periodista: data});
       }

    componentWillMount() {
        this.handleReload();
    }

    handleChangeData() {
        this.handleReload();
    }

  render() {
    return (
    	<div>
        	<Header/>
        	<Row className="appContainer">
        		<Col sm="12" md="12" lg="8" xl="8">
        			<PeriodistasForm periodista={this.state.periodista}
                handleChangeData={this.handleChangeData}
                rol={this.state.rol}/>
        		</Col>
        		<Col sm="12" md="12" lg="4" xl="4">
        			<PeriodistasList periodistas={this.state.periodistas} handleChangePeriodista={this.handleChangePeriodista}/>
        		</Col>
        	</Row>
        </div>

    );
  }
 }

ReactDOM.render(<Periodistas/>, document.getElementById('root'));