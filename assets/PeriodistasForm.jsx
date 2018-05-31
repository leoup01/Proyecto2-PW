var Form = Reactstrap.Form;
var Button = Reactstrap.Button;
var FormGroup = Reactstrap.FormGroup;
var Label = Reactstrap.Label;
var Input = Reactstrap.Input;
var FormText = Reactstrap.FormText;
var Row = Reactstrap.Row;
var Col = Reactstrap.Col;

class PeriodistasForm extends React.Component {
    constructor(props) {
       super(props);
    this.state = {
        idPeriodista:"",
        usuario:"",
        //nombre:"",
        //correo:"",
        //pais:"",
        //edad:0,
        //genero:"Femenino",
        //rol:"Normal",
        telefono:"",
        ciudad:"",
        rol: this.props.rol
        //periodistas:[]
      }
      this.handleInsert = this.handleInsert.bind(this);
      this.handleUpdate = this.handleUpdate.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
      this.handleFields = this.handleFields.bind(this);
    }
    

    componentWillReceiveProps(nextProps) {
       this.setState({idPeriodista:nextProps.periodista.idPeriodista});
       this.setState({usuario:nextProps.periodista.usuario});
       //this.setState({nombre:nextProps.periodista.nombre});
       //this.setState({correo:nextProps.periodista.correo});
       //this.setState({pais:nextProps.periodista.pais});
       //this.setState({genero:nextProps.periodista.edad});
       this.setState({rol:nextProps.rol});
       this.setState({telefono:nextProps.periodista.telefono});
       this.setState({ciudad:nextProps.periodista.ciudad});
       //this.setState({periodistas:nextProps.periodista.periodistas});
       console.log("NEXTPROPS");
       console.log(this.state);
       console.log(this.nextProps);
    }

    handleInsert() {
      console.log("INSERT PERIODISTA");
      fetch("/server/index.php/periodistas/1",{
              method: "post",
              headers: {'Content-Type': 'application/json',
                                 'Content-Length': 20},
              body: JSON.stringify({
                  method: 'put',
                  telefono: this.state.telefono,
                  ciudad: this.state.ciudad,
                  usuario:this.state.usuario
                         })
      }).then((response) => {
              //localStorage.setItem('regres', response.json());
              //window.location.href = "/login";
             this.props.handleChangeData();
             console.log("INSERT END");
             //console.log(this.props);
             //console.log(this.state);
             //aux = this.handleGetLast();
           }
      );
    }

    handleUpdate() {
        console.log("UPDATEPERIODISTA");
        console.log(this.state);
        fetch("/server/index.php/periodistas/"+this.state.idPeriodista,{
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                method: 'post',
                telefono: this.state.telefono,
                ciudad: this.state.ciudad,
                usuario: this.state.usuario
        })
     }).then((response) => {
           this.props.handleChangeData();
           console.log("UPDATED PERIODISTA");
           //this.forceUpdate();
         }
    );
    }

    handleDelete() {
      console.log("DELETE");
        fetch("/server/index.php/periodistas/"+this.state.idPeriodista,{
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ method: 'delete'})
        }).then((response) => {
            //localStorage.removeItem("userIdLS");
           this.props.handleChangeData();
           //window.location.href = "/index";
           //this.forceUpdate();
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
      console.log("RENDER PERIODISTASFORM");
      console.log(this.state);
      const buttonsAdmin = (this.state.rol === 'Administrador')?
                      <div>
                        <Button onClick={this.handleInsert} className="button button1">Agregar</Button>
                        <Button onClick={this.handleUpdate} className="button button2">Modificar</Button>
                        <Button onClick={this.handleDelete} className="button button3">Eliminar</Button>
                      </div>
                      :null;
        return(
          <div>
            <h2>Manejo de periodistas</h2>
              <Form>
                <Row>
                  <Col sm="12" md="12" lg="4" xl="4">
                    <div className="form-group">
                      <Label for="usuarioInput" className="form-label">Usuario</Label>  
                          <Input
                            type="text"
                            name="usuario"
                            className="form-control"
                            value={this.state.usuario}
                            onChange={this.handleFields}/> 
                    </div>
                  </Col>
                  <Col sm="12" md="12" lg="4" xl="4">
                    <div className="form-group">
                      <Label for="ciudadInput" className="form-label">Ciudad</Label>  
                          <Input
                            type="text"
                            name="ciudad"
                            className="form-control"
                            value={this.state.ciudad}
                            onChange={this.handleFields}/> 
                    </div>
                  </Col>
                  <Col sm="12" md="12" lg="4" xl="4">
                    <div className="form-group">
                      <Label for="telefonoInput" className="form-label">Teléfono</Label>  
                          <Input
                            type="text"
                            name="telefono"
                            className="form-control"
                            value={this.state.telefono}
                            onChange={this.handleFields}/> 
                    </div>
                  </Col>
                </Row>
                
                <Input type="hidden" name="id" value={this.state.idPeriodista}/>
                {buttonsAdmin}
              </Form>
          </div>
           );
    }
}