var Form = Reactstrap.Form;
var Button = Reactstrap.Button;
var FormGroup = Reactstrap.FormGroup;
var Label = Reactstrap.Label;
var Input = Reactstrap.Input;
var FormText = Reactstrap.FormText;
var Row = Reactstrap.Row;
var Col = Reactstrap.Col;

class MiCuentaForm extends React.Component {
    constructor(props) {
       super(props);
    this.state = {
        userId:"",
        password:"",
        nombre:"",
        correo:"",
        pais:"",
        edad:0,
        genero:"Femenino",
        rol:"Normal",
        categorias: [],
        checkedCats: []
      }
      //this.handleInsert = this.handleInsert.bind(this);
      this.handleUpdate = this.handleUpdate.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
      this.handleFields = this.handleFields.bind(this);
      this.handleUpdateTest = this.handleUpdateTest.bind(this);
      //this.handleGetLast = this.handleGetLast.bind(this);
    }
    
    componentWillReceiveProps(nextProps) {
       this.setState({userId:nextProps.usuario.userId});
       this.setState({password:nextProps.usuario.password});
       this.setState({nombre:nextProps.usuario.nombre});
       this.setState({correo:nextProps.usuario.correo});
       this.setState({edad:nextProps.usuario.edad});
       this.setState({pais:nextProps.usuario.pais});
       this.setState({genero:nextProps.usuario.genero});
       this.setState({rol:nextProps.usuario.rol});
       this.setState({checkedCats:nextProps.checkedCats});
       //console.log("NEXTPROPS");
       //console.log(this.state);
       //console.log(this.nextProps);
    }

    componentDidMount(){
      fetch('/server/index.php/categorias')
        .then((response) => {
            return response.json();
        }).then((data) => {
          this.setState({ 
              categorias: data
          });
        }); 
  }

    handleUpdate() {
      
        console.log("UPDATE");
        console.log(this.state);
        console.log(this.state.userId);
        fetch("/server/index.php/usuarios/"+this.state.userId,{
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                password: this.state.password,
                nombre: this.state.nombre,
                correo: this.state.correo,
                pais: this.state.pais,
                edad: this.state.edad,
                genero: this.state.genero,
                rol: this.state.rol
            })
     }).then((response) => {
          console.log(response);
          console.log(this.props);
           this.props.handleChangeData();
           //console.log(this.props);
           //console.log(this.state);
           //this.props.handleChangeReceipt(this.state);
           console.log("UPDATED");
           this.forceUpdate();
         }
    );
    }

    handleUpdateTest() {
      console.log("UPDATETEST");
      fetch("/server/index.php/usuarios/"+this.state.userId,{
          method: "post",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              method: 'posttest',
              password: this.state.password,
              nombre: this.state.nombre,
              correo: this.state.correo,
              pais: this.state.pais,
              edad: this.state.edad,
              genero: this.state.genero,
              rol: this.state.rol
          })
      }).then((response) => {
        fetch("/server/index.php/preferidas/"+this.state.userId,{
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ method: 'delete'})
        }).then((response) =>{
            this.state.checkedCats.forEach((item,index) =>{
                if(item === true){
                    fetch("/server/index.php/preferidas",{
                        method: "post",
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            method: 'put',
                            usuario: this.state.userId,
                            categoria: index
                        })
                    });
                }
            });            
            /*this.setState({
              checkedCats: [-1]
            });
            this.props.handleChangeData();
            */
           window.location.href = "/micuenta";
          })
        });
    }

    handleDelete() {
        console.log("DELETE");
        fetch("/server/index.php/usuarios/"+this.state.userId,{
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ method: 'delete'})
        }).then((response) => {
            localStorage.removeItem("userIdLS");
           this.props.handleChangeData();
           //this.handleGetLast();
           window.location.href = "/index";
         }
    );
    }

    handleFields(event) {
      const target = event.target;
      console.log("OPT IS:");
      console.log(target);
      const checkid = target.getAttribute('checkid');
      console.log("CHECKID IS:");
      console.log(checkid);
         if(target.type === 'checkbox'){
             const checkid = target.getAttribute('checkid');
             const value = target.checked;
             let copy = this.state.checkedCats;
             copy[checkid] = value;
             this.setState({
                 checkedCats: copy
             });          
         }else{
             const value = target.value;
             const name = target.name;
             this.setState({[name]: value});
         }   
    }

    render() {
      console.log("RENDER MICUENTAFORM");
      console.log(this.state.checkedCats);
      const catOpts = this.state.categorias.map((categoria,index) => 
        <FormGroup check inline>
          <Label check>
             <Input type="checkbox" checkid={categoria.idCategoria} checked={this.state.checkedCats[categoria.idCategoria] === true} value={categoria.idCategoria} onChange={this.handleFields}/> {categoria.nombre}
          </Label>
        </FormGroup>
      );
      if (this.state.userId !== "") {
        return(
          <div>
            <h2>Mi Cuenta</h2>
              <Form>
                <Row>
                  <Col sm="12" md="12" lg="4" xl="4">
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
                  <Col sm="12" md="12" lg="4" xl="4">
                    <div className="form-group">
                      <Label for="passwordInput" className="form-label">Contraseña</Label>  
                          <Input
                            type="password"
                            name="password"
                            className="form-control"
                            value={this.state.password}
                            onChange={this.handleFields}/> 
                    </div>
                  </Col>
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
                  
                </Row>
                <Row>
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
                      <Label for="edadInput" className="form-label">Edad</Label>  
                          <Input
                            type="number"
                            name="edad"
                            className="form-control"
                            value={this.state.edad}
                            onChange={this.handleFields}/> 
                    </div>
                  </Col>
                  
                </Row>
                <Row>
                  <Col sm="12" md="12" lg="4" xl="4">
                    <div className="form-group">
                      <Label for="generoInput" className="form-label">Genero</Label>  
                          <Input
                            type="select"
                            name="genero"
                            className="form-control"
                            value={this.state.genero}
                            onChange={this.handleFields}>
                            <option>Femenino</option>
                            <option>Masculino</option>
                          </Input> 
                    </div>
                  </Col>
                  <Col sm="12" md="12" lg="4" xl="4">
                    <div className="form-group">
                      <Label for="rolInput" className="form-label">Rol</Label>  
                          <Input
                            type="text"
                            name="rol"
                            className="form-control"
                            value={this.state.rol}
                            onChange={this.handleFields}
                            readOnly>
                          </Input> 
                    </div>
                  </Col>
                </Row>
                <Row>
                    <Col sm="12" md="12" lg="12" xl="12">  
                    <Label for="categoriasInput" className="form-label">Categorías Preferidas</Label>                      
                        <div className="form-group">
                            {catOpts}
                        </div>
                    </Col>
                </Row>
                
                <Input type="hidden" name="id" value={this.state.userId}/>
                     <Button onClick={this.handleUpdateTest} className="button button2">Actualizar mi cuenta</Button>
                     <Button onClick={this.handleDelete} className="button button3">Eliminar mi cuenta</Button>
              </Form>
          </div>
        );
      }
      return (<p></p>);
    }
}