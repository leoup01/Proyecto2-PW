var Table = Reactstrap.Table;

class AgenciasList extends React.Component {
        constructor(props) {
              super(props)
              this.handleDetails = this.handleDetails.bind(this);
        }
            handleDetails(e) {
              console.log("handleDetails");
                const index = e.currentTarget.getAttribute('data-item');
                console.log(this.props.agencias[index]);
                this.props.handleChangeAgencia(this.props.agencias[index]);
            }
            render() {
              console.log("RENDER AGENCIASLIST");
              if (this.props.agencias.length > 0) {
                const thead = <thead className="thead-dark"><tr><th>Nombre</th><th>País</th><th>Especialidad</th><th>Teléfono</th><th>Correo</th></tr></thead>;
                const rows = this.props.agencias.map((agencia,index) => 
                      <tr key={agencia.idAgencia} data-item={index}
                          onClick={this.handleDetails}>
                        <td>{agencia.nombre}</td>
                        <td>{agencia.pais}</td>
                        <td>{agencia.especialidad}</td>
                        <td>{agencia.telefono}</td>
                        <td>{agencia.correo}</td>
                      </tr>);
                const tbody = <tbody>{rows}</tbody>;
                return ( <Table className="table">{thead}{tbody}</Table> );
             }
             return (<p></p>)
            }
    }