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
            periodistas:[],
            leido: false,
            user: "",
            unread: []        
	  	}

	  	this.handleReload = this.handleReload.bind(this);
        this.handleChangeBoletin = this.handleChangeBoletin.bind(this);
        this.handleChangeData = this.handleChangeData.bind(this);
        this.handleGetNoticias = this.handleGetNoticias.bind(this);
        this.handleGetPeriodistas = this.handleGetPeriodistas.bind(this);
  	}

  	handleReload() {
        /*fetch('/server/index.php/boletines')
        .then((response) => {
        console.log(response);
            return response.json()
        })
        .then((data) => {
            console.log("handleReload");
            console.log(data);
            let usuario = localStorage.getItem('userIdLS');
            this.setState({ 
                boletines: data,
                user: usuario
            });
        });*/

        let currentUser = localStorage.getItem('userIdLS');
        let bols = [];
        fetch('/server/index.php/boletines')
        .then((response) => {
        console.log(response);
            return response.json();
        })
        .then((data) => {  
            this.setState({boletines: data});       
            fetch("/server/index.php/vistos",{
                method: "post",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    method: 'getUnread',
                    usuario: currentUser
                })
            }).then((response) => {
                return response.json();
            })
            .then((data) => {
                return data.map((item) => {
                    return item.idBoletin;
                });
            }).then((response) => {
                console.log("BOLETINES SONNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN:");
                console.log(bols);
                this.setState({ 
                    user: currentUser,
                    unread: response
                }); 
                console.log("ESTADO ESSSSSSSSSSSSSSSSSSSSSSSSSSS:");
                console.log(this.state);
            });
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

        fetch('/server/index.php/vistos?usuario='+this.state.user+'&boletin='+data.idBoletin)
            .then((response) => {
                return response.json();
            }).then((response) => {
                console.log("LA RESPUESTA ES: ");
                console.log(response);
                if(response.length === 0){
                    this.setState({
                        boletin: data,
                        leido: false
                    });
                    console.log(data.idBoletin);
                    this.handleGetNoticias(data.idBoletin);
                }else{
                    this.setState({
                        boletin: data,
                        leido: true
                    });
                    console.log(data.idBoletin);
                    this.handleGetNoticias(data.idBoletin);
                }
            });

            /********************
        console.log("handleChangeBoletin");
        
        this.setState({boletin: data});
        console.log(data.idBoletin);
        this.handleGetNoticias(data.idBoletin);
        //this.handleGetNoticias
        ***********************/
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
                        handleChangeBoletin={this.handleChangeBoletin}
                        handleChangeData={this.handleChangeData}
                        boletin={this.state.boletin.idBoletin}
                        user={this.state.user}
                        leido={this.state.leido}/>                         
                </Col>
        		<Col sm="12" md="12" lg="4" xl="4">
                    <h2>Boletines</h2>
        			<BoletinesDetalleList boletines={this.state.boletines} unread={this.state.unread} handleChangeBoletin={this.handleChangeBoletin}/>
        		</Col>
        	</Row>
        </div>

    );
  }
 }

ReactDOM.render(<Boletines/>, document.getElementById('root'));