var Container = Reactstrap.Container;
var Col = Reactstrap.Col;
var Row = Reactstrap.Row;
var Form = Reactstrap.Form;
var Button = Reactstrap.Button;
var FormGroup = Reactstrap.FormGroup;
var Label = Reactstrap.Label;
var Input = Reactstrap.Input;
var FormText = Reactstrap.FormText;

class Dashboard extends React.Component {
    constructor(props) {
    	super(props);
    	this.state = {
    		boletines:[],
            boletin:[],
            noticias:[],
            periodistas:[],
            leido: false,
            user: "",
            unread: [],
            noticiasCount:0,
            boletinesCount:0,
            periodistasCount:0,
            categoriasCount:0,
            agenciasCount:0      
	  	}

	  	this.handleReload = this.handleReload.bind(this);
        this.handleChangeBoletin = this.handleChangeBoletin.bind(this);
        this.handleChangeData = this.handleChangeData.bind(this);
        this.handleGetNoticias = this.handleGetNoticias.bind(this);
        this.handleGetPeriodistas = this.handleGetPeriodistas.bind(this);
        this.handleGetInfo = this.handleGetInfo.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
  	}

    handleGetInfo (){
      fetch('/server/index.php/noticias')
           .then((response) => {
            console.log(response);
               return response.json()
           })
           .then((data) => {
               this.setState({ noticiasCount: data.length });
        });
      fetch('/server/index.php/periodistas')
           .then((response) => {
            console.log(response);
               return response.json()
           })
           .then((data) => {
               this.setState({ periodistasCount: data.length });
      });
      fetch('/server/index.php/categorias')
           .then((response) => {
            console.log(response);
               return response.json()
           })
           .then((data) => {
               this.setState({ categoriasCount: data.length });
      });
      fetch('/server/index.php/agencias')
           .then((response) => {
            console.log(response);
               return response.json()
           })
           .then((data) => {
               this.setState({ agenciasCount: data.length });
      });
    }

  	handleReload() {
        let currentUser = localStorage.getItem('userIdLS');
        let bols = [];
        this.handleGetInfo();
        this.handleGetNoticias();

        fetch('/server/index.php/boletines')
        .then((response) => {
        console.log(response);
            return response.json();
        })
        .then((data) => {  
            this.setState({boletines: data}); 
            this.setState({ boletinesCount: data.length });      
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
                this.setState({ 
                    user: currentUser,
                    unread: response
                }); 
            });
        });               
    }

    handleSearch(searchTerm) {
        console.log("SEARCH TERM IS: ");
        console.log(searchTerm);
        fetch('/server/index.php/noticias',{
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                method: 'search',
                term: searchTerm
            })
        }).then((response) => {
            return response.json();
        }).then((data) => {
            this.setState({ noticias: data });
       });
    }

    handleGetNoticias() {
          fetch('/server/index.php/noticias/',{
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                method: 'getLatest'
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
                    this.handleGetNoticias();
                }else{
                    this.setState({
                        boletin: data,
                        leido: true
                    });
                    console.log(data.idBoletin);
                    this.handleGetNoticias();
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
        	<Header handleSearch={this.handleSearch}/>
        	<Row className="appContainer">
        		<Col sm="12" md="12" lg="8" xl="8">
                    <h2>Últimas noticias</h2>
                    <BoletinesDetalleNoticiasList
                        noticias={this.state.noticias}
                        periodistas={this.state.periodistas}
                        handleChangeBoletin={this.handleChangeBoletin}
                        handleChangeData={this.handleChangeData}
                        boletin={this.state.boletin.idBoletin}
                        user={this.state.user}
                        leido={this.state.leido}
                        hiddenRead='true'/>                         
                </Col>
        		<Col sm="12" md="12" lg="4" xl="4">
                    <h2>Información de la página</h2>
                      <DashboardCard imagen="assets/user-icon.png" title="Visita tu cuenta" result="Bienvenido" link="/micuenta"/>
                      <DashboardCard imagen="assets/news-icon.png" title="Noticias" result={this.state.noticiasCount} link="/boletinesDetalle"/>
                      <DashboardCard imagen="assets/boletin-icon.png" title="Boletines" result={this.state.boletinesCount} link="/boletinesDetalle"/>
                      <DashboardCard imagen="assets/periodista-icon.png" title="Periodistas" result={this.state.periodistasCount} link="/periodistas"/>
                      <DashboardCard imagen="assets/categorias-icon.png" title="Categorias" result={this.state.categoriasCount} link="/categorias"/>
                      <DashboardCard imagen="assets/agencias-icon.png" title="Agencias" result={this.state.agenciasCount} link="/agencias"/>

        			     
        		</Col>
        	</Row>
        </div>

    );
  }
 }

ReactDOM.render(<Dashboard/>, document.getElementById('root'));