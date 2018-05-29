var Navbar = Reactstrap.Navbar;
var NavbarBrand = Reactstrap.NavbarBrand;
var NavbarToggler = Reactstrap.NavbarToggler;
var Collapse = Reactstrap.Collapse;
var Nav = Reactstrap.Nav;
var NavItem = Reactstrap.NavItem;
var NavLink = Reactstrap.NavLink;
var UncontrolledDropdown = Reactstrap.UncontrolledDropdown;
var DropdownToggle =  Reactstrap.DropdownToggle;
var DropdownMenu = Reactstrap.DropdownMenu;
var DropdownItem = Reactstrap.DropdownItem;
var Container = Reactstrap.Container;
var Row = Reactstrap.Row;
var Col = Reactstrap.Col;
var Jumbotron = Reactstrap.Jumbotron;

class App extends React.Component {
     constructor(props) {
        super(props)
          
       }

     render() {

            //console.log("RENDER APP");
            //console.log(this.getAllUrlParams().id);
           return (
            <div>
              <Header/>
            </div>)
     }
 }

ReactDOM.render(<App/>, document.getElementById('root'));