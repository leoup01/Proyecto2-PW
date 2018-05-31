var Form = Reactstrap.Form;
var Button = Reactstrap.Button;
var FormGroup = Reactstrap.FormGroup;
var Label = Reactstrap.Label;
var Input = Reactstrap.Input;
var FormText = Reactstrap.FormText;
var Row = Reactstrap.Row;
var Col = Reactstrap.Col;

class BoletinesForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idBoletin:0,
            numero:"",
            fecha:"",
            boletines:[]
        }
        this.handleInsert = this.handleInsert.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleFields = this.handleFields.bind(this);
    }
    
    componentWillReceiveProps(nextProps) {
       this.setState({idBoletin:nextProps.boletin.idBoletin});
       this.setState({numero:nextProps.boletin.numero});
       this.setState({fecha:nextProps.boletin.fecha});
       this.setState({boletines:nextProps.boletin.boletines});
    }

    handleInsert() {
      console.log("INSERT");
      console.log(this.state);
      fetch("/server/index.php/boletines/"+this.state.idBoletin,{
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            method: 'put',
            idBoletin: this.state.idBoletin,
            numero: this.state.numero,
            fecha: this.state.fecha
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
      console.log(this.state.idBoletin);
      fetch("/server/index.php/boletines/"+this.state.idBoletin,{
          method: "post",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              idBoletin: this.state.idBoletin,
              numero: this.state.numero,
              fecha: this.state.fecha
          })
      }).then((response) => {
            console.log(response);
            console.log(this.props);
            this.props.handleChangeData();
          }
      );
    }

    handleDelete() {
      fetch("/server/index.php/boletines/"+this.state.idBoletin,{
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

      console.log("RENDER BOLETINESFORM");
      console.log(this.state);
        return(
          <div>
            <h2>Manejo de boletines</h2>
              <Form>
                <Row>                  
                  <Col sm="12" md="12" lg="4" xl="4">
                    <div className="form-group">
                      <Label for="numeroInput" className="form-label">Numero</Label>  
                          <Input
                            type="number"
                            name="numero"
                            min="1"
                            className="form-control"
                            value={this.state.numero}
                            onChange={this.handleFields}/> 
                    </div>
                  </Col>
                  <Col sm="12" md="12" lg="4" xl="4">
                    <div className="form-group">
                      <Label for="fechaInput" className="form-label">Fecha</Label>  
                          <Input
                            type="date"
                            name="fecha"
                            className="form-control"
                            value={this.state.fecha}
                            onChange={this.handleFields}/> 
                    </div>
                  </Col>
                </Row>
                
                <Input type="hidden" name="id" value={this.state.idBoletin}/>

                     <Button onClick={this.handleInsert} className="button button1">Agregar</Button>
                     <Button onClick={this.handleUpdate} className="button button2">Modificar</Button>
                     <Button onClick={this.handleDelete} className="button button3">Eliminar</Button>
              </Form>
          </div>
           );
    }
}