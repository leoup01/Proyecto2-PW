var Container = Reactstrap.Container;
var Col = Reactstrap.Col;
var Row = Reactstrap.Row;
var Form = Reactstrap.Form;
var Button = Reactstrap.Button;
var FormGroup = Reactstrap.FormGroup;
var Label = Reactstrap.Label;
var Input = Reactstrap.Input;
var FormText = Reactstrap.FormText;
var LineChart = ReactChartkick.LineChart;
var ColumnChart = ReactChartkick.ColumnChart;
var PieChart = ReactChartkick.PieChart;

class Estadisticas extends React.Component {
    constructor(props) {
    	super(props);
    	this.state = {
            noticias:[],
            dataByDay: {},
            dataByPlace: {},
            dataByJournalist: {},
            dataByZone: {},
            dataByCategory: {},
            dataByPreference: {},
            rol: this.handleGetRol()
	  	}

	  	this.handleReload = this.handleReload.bind(this);
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

        fetch('/server/index.php/noticias',{
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                method: 'getNewsCountByDay'
            })
        })
        .then((response) => { return response.json(); })
        .then((data) => { 
            let dataAux = '{';
            data.forEach((item,index)=>{
                index === 0 ?
                    dataAux += '"'+item.fecha+'":'+item.cantidad
                :
                    dataAux += ',"'+item.fecha+'":'+item.cantidad
            }); 
            dataAux += '}'
            this.setState({dataByDay: JSON.parse(dataAux)});
        })

        fetch('/server/index.php/noticias',{
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                method: 'getNewsCountByPlace'
            })
        })
        .then((response) => { return response.json(); })
        .then((data) => { 
            let dataAux = data.map((item,index) =>
                [item.lugar,item.cantidad]
            );
            this.setState({dataByPlace: dataAux });
        })

        fetch('/server/index.php/noticias',{
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                method: 'getNewsCountByJournalist'
            })
        })
        .then((response) => { return response.json(); })
        .then((data) => { 
            console.log(data);
            let dataAux = data.map((item,index) =>
                [item.nombre,item.cantidad]
            );
            this.setState({dataByJournalist: dataAux });
        })

        fetch('/server/index.php/noticias',{
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                method: 'getNewsCountByZone'
            })
        })
        .then((response) => { return response.json(); })
        .then((data) => { 
            console.log(data);
            let dataAux = data.map((item,index) =>
                [item.nombre,item.cantidad]
            );
            this.setState({dataByZone: dataAux });
        })

        fetch('/server/index.php/noticias',{
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                method: 'getNewsCountByCategory'
            })
        })
        .then((response) => { return response.json(); })
        .then((data) => { 
            console.log(data);
            let dataAux = data.map((item,index) =>
                [item.nombre,item.cantidad]
            );
            this.setState({dataByCategory: dataAux });
        })

        fetch('/server/index.php/noticias',{
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                method: 'getCategoryPreference'
            })
        })
        .then((response) => { return response.json(); })
        .then((data) => { 
            console.log(data);
            let dataAux = data.map((item,index) =>
                [item.nombre,item.usuarios]
            );
            this.setState({dataByPreference: dataAux });
        })
    }

    componentWillMount() {
        this.handleReload();
    }

    handleChangeData(){
        this.handleReload();
    }

    handleChangeEstadistica(data) {
        this.setState({estadistica: data})
    }

  render() {
    const content = ((this.state.rol === 'Periodista') || (this.state.rol === 'Jefe de redacción') || (this.state.rol === 'Administrador'))?
                        <div>
                            <Row className="appContainer">
                                <Container>
                                    <Col sm="12" md="12" lg="12" xl="12">
                                        <h2>Noticias por Día</h2>
                                        <LineChart data={this.state.dataByDay} />
                                    </Col>
                                </Container>
                            </Row>
                            <Row className="appContainer">
                                    <Col sm="12" md="12" lg="6" xl="6">
                                        <h2>Noticias por Periodista</h2>
                                        <ColumnChart data={this.state.dataByJournalist} />
                                    </Col>
                                    <Col sm="12" md="12" lg="6" xl="6">
                                        <h2>Noticias por Lugar</h2>
                                        <ColumnChart data={this.state.dataByPlace} />
                                    </Col>
                            </Row>
                            <Row className="appContainer">
                                    <Col sm="12" md="12" lg="4" xl="4">
                                        <h2>Noticias por Zona</h2>
                                        <PieChart data={this.state.dataByZone} />
                                    </Col>
                                    <Col sm="12" md="12" lg="4" xl="4">
                                        <h2>Noticias por Categoría</h2>
                                        <PieChart data={this.state.dataByCategory} />
                                    </Col>
                                    <Col sm="12" md="12" lg="4" xl="4">
                                        <h2>Categorias Preferidas</h2>
                                        <PieChart data={this.state.dataByPreference} />
                                    </Col>
                            </Row>
                        </div>
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

ReactDOM.render(<Estadisticas/>, document.getElementById('root'));