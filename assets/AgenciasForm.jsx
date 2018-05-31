var Form = Reactstrap.Form;
var Button = Reactstrap.Button;
var FormGroup = Reactstrap.FormGroup;
var Label = Reactstrap.Label;
var Input = Reactstrap.Input;
var FormText = Reactstrap.FormText;
var Row = Reactstrap.Row;
var Col = Reactstrap.Col;

class AgenciasForm extends React.Component {
    constructor(props) {
       super(props);
    this.state = {
        idAgencia:"",
        nombre:"",
        pais:"",
        especialidad:"",
        telefono:"",
        correo:"",
        rol: this.props.rol
        //periodistas:[]
      }
      this.handleInsert = this.handleInsert.bind(this);
      this.handleUpdate = this.handleUpdate.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
      this.handleFields = this.handleFields.bind(this);
      this.handleResetForm = this.handleResetForm.bind(this);
    }
    

    componentWillReceiveProps(nextProps) {
       this.setState({idAgencia:nextProps.agencia.idAgencia});
       this.setState({nombre:nextProps.agencia.nombre});
       this.setState({pais:nextProps.agencia.pais});
       this.setState({especialidad:nextProps.agencia.especialidad});
       this.setState({telefono:nextProps.agencia.telefono});
       this.setState({correo:nextProps.agencia.correo});
       this.setState({rol:nextProps.rol});
       console.log("NEXTPROPS");
       console.log(this.state);
       console.log(this.nextProps);
    }

    handleResetForm (){
      this.setState({idAgencia:"",
        nombre:"",
        pais:"",
        especialidad:"",
        telefono:"",
        correo:""
      });
    }
    handleInsert() {
      console.log("INSERT AGENCIA");
      fetch("/server/index.php/agencias/1",{
              method: "post",
              headers: {'Content-Type': 'application/json',
                                 'Content-Length': 20},
              body: JSON.stringify({
                  method: 'put',
                  nombre: this.state.nombre,
                  pais: this.state.pais,
                  especialidad: this.state.especialidad,
                  telefono: this.state.telefono,
                  correo:this.state.correo
                         })
      }).then((response) => {
              //localStorage.setItem('regres', response.json());
              //window.location.href = "/login";
              console.log("REFS");
              console.log(this.refs);
              //this.refs.form.reset();
              
             this.props.handleChangeData();
             this.props.handleChangeAgencia([]);
              this.handleResetForm();

             //document.getElementById("form-react").reset();
             
             console.log("INSERT END");
             //this.forceUpdate();
             //console.log(this.props);
             //console.log(this.state);
             //aux = this.handleGetLast();
           }
      );
    }

    handleUpdate() {
        console.log("UPDATEPERIODISTA");
        console.log(this.state);
        fetch("/server/index.php/agencias/"+this.state.idAgencia,{
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                method: 'post',
                nombre: this.state.nombre,
                pais: this.state.pais,
                especialidad: this.state.especialidad,
                telefono: this.state.telefono,
                correo:this.state.correo
        })
     }).then((response) => {
           this.props.handleChangeData();
           this.props.handleChangeAgencia([]);
              this.handleResetForm();
           console.log("UPDATED PERIODISTA");
           //this.forceUpdate();
         }
    );
    }

    handleDelete() {
      console.log("DELETE");
        fetch("/server/index.php/agencias/"+this.state.idAgencia,{
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ method: 'delete'})
        }).then((response) => {
            //localStorage.removeItem("userIdLS");
            
           this.props.handleChangeData();
           this.props.handleChangeAgencia([]);
           this.handleResetForm();

           //document.getElementById("form-react").reset();
           
           //this.forceUpdate();
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
      console.log("RENDER AGENCIASFORM");
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
            <h2>Manejo de Agencias</h2>
              <Form id="form-react">
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
                      <Label for="paisInput" className="form-label">País</Label>  
                          <Input
                            type="text"
                            name="pais"
                            className="form-control"
                            value={this.state.pais}
                            onChange={this.handleFields}/> 
                    </div>
                  </Col>
                  <Col sm="12" md="12" lg="4" xl="4">
                    <div className="form-group">
                      <Label for="especialidadInput" className="form-label">Especialidad</Label>  
                          <Input
                            type="text"
                            name="especialidad"
                            className="form-control"
                            value={this.state.especialidad}
                            onChange={this.handleFields}/> 
                    </div>
                  </Col>
                </Row>
                <Row>
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
                  <Col sm="12" md="12" lg="4" xl="4">
                    <div className="form-group">
                      <Label for="correoInput" className="form-label">Correo</Label>  
                          <Input
                            type="text"
                            name="correo"
                            className="form-control"
                            value={this.state.correo}
                            onChange={this.handleFields}/> 
                    </div>
                  </Col>
                </Row>
                
                <Input type="hidden" name="id" value={this.state.idAgencia}/>
                {buttonsAdmin}
              </Form>
          </div>
           );
    }
}