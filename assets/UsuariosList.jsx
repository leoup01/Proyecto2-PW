var Table = Reactstrap.Table;

class UsuariosList extends React.Component {
        constructor(props) {
              super(props)
              this.handleDetails = this.handleDetails.bind(this);
        }
            handleDetails(e) {
              console.log("handleDetails");
                const index = e.currentTarget.getAttribute('data-item');
                this.props.handleChangeUsuario(this.props.usuarios[index]);
            }
            render() {
              console.log("RENDER PERIODISTASLIST");
              if (this.props.usuarios.length > 0) {
                const thead = <thead className="thead-dark"><tr><th>Usuario</th><th>Nombre</th><th>Correo</th><th>País</th><th>Ciudad</th><th>Edad</th><th>Género</th><th>Rol</th></tr></thead>;
                const rows = this.props.usuarios.map((usuario,index) => 
                      <tr key={usuario.userId} data-item={index}
                          onClick={this.handleDetails}>
                        <td>{usuario.userId}</td>
                        <td>{usuario.nombre}</td>
                        <td>{usuario.correo}</td>
                        <td>{usuario.pais}</td>
                        <td>{usuario.ciudad}</td>
                        <td>{usuario.edad}</td>
                        <td>{usuario.genero}</td>
                        <td>{usuario.rol}</td>
                      </tr>);
                const tbody = <tbody>{rows}</tbody>;
                return ( <Table className="table">{thead}{tbody}</Table> );
             }
             return (<p></p>)
            }
    }