var Form = Reactstrap.Form;
var Button = Reactstrap.Button;
var FormGroup = Reactstrap.FormGroup;
var Label = Reactstrap.Label;
var Input = Reactstrap.Input;
var FormText = Reactstrap.FormText;
var Row = Reactstrap.Row;
var Col = Reactstrap.Col;

class NoticiasForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idNoticia:"",
            fecha:"",
            lugar:"",
            titulo:"",
            cuerpo:"",
            periodista: 1,
            agencia: 1,
            boletin: 1,
            noticias:[],
            periodistas: [],
            agencias: [],
            categorias: [],
            checkedCats: [],
            boletines: []
        }
        this.handleInsert = this.handleInsert.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleFields = this.handleFields.bind(this);
    }
    
    componentDidMount(){
        let pers;
        let ags;
        let bols;
        let cats;    
        fetch('/server/index.php/periodistas')
            .then((response) => {
                console.log(response);
                return response.json()
            })
            .then((data) => {
                pers = data;
                console.log("PERIODISTAS SON:");
                console.log(data);
            }).then(_ => {
                fetch('/server/index.php/categorias')
                    .then((response) => {
                        console.log(response);
                        return response.json()
                    }).then((data) => {
                        cats = data;
                        console.log("CATEGORIAS SON:");
                        console.log(data);
                    })
            }).then(_ => {
                fetch('/server/index.php/agencias')
                    .then((response) => {
                        console.log(response);
                        return response.json()
                    }).then((data) => {
                        ags = data;
                        console.log("AGENCIAS SON:");
                        console.log(data);
                    })
            }).then(_ => {
                fetch('/server/index.php/boletines')
                    .then((response) => {
                        console.log(response);
                        return response.json()
                    }).then((data) => {
                        bols = data;
                        console.log("BOLETINES SON:");
                        console.log(data);
                    }).then(_ => {
                        this.setState({ 
                            periodistas: pers,
                            agencias: ags,
                            boletines: bols,
                            categorias: cats
                        });
                    })
            });            
    }

    componentWillReceiveProps(nextProps) {
       this.setState({idNoticia:nextProps.noticia.idNoticia});
       this.setState({fecha:nextProps.noticia.fecha});
       this.setState({lugar:nextProps.noticia.lugar});
       this.setState({titulo:nextProps.noticia.titulo});
       this.setState({cuerpo:nextProps.noticia.cuerpo});
       this.setState({periodista:nextProps.noticia.periodista});
       this.setState({agencia:nextProps.noticia.agencia});
       this.setState({boletin:nextProps.noticia.boletin});
       this.setState({noticias:nextProps.noticia.noticias});
       this.setState({checkedCats:nextProps.checkedCats});
    }

    handleInsert() {        
      console.log("INSERT");
      console.log(this.state);
      fetch("/server/index.php/noticias/"+this.state.idNoticia,{
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            method: 'put',
            idNoticia: this.state.idNoticia,
            fecha: this.state.fecha,
            lugar: this.state.lugar,
            titulo: this.state.titulo,
            cuerpo: this.state.cuerpo,
            periodista: this.state.periodista,
            agencia: this.state.agencia,
            boletin: this.state.boletin
                   })
      }).then((response) =>{
            fetch("/server/index.php/noticias",{
                method: "post",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    method: 'getLast'
                })
            }).then((response) => {
                return response.json()
            }).then((data) =>{
                this.state.checkedCats.forEach((item,index) =>{
                    if(item === true){
                        fetch("/server/index.php/clasificadas",{
                            method: "post",
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({
                                method: 'put',
                                noticia: data[0].idNoticia,
                                categoria: index
                            })
                        });
                    }
                });
                this.props.handleChangeData();
            })                
        });
    }

    handleUpdate() {      
        
      fetch("/server/index.php/noticias/"+this.state.idNoticia,{
          method: "post",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            idNoticia: this.state.idNoticia,
            fecha: this.state.fecha,
            lugar: this.state.lugar,
            titulo: this.state.titulo,
            cuerpo: this.state.cuerpo,
            periodista: this.state.periodista,
            agencia: this.state.agencia,
            boletin: this.state.boletin
          })
      }).then((response) => {
            fetch("/server/index.php/clasificadas/"+this.state.idNoticia,{
                method: "post",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ method: 'delete'})
            }).then((response) =>{
                this.state.checkedCats.forEach((item,index) =>{
                    if(item === true){
                        fetch("/server/index.php/clasificadas",{
                            method: "post",
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({
                                method: 'put',
                                noticia: this.state.idNoticia,
                                categoria: index
                            })
                        });
                    }
                });
                this.props.handleChangeData();
            })
        });
    }

    handleDelete() {
      fetch("/server/index.php/noticias/"+this.state.idNoticia,{
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ method: 'delete'})
      }).then((response) => {
          this.props.handleChangeData();
        });
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
        console.log("ESTADO ACTUAL ES:");
        console.log(this.state.checkedCats);


      const perOpts = this.state.periodistas.map((periodista) => 
        <option value={periodista.idPeriodista}>{periodista.nombre}</option>
      );
      const agOpts = this.state.agencias.map((agencia) => 
        <option value={agencia.idAgencia}>{agencia.nombre}</option>
      );
      const bolOpts = this.state.boletines.map((boletin) => 
        <option value={boletin.idBoletin}>{boletin.numero}</option>
      );
      const catOpts = this.state.categorias.map((categoria,index) => 
        <FormGroup check inline>
          <Label check>
             <Input type="checkbox" checkid={categoria.idCategoria} checked={this.state.checkedCats[categoria.idCategoria] === true} value={categoria.idCategoria} onChange={this.handleFields}/> {categoria.nombre}
          </Label>
        </FormGroup>
      );
        return(
          <div>
            <h2>Manejo de noticias</h2>
              <Form>
                <Row>   
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
                    <Col sm="12" md="12" lg="4" xl="4">
                        <div className="form-group">
                        <Label for="lugarInput" className="form-label">Lugar</Label>  
                            <Input
                                type="text"
                                name="lugar"
                                className="form-control"
                                value={this.state.lugar}
                                onChange={this.handleFields}/> 
                        </div>
                    </Col>
                </Row>
                <Row>   
                    <Col sm="12" md="12" lg="8" xl="8">
                        <div className="form-group">
                        <Label for="tituloInput" className="form-label">Titulo</Label>  
                            <Input
                                type="text"
                                name="titulo"
                                className="form-control"
                                value={this.state.titulo}
                                onChange={this.handleFields}/> 
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12" md="12" lg="8" xl="8">
                        <div className="form-group">
                        <Label for="cuerpoInput" className="form-label">Cuerpo</Label>  
                            <Input
                                type="textarea"
                                name="cuerpo"
                                rows="6" 
                                className="form-control"
                                value={this.state.cuerpo}
                                onChange={this.handleFields}/> 
                        </div>
                    </Col>
                </Row>
                <Row>                 
                    <Col sm="12" md="12" lg="4" xl="4">
                        <div className="form-group">
                        <Label for="periodistaInput" className="form-label">Periodista</Label>  
                            <Input
                                type="select"
                                name="periodista"
                                className="form-control"
                                value={this.state.periodista}
                                onChange={this.handleFields}
                                > 
                                {perOpts}
                                </Input>
                        </div>
                    </Col>
                    <Col sm="12" md="12" lg="4" xl="4">
                        <div className="form-group">
                        <Label for="agenciaInput" className="form-label">Agencia</Label>  
                            <Input
                                type="select"
                                name="agencia"
                                className="form-control"
                                value={this.state.agencia}
                                onChange={this.handleFields}
                                > 
                                {agOpts}
                                </Input>
                        </div>
                    </Col>
                </Row>
                <Row>                 
                    <Col sm="12" md="12" lg="4" xl="4">
                        <div className="form-group">
                        <Label for="boletinInput" className="form-label">Boletin</Label>  
                            <Input
                                type="select"
                                name="boletin"
                                className="form-control"
                                value={this.state.boletin}
                                onChange={this.handleFields}
                                > 
                                {bolOpts}
                                </Input>
                        </div>
                    </Col>                    
                </Row>
                <Row>
                    <Col sm="12" md="12" lg="8" xl="8">  
                    <Label for="categoriasInput" className="form-label">Clasificar</Label>                      
                        <div className="form-group">
                            {catOpts}
                        </div>
                    </Col>
                </Row>
                
                <Input type="hidden" name="id" value={this.state.idNoticia}/>

                     <Button onClick={this.handleInsert} className="button button1">Agregar</Button>
                     <Button onClick={this.handleUpdate} className="button button2">Modificar</Button>
                     <Button onClick={this.handleDelete} className="button button3">Eliminar</Button>
              </Form>
          </div>
           );
    }
}