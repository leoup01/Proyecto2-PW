var Container = Reactstrap.Container;
var Col = Reactstrap.Col;
var Row = Reactstrap.Row;
var Form = Reactstrap.Form;
var Button = Reactstrap.Button;
var FormGroup = Reactstrap.FormGroup;
var Label = Reactstrap.Label;
var Input = Reactstrap.Input;
var FormText = Reactstrap.FormText;

class Periodistas extends React.Component {
    constructor(props) {
    	super(props);
    	this.state = {
	      userId:"",
	      nombre:"",
	      correo:"",
	      pais:"",
	      edad:0,
	      genero:"Femenino",
	      rol:"Normal",
	      telefono:"",
	      ciudad:"",
	      periodistas:[]
	  	}
	  	this.handleInsert = this.handleInsert.bind(this);
	    this.handleUpdate = this.handleUpdate.bind(this);
	    this.handleDelete = this.handleDelete.bind(this);
	    this.handleFields = this.handleFields.bind(this);
	    this.handleGetLast = this.handleGetLast.bind(this);
  	}

  	componentWillReceiveProps(nextProps) {
       this.setState({userId:nextProps.periodista.userId});
       this.setState({nombre:nextProps.periodista.nombre});
       this.setState({correo:nextProps.periodista.correo});
       this.setState({pais:nextProps.periodista.pais});
       this.setState({genero:nextProps.periodista.edad});
       this.setState({rol:nextProps.periodista.rol});
       this.setState({telefono:nextProps.periodista.telefono});
       this.setState({ciudad:nextProps.periodista.ciudad});
       this.setState({periodistas:nextProps.periodista.periodistas});
       //console.log("NEXTPROPS");
       //console.log(this.state);
       //console.log(this.nextProps);
    }

    handleInsert() {
    	/*
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10) {
          dd = '0'+dd
        }
        if(mm<10) {
          mm = '0'+mm
        } 
        today = dd + '/' + mm + '/' + yyyy;
          fetch("/server/index.php/receipt/1",{
            method: "post",
            headers: {'Content-Type': 'application/json',
                               'Content-Length': 20},
            body: JSON.stringify({
                method: 'put',
                receipt_client: "",
                receipt_taxes: 0,
                receipt_total: 0,
                receipt_date: today
                       })
    }).then((response) => {
           this.props.handleChangeData();
           console.log("INSERT");
           console.log(this.props);
           console.log(this.state);
           aux = this.handleGetLast();
         }
    );*/
    }

    handleGetLast() {
    	/*
        fetch("/server/index.php/receipt/",{
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ method: 'getLast'})
        })
        .then((response) => {
               return response.json()
           })
           .then((data) => {
                console.log("GETLAST");
                //this.props.handleChangeData();
                console.log(data[0]);
                this.props.handleChangeReceipt(data[0]);
                //return data[0];
         });*/
    }

    handleUpdate() {
    	/*
        console.log("UPDATE");
        fetch("/server/index.php/receipt/"+this.state.receipt_id,{
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                      receipt_client: this.state.receipt_client,
                receipt_taxes: 0,
                receipt_total: 0,
                receipt_date: this.state.receipt_date
                       })
     }).then((response) => {
           this.props.handleChangeData();
           //console.log(this.props);
           //console.log(this.state);
           this.props.handleChangeReceipt(this.state);
           console.log("UPDATED");
           this.forceUpdate();
         }
    );*/
    }

    handleDelete() {
    	/*
        fetch("/server/index.php/receipt/"+this.state.receipt_id,{
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ method: 'delete'})
        }).then((response) => {
           this.props.handleChangeData();
           this.handleGetLast();
         }
    );*/
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

    const thead = <thead className="thead-dark"><tr><th>Nombre</th><th>Usuario</th><th>Correo</th><th>Teléfono</th><th>Ciudad</th></tr></thead>;
    const rows = this.state.periodistas.map((periodista) => 
                      <tr key={periodista.userId} data-item={periodista.userId}>
                        <td>nombre</td>
                        <td>userId</td>
                        <td>correo</td>
                        <td>periodista.telefono</td>
                        <td>periodista.ciudad</td>
                      </tr>);
    /*const rows = this.state.periodistas.map((periodista) => 
                      <tr key={periodista.userId} data-item={periodista.userId}>
                        <td>{periodista.nombre}</td>
                        <td>{periodista.userId}</td>
                        <td>{periodista..correo}</td>
                        <td>{periodista.telefono}</td>
                        <td>{periodista.ciudad}</td>
                        
                      </tr>);*/
    const tbody = <tbody>{rows}</tbody>;

    return (
    	<div>
        	<Header/>
        	<Row>
        		<Col sm="12" md="12" lg="3" xl="3">
        			<h2>Manejo de periodistas</h2>
        			<Form>
			          <div className="form-group">
			            <Label for="userIdInput" className="form-label">Client</Label>  
			                <Input
			                  type="text"
			                  name="userId"
			                  className="form-control"
			                  value={this.state.userId}
			                  onChange={this.handleFields}/> 
			          </div>
			          <div className="form-group">
			            <Label for="nombreInput" className="form-label">Nombre</Label>  
			                <Input
			                  type="text"
			                  name="nombre"
			                  className="form-control"
			                  value={this.state.nombre}
			                  onChange={this.handleFields}/> 
			          </div>
			          <div className="form-group">
			            <Label for="correoInput" className="form-label">Correo</Label>  
			                <Input
			                  type="text"
			                  name="correo"
			                  className="form-control"
			                  value={this.state.correo}
			                  onChange={this.handleFields}/> 
			          </div>
			          <div className="form-group">
			            <Label for="paisInput" className="form-label">País</Label>  
			                <Input
			                  type="text"
			                  name="pais"
			                  className="form-control"
			                  value={this.state.pais}
			                  onChange={this.handleFields}/> 
			          </div>
			          <div className="form-group">
			            <Label for="ciudadInput" className="form-label">Ciudad</Label>  
			                <Input
			                  type="text"
			                  name="ciudad"
			                  className="form-control"
			                  value={this.state.ciudad}
			                  onChange={this.handleFields}/> 
			          </div>
			          <div className="form-group">
			            <Label for="telefonoInput" className="form-label">Teléfono</Label>  
			                <Input
			                  type="text"
			                  name="telefono"
			                  className="form-control"
			                  value={this.state.telefono}
			                  onChange={this.handleFields}/> 
			          </div>
			          <div className="form-group">
			            <Label for="edadInput" className="form-label">Edad</Label>  
			                <Input
			                  type="number"
			                  name="edad"
			                  className="form-control"
			                  value={this.state.edad}
			                  onChange={this.handleFields}/> 
			          </div>
			          <div className="form-group">
			            <Label for="generoInput" className="form-label">Rol</Label>  
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
			          <div className="form-group">
			            <Label for="rolInput" className="form-label">Rol</Label>  
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

			          <Input type="hidden" name="id" value={this.state.userId}/>

			           <table><tbody><tr>
			               <td><Button onClick={this.handleInsert} className="button button1">Agregar</Button></td>
			               <td><Button onClick={this.handleUpdate} className="button button2">Modificar</Button></td>
			               <td><Button onClick={this.handleDelete} className="button button3">Eliminar</Button></td>
			           </tr></tbody></table>
			        </Form>
        		</Col>
        		<Col sm="12" md="12" lg="9" xl="9">
        			<h2>Lista o tabla de periodistas</h2>
        			<table className="table">{thead}{tbody}</table>
        		</Col>
        	</Row>
        </div>

    );
  }
 }

ReactDOM.render(<Periodistas/>, document.getElementById('root'));