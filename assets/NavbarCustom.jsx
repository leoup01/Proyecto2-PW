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
      rol: this.handleGetRol(),
      term: ""
    };

    this.handleChangeTerm = this.handleChangeTerm.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChangeTerm(event) {
    const target = event.target;
    const value = target.value;
    this.setState({term: value});
  }

  handleSearch() {
    this.props.handleSearch(this.state.term);
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
    const navbarItemsAdmin = (this.state.rol === 'Administrador')?
                    <Nav navbar>
                      <NavItem>
                        <b><NavLink className="text-white" href="/agencias.html">Agencias</NavLink></b>
                      </NavItem>
                      <NavItem>
                        <b><NavLink className="text-white" href="/usuarios.html">Usuarios</NavLink></b>
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
                <b><NavLink className="text-white" href="/boletinesDetalle.html">Ver Boletines</NavLink></b>
              </NavItem>
              <NavItem>
                <b><NavLink className="text-white" href="/micuenta.html">Mi Cuenta</NavLink></b>
              </NavItem>
                
              {
                ((this.state.rol === 'Periodista') || (this.state.rol === 'Jefe de redacción') || (this.state.rol === 'Administrador'))?
                    <Nav navbar>
                      <NavItem>
                        <b><NavLink className="text-white" href="/noticias.html">Noticias</NavLink></b>
                      </NavItem>
                      <NavItem>
                        <b><NavLink className="text-white" href="/boletines.html">Boletines</NavLink></b>
                      </NavItem>
                      <NavItem>
                        <b><NavLink className="text-white" href="/periodistas.html">Periodistas</NavLink></b>
                      </NavItem>
                      <NavItem>
                        <b><NavLink className="text-white" href="/agencias.html">Agencias</NavLink></b>
                      </NavItem>
                      <NavItem>
                        <b><NavLink className="text-white" href="/categorias.html">Categorías</NavLink></b>
                      </NavItem>
                    </Nav>
                    :null
              }
              {
                (this.state.rol === 'Administrador')?
                    <Nav navbar>
                      <NavItem>
                        <b><NavLink className="text-white" href="/usuarios.html">Usuarios</NavLink></b>
                      </NavItem>
                    </Nav>
                    :null
              }



            </Nav>
            <Nav className="ml-auto" navbar>
              <Form inline>
                <Input className="form-control mb-2 mr-sm-2 mb-sm-0" type="text" placeholder="Search" aria-label="Search"
                 value={this.state.term} onChange={this.handleChangeTerm}/>
          			<Button className="btn btn-outline-success mb-2 mr-sm-2 mb-sm-0" type="button" onClick={this.handleSearch} >Search</Button>
        		  </Form>
              <NavItem>
                <b><NavLink className="text-white button-sm button5" href="/login.html">Login</NavLink></b>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
    );
  }

}