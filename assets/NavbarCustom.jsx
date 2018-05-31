var Navbar = Reactstrap.Navbar;
var NavItem = Reactstrap.NavItem;
var NavbarBrand = Reactstrap.NavbarBrand;
var NavbarToggler = Reactstrap.NavbarToggler;
var Nav = Reactstrap.Nav;
var Collapse = Reactstrap.Collapse;
var NavLink = Reactstrap.NavLink;
var Input = Reactstrap.Input;
var Form = Reactstrap.Form;
var Button = Reactstrap.Button;

class NavbarCustom extends React.Component {
    constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handleGetRol = this.handleGetRol.bind(this);
    this.state = {
      isOpen: false,
      rol: this.handleGetRol()
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleGetRol () {
          const user = localStorage.getItem('userIdLS');
          console.log("user: "+user);
          if(user !== null){
            fetch('/server/index.php/usuarios/'+ user)
             .then((response) => {
                return response.json()
             })
             .then((data) => {
                this.setState({ rol: data[0].rol });
              });
          }
  }
  render() {
    const navbarItemAdmin = (this.state.rol === 'Administrador')?
                    <Nav navbar>
                      <NavItem>
                        <b><NavLink className="text-white" href="/agencias">Agencias</NavLink></b>
                      </NavItem>
                      <NavItem>
                        <b><NavLink className="text-white" href="/usuarios">Usuarios</NavLink></b>
                      </NavItem>
                      </Nav>
                    :null;
    return (
        <Navbar dark expand="md">
          <b><NavbarBrand href="/">Inicio</NavbarBrand></b>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              <NavItem>
                <b><NavLink className="text-white" href="/noticias">Noticias</NavLink></b>
              </NavItem>
              <NavItem>
                <b><NavLink className="text-white" href="/boletines">Boletines</NavLink></b>
              </NavItem>
              <NavItem>
                <b><NavLink className="text-white" href="/categorias">Categorías</NavLink></b>
              </NavItem>
              <NavItem>
                <b><NavLink className="text-white" href="/periodistas">Periodistas</NavLink></b>
              </NavItem>
              <NavItem>
                <b><NavLink className="text-white" href="/micuenta">Mi Cuenta</NavLink></b>
              </NavItem>
              {navbarItemAdmin}
            </Nav>
            <Nav className="ml-auto" navbar>
              <Form inline>
          			<Input className="form-control mb-2 mr-sm-2 mb-sm-0" type="search" placeholder="Search" aria-label="Search"/>
          			<Button className="btn btn-outline-success mb-2 mr-sm-2 mb-sm-0" type="submit">Search</Button>
        		  </Form>
              <NavItem>
                <b><NavLink className="text-white button-sm button5" href="/login">Login</NavLink></b>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
    );
  }

}