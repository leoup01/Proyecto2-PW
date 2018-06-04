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
  error: "Luego de registrarse será redirigido a la página de login",
};
class SignUp extends React.Component {
     constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.handleInsertUsuario = this.handleInsertUsuario.bind(this);
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    console.log("onSubmit");
    console.log(this.props);
    console.log(this.state);

    this.handleInsertUsuario(this.state.email, this.state.password);

    event.preventDefault();
  }

  handleInsertUsuario (username, password){
    console.log("INSERT "+username+" "+password);
    fetch("/server/index.php/usuarios/1",{
            method: "post",
            headers: {'Content-Type': 'application/json',
                               'Content-Length': 20},
            body: JSON.stringify({
                method: 'put',
                userId: username,
                password: password,
                rol:"Normal"
                       })
    }).then((response) => {
            localStorage.setItem('regres', response.json());
            window.location.href = "/login";
           //this.props.handleChangeData();
           //console.log("INSERT");
           //console.log(this.props);
           //console.log(this.state);
           //aux = this.handleGetLast();
         }
    );
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
            <h1 className="title-1">Registro</h1>
            <FormGroup> 
            <Input
              value={email}
              onChange={event => this.setState(byPropKey('email', event.target.value))}
              type="text"
              placeholder="Usuario"
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
                Registrarse
              </Button>
            </div>
            { error && <p>{error}</p> }
          </Form>

          <hr/>
          <div className="center-flex">
            <Button href="/login" className="button-sm button-5 center-flex">Ya tiene una cuenta, ingrese al sistema</Button>
          </div>
        </div>
      </div>
      
    );
  }
 }

ReactDOM.render(<SignUp/>, document.getElementById('root'));