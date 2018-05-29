var Row = Reactstrap.Row;
var Col = Reactstrap.Col;
var Jumbotron = Reactstrap.Jumbotron;

class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
        	<div>
        		<Jumbotron className="text-center text-white">
	                <Row>
	                  <Col sm="12" md="12" lg="2" xl="2">
	                    <img src="assets/header.png" width="150em" alt="logo"/>
	                  </Col>
	                  <Col sm="12" md="12" lg="10" xl="10">
	                    <h1 className="display-3">Proyecto 2</h1>
	                    <hr className="my-2" />
	                    <p className="lead">Fabio Campos Rojas</p>
	                    <p className="lead">Leonel Cortes Quiñones</p>
	                  </Col>
	                </Row>
	              </Jumbotron>
	              <NavbarCustom/>
            </div>
        );
    }

}