var Input = Reactstrap.Input;
var Form = Reactstrap.Form;
var FormGroup = Reactstrap.FormGroup;
var Button = Reactstrap.Button;

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};
class Login extends React.Component {
     constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };

    this.handleGetUsuario = this.handleGetUsuario.bind(this);
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    this.handleGetUsuario(this.state.email);

    event.preventDefault();
  }

  handleGetUsuario(id) {
          //event.preventDefault();
          //let receiptId = this.state.receipt['receipt_id'];
          //console.log(receiptId);
          fetch('/server/index.php/usuarios/'+id)
               .then((response) => {
                   return response.json()
               })
               .then((data) => {
                  console.log("User Found");
                  console.log(data[0]);
                   //this.setState({ receipt: data[0] });
                   if(this.state.password === data[0].password){
                      localStorage.setItem('userIdLS', data[0].userId);
                      this.setState(byPropKey('error', ""));
                      window.location.href = "/index";
                   }
                   else{
                      this.setState(byPropKey('error', "Contraseña incorrecta."));
                   }
                   
                   //this.forceUpdate();
             }).catch((error)=>{
                //console.log("ERROR handleGetReceipt");
                //this.handleGetReceipt(null);
                console.log("ERROR");
                this.setState(byPropKey('error', "Usuario no encontrado."));
             })
      }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <div className="container-login">
        <div className="box-login">
          <Form onSubmit={this.onSubmit}>
            <h1 className="title-1">Login</h1>
            <FormGroup> 
            <Input
              value={email}
              onChange={event => this.setState(byPropKey('email', event.target.value))}
              type="text"
              placeholder="Correo electrónico"
            />
            </FormGroup> 
            <FormGroup> 
            <Input
              value={password}
              onChange={event => this.setState(byPropKey('password', event.target.value))}
              type="password"
              placeholder="Contraseña"
            />
            </FormGroup> 
            <div className="center-flex">
              <Button disabled={isInvalid} type="submit" className="button button-1 center-flex">
                Ingresar
              </Button>
            </div>
            { error && <p>{error}</p> }
          </Form>

          <hr/>
          <div className="center-flex">
            <Button href="/signup" className="button-sm button-5 center-flex">No tiene una cuenta, Registrarse</Button>
          </div>
        </div>
      </div>
      
    );
  }
 }

ReactDOM.render(<Login/>, document.getElementById('root'));