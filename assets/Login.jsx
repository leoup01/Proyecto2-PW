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
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.DASHBOARD);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
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
            { error && <p>{error.message}</p> }
          </Form>

          <hr/>
          <div className="center-flex">
            <p>Olvido Contraseña?</p>
          </div>
          <div className="center-flex">
            <p>Registrarse</p>
          </div>
        </div>
      </div>
      
    );
  }
 }

ReactDOM.render(<Login/>, document.getElementById('root'));