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
            noticias:[],
            periodistas:[]
	  	}

	  	this.handleReload = this.handleReload.bind(this);
        this.handleChangeBoletin = this.handleChangeBoletin.bind(this);
        this.handleChangeData = this.handleChangeData.bind(this);
        this.handleGetNoticias = this.handleGetNoticias.bind(this);
        this.handleGetPeriodistas = this.handleGetPeriodistas.bind(this);
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
            this.setState({ boletines: data });
        });
    }

    handleGetNoticias(id) {
          fetch('/server/index.php/noticias/'+id,{
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                method: 'getByBoletin'
            })
        })
               .then((response) => {
                   return response.json()
               })
               .then((data) => {
                  console.log("result handleGetNoticias");
                  console.log(data);
                   this.setState({ noticias: data });
                   return data;
                   //this.forceUpdate();
             }).then((data) => {
                  console.log("result handleGetNoticias Periodistas");
                  console.log(data);
                   this.handleGetPeriodistas(data);
                   //this.forceUpdate();
             }).catch((error)=>{
                console.log("ERROR handleGetNoticias");
                //this.handleGetReceipt(null);
             })
      }

      handleGetPeriodistas(noticias) {
        console.log("handleGetPeriodistas");
        //let periodistasAux = this.state.periodistas;
        noticias.map((noticia, index) => {
            this.handleGetPeriodistaNombre(noticia.periodista);
            //periodistasAux.push(noticia.periodista);
            //console.log(periodistasAux);
        });
      }

      handleGetPeriodistaNombre(id) {
              fetch('/server/index.php/periodistas/'+id)
               .then((response) => {
                console.log(response);
                   return response.json()
               })
               .then((data) => {
                  console.log("handleGetPeriodista Nombre");
                   console.log(data[0].nombre);
                   let periodistasAux = this.state.periodistas;
                   periodistasAux.push(data[0].nombre);
                   console.log("periodistasAux");
                   console.log(periodistasAux);
                   this.setState({ periodistas: periodistasAux });
               });
            }



    componentWillMount() {
        this.handleReload();
    }

    handleChangeData(){
        this.handleReload();
    }

    handleChangeBoletin(data) {
        console.log("handleChangeBoletin");
        
        this.setState({boletin: data});
        console.log(data.idBoletin);
        this.handleGetNoticias(data.idBoletin);
        //this.handleGetNoticias
    }

  render() {
    return (
    	<div>
        	<Header/>
        	<Row className="appContainer">
        		<Col sm="12" md="12" lg="8" xl="8">
                    <h2>Detalle de noticias del boletin</h2>
                    <BoletinesDetalleNoticiasList
                        noticias={this.state.noticias}
                        periodistas={this.state.periodistas}
                        handleChangeBoletin={this.handleChangeBoletin}/>
                </Col>
        		<Col sm="12" md="12" lg="4" xl="4">
                    <h2>Boletines</h2>
        			<BoletinesDetalleList boletines={this.state.boletines} handleChangeBoletin={this.handleChangeBoletin}/>
        		</Col>
        	</Row>
        </div>

    );
  }
 }

ReactDOM.render(<Boletines/>, document.getElementById('root'));