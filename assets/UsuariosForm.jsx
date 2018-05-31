var Form = Reactstrap.Form;
var Button = Reactstrap.Button;
var FormGroup = Reactstrap.FormGroup;
var Label = Reactstrap.Label;
var Input = Reactstrap.Input;
var FormText = Reactstrap.FormText;
var Row = Reactstrap.Row;
var Col = Reactstrap.Col;

class UsuariosForm extends React.Component {
    constructor(props) {
       super(props);
    this.state = {
        userId:"",
        //password:"",
        //nombre:"",
        //correo:"",
        //pais:"",
        //edad:0,
        //genero:"Femenino",
        rol:"Normal"
      }
      //this.handleInsert = this.handleInsert.bind(this);
      this.handleUpdate = this.handleUpdate.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
      this.handleFields = this.handleFields.bind(this);
      //this.handleGetLast = this.handleGetLast.bind(this);
    }
    
    componentWillReceiveProps(nextProps) {
       this.setState({userId:nextProps.usuario.userId});
       //this.setState({password:nextProps.usuario.password});
       //this.setState({nombre:nextProps.usuario.nombre});
       //this.setState({correo:nextProps.usuario.correo});
       //this.setState({edad:nextProps.usuario.edad});
       //this.setState({pais:nextProps.usuario.pais});
       //this.setState({genero:nextProps.usuario.genero});
       this.setState({rol:nextProps.usuario.rol});
       //console.log("NEXTPROPS");
       //console.log(this.state);
       //console.log(this.nextProps);
    }

    handleUpdate() {
        console.log("UPDATEUsuario");
        console.log(this.state);
        fetch("/server/index.php/usuarios/"+this.state.userId,{
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                method: 'postrole',
                rol: this.state.rol
        })
     }).then((response) => {
           this.props.handleChangeData();
           console.log("UPDATED TEST");
           //this.forceUpdate();
         }
    );
    }

    handleDelete() {
        console.log("DELETE");
        fetch("/server/index.php/usuarios/"+this.state.userId,{
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
      console.log("RENDER USUARIOSFORM");
      console.log(this.state);
      if (this.state.userId !== "") {
        return(
          <div>
            <h2>Gestión de Usuario</h2>
              <Form>
                <Row>
                  <Col sm="12" md="12" lg="12" xl="12">
                    <div className="form-group">
                      <Label for="userIdInput" className="form-label">Usuario</Label>  
                          <Input
                            type="text"
                            name="userId"
                            className="form-control"
                            value={this.state.userId}
                            onChange={this.handleFields}
                            readOnly/> 
                    </div>
                  </Col>
                  
                  <Col sm="12" md="12" lg="12" xl="12">
                    <div className="form-group">
                      <Label for="rolInput" className="form-label">Genero</Label>  
                          <Input
                            type="select"
                            name="rol"
                            className="form-control"
                            value={this.state.rol}
                            onChange={this.handleFields}>
                            <option>Normal</option>
                            <option>Administrador</option>
                          </Input> 
                    </div>
                  </Col>
                </Row>
                
                <Input type="hidden" name="id" value={this.state.userId}/>
                     <Button onClick={this.handleUpdate} className="button button2">Actualizar rol de usuario</Button>
                     <Button onClick={this.handleDelete} className="button button3">Eliminar usuario</Button>
              </Form>
          </div>
        );
      }
      return (<p></p>);
    }
}