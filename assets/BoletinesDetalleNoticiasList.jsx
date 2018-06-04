var Table = Reactstrap.Table;
var Card = Reactstrap.Card;
var CardHeader = Reactstrap.CardHeader;
var CardTitle = Reactstrap.CardTitle;
var CardBody = Reactstrap.CardBody;
var CardText = Reactstrap.CardText;
var CardSubtitle = Reactstrap.CardSubtitle;

class BoletinesDetalleNoticiasList extends React.Component {
        constructor(props) {
              super(props);
              this.handleDetails = this.handleDetails.bind(this);
        }
            handleDetails(e) {
              console.log("handleDetails");
                const index = e.currentTarget.getAttribute('data-item');
                console.log(index);
                console.log("id is:" + this.props.noticias[index].idNoticia);
                ///this.props.handleChangeBoletin(this.props.boletines[index]);
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
                return ( <div>{cards}</div> );
             }
             return (<p></p>)
            }
    }