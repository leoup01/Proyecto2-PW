var Form = Reactstrap.Form;
var Button = Reactstrap.Button;
var FormGroup = Reactstrap.FormGroup;
var Label = Reactstrap.Label;
var Input = Reactstrap.Input;
var FormText = Reactstrap.FormText;
var Row = Reactstrap.Row;
var Col = Reactstrap.Col;

class CategoriasForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idCategoria:"",
            nombre:"",
            zona:"",
            encargado:"",
            categorias:[],
            periodistas: []
        }
        this.handleInsert = this.handleInsert.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleFields = this.handleFields.bind(this);
    }
    
    componentDidMount(){
      fetch('/server/index.php/periodistas')
        .then((response) => {
        console.log(response);
            return response.json()
        })
        .then((data) => {
            console.log("PERIDISTAS SON:");
            console.log(data);
            this.setState({ periodistas: data });
        });
    }

    componentWillReceiveProps(nextProps) {
       this.setState({idCategoria:nextProps.categoria.idCategoria});
       this.setState({nombre:nextProps.categoria.nombre});
       this.setState({zona:nextProps.categoria.zona});
       this.setState({encargado:nextProps.categoria.encargado});
       this.setState({categorias:nextProps.categoria.categorias});
    }

    handleInsert() {
      console.log("INSERT");
      console.log(this.state);
      fetch("/server/index.php/categorias/"+this.state.idCategoria,{
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            method: 'put',
            idCategoria: this.state.idCategoria,
            nombre: this.state.nombre,
            zona: this.state.zona,
            encargado: this.state.encargado
                   })
      }).then((response) => {
            console.log("THE FUCKING RESPONSE IS:");
            console.log(response);
            this.props.handleChangeData();
        }
      );
    }

    handleUpdate() {
      console.log("UPDATE");
      console.log(this.state);
      console.log(this.state.idCategoria);
      fetch("/server/index.php/categorias/"+this.state.idCategoria,{
          method: "post",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              idCategoria: this.state.idCategoria,
              nombre: this.state.nombre,
              zona: this.state.zona,
              encargado: this.state.encargado
          })
      }).then((response) => {
            console.log(response);
            console.log(this.props);
            this.props.handleChangeData();
          }
      );
    }

    handleDelete() {
      fetch("/server/index.php/categorias/"+this.state.idCategoria,{
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ method: 'delete'})
      }).then((response) => {
          this.props.handleChangeData();
        }
      );
    }

    handleFields(event) {
     const target = event.target;
     const value = target.value;
     const name = target.name;
     this.setState({[name]: value});
    }

    render() {

      const opts = this.state.periodistas.map((periodista) => 
        <option value={periodista.idPeriodista}>{periodista.nombre}</option>
      );
      console.log("RENDER CATEGORIASFORM");
      console.log(this.state);
        return(
          <div>
            <h2>Manejo de categorias</h2>
              <Form>
                <Row>                  
                  <Col sm="12" md="12" lg="4" xl="4">
                    <div className="form-group">
                      <Label for="nombreInput" className="form-label">Nombre</Label>  
                          <Input
                            type="text"
                            name="nombre"
                            className="form-control"
                            value={this.state.nombre}
                            onChange={this.handleFields}/> 
                    </div>
                  </Col>
                  <Col sm="12" md="12" lg="4" xl="4">
                    <div className="form-group">
                      <Label for="zonaInput" className="form-label">Zona</Label>  
                          <Input
                            type="text"
                            name="zona"
                            className="form-control"
                            value={this.state.zona}
                            onChange={this.handleFields}/> 
                    </div>
                  </Col>
                </Row>
                <Row>                 
                  <Col sm="12" md="12" lg="4" xl="4">
                    <div className="form-group">
                      <Label for="encargadoNomInput" className="form-label">Encargado</Label>  
                          <Input
                            type="select"
                            name="encargado"
                            className="form-control"
                            value={this.state.encargado}
                            onChange={this.handleFields}
                            > 
                             {opts}
                            </Input>
                    </div>
                  </Col>
                </Row>
                
                <Input type="hidden" name="id" value={this.state.userId}/>

                     <Button onClick={this.handleInsert} className="button button1">Agregar</Button>
                     <Button onClick={this.handleUpdate} className="button button2">Modificar</Button>
                     <Button onClick={this.handleDelete} className="button button3">Eliminar</Button>
              </Form>
          </div>
           );
    }
}