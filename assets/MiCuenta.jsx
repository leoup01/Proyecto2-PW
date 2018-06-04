var Container = Reactstrap.Container;
var Col = Reactstrap.Col;
var Row = Reactstrap.Row;
var Form = Reactstrap.Form;
var Button = Reactstrap.Button;
var FormGroup = Reactstrap.FormGroup;
var Label = Reactstrap.Label;
var Input = Reactstrap.Input;
var FormText = Reactstrap.FormText;

class MiCuenta extends React.Component {
    constructor(props) {
    	super(props);
    	this.state = {
            usuario:[],
            checkedCats: [-1]
	  	}

	  	this.handleReload = this.handleReload.bind(this);
	  	this.handleChangeData = this.handleChangeData.bind(this);
  	}

  	handleReload() {
      console.log("handleReload MiCuenta");
          const user = localStorage.getItem('userIdLS');
          //const user = (userLS === null)?"":userLS;
          console.log("user: "+user);
          if(user !== null){
            let cats = [];
            fetch('/server/index.php/preferidas?usuario='+user)
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((response) =>{
                for(let i=0;i<response.length;i++){
                    cats[response[i].categoria] = true;
                }
            })
            .then((response) => {
                fetch('/server/index.php/usuarios/'+ user)
                .then((response) => {
                    //console.log(response);
                    return response.json();
                })
                .then((data) => {
                    //console.log("handleReload");
                    //console.log(data);
                    //console.log(data[0]);
                    this.setState({ 
                        usuario: data[0],
                        checkedCats: cats
                     });
                    this.forceUpdate();
                });
            });            
          }        
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
        			<MiCuentaForm usuario={this.state.usuario} checkedCats={this.state.checkedCats} handleChangeData={this.handleChangeData}/>
        		</Col>
        	</Row>
        </div>

    );
  }
 }

ReactDOM.render(<MiCuenta/>, document.getElementById('root'));