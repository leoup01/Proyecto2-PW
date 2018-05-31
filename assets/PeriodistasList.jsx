var Table = Reactstrap.Table;

class PeriodistasList extends React.Component {
        constructor(props) {
              super(props)
              this.handleDetails = this.handleDetails.bind(this);
        }
            handleDetails(e) {
              console.log("handleDetails");
                const index = e.currentTarget.getAttribute('data-item');
                console.log(this.props.periodistas[index]);
                this.props.handleChangePeriodista(this.props.periodistas[index]);
            }
            render() {
              console.log("RENDER PERIODISTASLIST");
              if (this.props.periodistas.length > 0) {
                const thead = <thead className="thead-dark"><tr><th>Usuario</th><th>Teléfono</th><th>Ciudad</th></tr></thead>;
                const rows = this.props.periodistas.map((periodista,index) => 
                      <tr key={periodista.idPeriodista} data-item={index}
                          onClick={this.handleDetails}>
                        <td>{periodista.usuario}</td>
                        <td>{periodista.telefono}</td>
                        <td>{periodista.ciudad}</td>
                      </tr>);
                const tbody = <tbody>{rows}</tbody>;
                return ( <Table className="table">{thead}{tbody}</Table> );
             }
             return (<p></p>)
            }
    }