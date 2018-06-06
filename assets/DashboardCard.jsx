var Table = Reactstrap.Table;
var Card = Reactstrap.Card;
var CardHeader = Reactstrap.CardHeader;
var CardTitle = Reactstrap.CardTitle;
var CardBody = Reactstrap.CardBody;
var CardText = Reactstrap.CardText;
var CardLink = Reactstrap.CardLink;
var CardImg = Reactstrap.CardImg;
var CardSubtitle = Reactstrap.CardSubtitle;
var CustomInput = Reactstrap.CustomInput;
var Row = Reactstrap.Row;
var Col = Reactstrap.Col;

class DashboardCard extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
          imagen: '',
          title: '',
          result: '',
          link:''
        }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({title:nextProps.title});
    this.setState({result:nextProps.result});
    this.setState({link:nextProps.link});
    this.setState({imagen:nextProps.imagen});
 }

  render() {
    console.log("RENDER DASHBOARD CARD");
        return (  <div>
                    <Card className="car-header-back">
                      <Row>
                        <Col sm="12" md="3">
                          <CardBody>
                            <CardImg top width="100%" src={this.state.imagen} alt="Card image cap" />
                          </CardBody>
                        </Col>
                        <Col sm="12" md="9">
                          <CardBody>
                            <CardText className="card-text-result">{this.state.result}</CardText>
                            <CardTitle><CardLink href={this.state.link}>{this.state.title}</CardLink></CardTitle>
                          </CardBody>
                        </Col>
                      </Row>
                      
                    </Card>
                  </div> );
  }
}