var Table = Reactstrap.Table;
var Card = Reactstrap.Card;
var CardHeader = Reactstrap.CardHeader;
var CardTitle = Reactstrap.CardTitle;
var CardBody = Reactstrap.CardBody;
var CardText = Reactstrap.CardText;
var CardSubtitle = Reactstrap.CardSubtitle;
var CustomInput = Reactstrap.CustomInput;

class BoletinesDetalleNoticiasList extends React.Component {
  constructor(props) {
        super(props);
        this.handleDetails = this.handleDetails.bind(this);
        this.handleFields = this.handleFields.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
          leido: false,
          boletin: 0,
          user: ""
        }
  }

  handleDetails(e) {
    console.log("handleDetails");
      const index = e.currentTarget.getAttribute('data-item');
      console.log(index);
      console.log("id is:" + this.props.noticias[index].idNoticia);
      ///this.props.handleChangeBoletin(this.props.boletines[index]);
  }

  handleFields(event) {
    const target = event.target;
    const value = target.checked;
    const name = target.name;
    this.setState({[name]: value});  
    console.log(this.state);
  }

  handleSave(event) {
    if(this.state.leido === false){
      fetch("/server/index.php/vistos",{
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ 
          method: 'delete',
          boletin: this.state.boletin,
          usuario: this.state.user
        })
      })
    }else{
      fetch("/server/index.php/vistos",{
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ 
          method: 'put',
          boletin: this.state.boletin,
          usuario: this.state.user
        })
      })
    }
    window.location.href = "/boletinesDetalle";
  }

  componentWillReceiveProps(nextProps) {
    this.setState({boletin:nextProps.boletin});
    this.setState({leido:nextProps.leido});
    this.setState({user:nextProps.user});
 }

  render() {
    console.log("RENDER BOLETINES Noticias LIST");
    console.log(this.props.periodistas);
    if (this.props.noticias.length > 0) { 
        const cards = this.props.noticias.map((noticia, index) =>
          <Card className="car-header-back">
            <CardHeader><CardTitle>{noticia.titulo}</CardTitle></CardHeader>
            <CardBody>
              <CardSubtitle>Noticia por {this.props.periodistas[index]}, en la fecha {noticia.fecha}</CardSubtitle>
              <CardText>{noticia.cuerpo}</CardText>
            </CardBody>
          </Card>);
        return (  <div>
                  {cards}
                  <Form>
                    <Label check>
                    <Input name="leido" type="checkbox" onChange={this.handleFields} checked={this.state.leido}/> {'Marcar como leído'} {' '}
                    </Label>
                    <Input type="hidden" name="id" value={this.state.boletin}/>&nbsp;
                    <Button onClick={this.handleSave} className="button-sm button1">Guardar</Button>
                  </Form>
                </div> );
    }
      return (<p></p>)
  }
}