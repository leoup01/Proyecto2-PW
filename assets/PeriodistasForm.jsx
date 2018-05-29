var Form = Reactstrap.Form;
var Button = Reactstrap.Button;
var FormGroup = Reactstrap.FormGroup;
var Label = Reactstrap.Label;
var Input = Reactstrap.Input;
var FormText = Reactstrap.FormText;

class PeriodistasForm extends React.Component {
    constructor(props) {
       super(props);
    this.state = {
      userId:"",
      nombre:"",
      correo:"",
      pais:"",
      edad:0,
      genero:"",
      rol:"",
      telefono:"",
      ciudad:"",
      periodistas:[]

      receipt_id:"",
      receipt_client:"",
      receipt_taxes:0,
      receipt_total:0,
      receipt_date:"",
      newQty: 0,
      newDescription: "",
      newUnitValue: 0,
      receipt_products: ["products"],
      productsAux: ["products"]
    }
    
    this.handleInsert = this.handleInsert.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    //this.handleAddProduct = this.handleAddProduct.bind(this);
    //this.handleGetProducts = this.handleGetProducts.bind(this);
    //this.handleSubtotal = this.handleSubtotal.bind(this);
    //this.handleDeleteProduct = this.handleDeleteProduct.bind(this);
    this.handleFields = this.handleFields.bind(this);
    //this.test = this.test.bind(this);
    //this.handleTaxes = this.handleTaxes.bind(this);
    //this.handleTotal = this.handleTotal.bind(this);
    this.handleGetLast = this.handleGetLast.bind(this);
    }
    

    componentWillReceiveProps(nextProps) {
       this.setState({receipt_id:nextProps.receipt.receipt_id});
       this.setState({receipt_client:nextProps.receipt.receipt_client});
       this.setState({receipt_taxes:nextProps.receipt.receipt_taxes});
       this.setState({receipt_total:nextProps.receipt.receipt_total});
       this.setState({receipt_date:nextProps.receipt.receipt_date});
       this.setState({receipt_products:nextProps.products});
       //console.log("NEXTPROPS");
       //console.log(this.state);
       //console.log(this.nextProps);
    }

    handleInsert() {
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
        //fetch("/server/index.php/receipt/"+this.state.id,{
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
           //this.props.handleChangeReceipt(this.state);
           console.log("INSERT");
           console.log(this.props);
           console.log(this.state);
           aux = this.handleGetLast();
           //console.log("AUX");
           //console.log(aux);
         }
    );
    }

    handleGetLast() {

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
         });
    }

    handleUpdate() {
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
    );
    }

    handleDelete() {
        fetch("/server/index.php/receipt/"+this.state.receipt_id,{
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ method: 'delete'})
        }).then((response) => {
           this.props.handleChangeData();
           this.handleGetLast();
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

      const thead = <thead className="thead-dark"><tr><th>Nombre</th><th>Usuario</th><th>Correo</th><th>Teléfono</th><th>Ciudad</th></tr></thead>;
      const rows = this.state.periodistas.map((periodista) => 
                      <tr key={periodista.userId} data-item={periodista.userId}>
                        <td>{periodista.nombre}</td>
                        <td>{periodista.userId}</td>
                        <td>{periodista..correo}</td>
                        <td>{periodista.telefono}</td>
                        <td>{periodista..ciudad}</td>
                        
                      </tr>);
      const tbody = <tbody>{rows}</tbody>;

        return(<Form>

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
            <Label for="nombreInput" className="form-label">Client</Label>  
                <Input
                  type="text"
                  name="nombre"
                  className="form-control"
                  value={this.state.nombre}
                  onChange={this.handleFields}/> 
          </div>
          <div className="form-group">
            <Label for="correoInput" className="form-label">Client</Label>  
                <Input
                  type="text"
                  name="correo"
                  className="form-control"
                  value={this.state.correo}
                  onChange={this.handleFields}/> 
          </div>
          <div className="form-group">
            <Label for="paisInput" className="form-label">Client</Label>  
                <Input
                  type="text"
                  name="pais"
                  className="form-control"
                  value={this.state.pais}
                  onChange={this.handleFields}/> 
          </div>
          <div className="form-group">
            <Label for="edadInput" className="form-label">Client</Label>  
                <Input
                  type="number"
                  name="edad"
                  className="form-control"
                  value={this.state.edad}
                  onChange={this.handleFields}/> 
          </div>
          <div className="form-group">
            <Label for="generoInput" className="form-label">Client</Label>  
                <Input
                  type="text"
                  name="genero"
                  className="form-control"
                  value={this.state.genero}
                  onChange={this.handleFields}/> 
          </div>
          <div className="form-group">
            <Label for="InputRol" className="form-label">Client</Label>  
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

          <table className="table">{thead}{tbody}</table>

          
          <Input type="hidden" name="id" value={this.state.userId}/>

           <table><tbody><tr>
               <td><Button onClick={this.handleInsert} className="button button1">Agregar</Button></td>
               <td><Button onClick={this.handleUpdate} className="button button2">Modificar</Button></td>
               <td><Button onClick={this.handleDelete} className="button button3">Eliminar</Button></td>
           </tr></tbody></table>
           </Form>

           )
    }
}