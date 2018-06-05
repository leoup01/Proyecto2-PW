var Table = Reactstrap.Table;

class BoletinesDetalleList extends React.Component {
        constructor(props) {
              super(props)
              this.handleDetails = this.handleDetails.bind(this);
        }
            handleDetails(e) {
              console.log("handleDetails");
                const index = e.currentTarget.getAttribute('data-item');
                console.log(index);
                console.log("id is:" + this.props.boletines[index].idBoletin);
                this.props.handleChangeBoletin(this.props.boletines[index]);
            }

            
            render() {
              console.log("RENDER BOLETINESLIST");
              if (this.props.boletines.length > 0) {
                const thead = <thead className="thead-dark"><tr><th>Numero</th><th>Fecha</th><th>Estado</th></tr></thead>;
                const rows = this.props.boletines.map((boletin,index) => 
                      <tr key={index} data-item={index}
                          onClick={this.handleDetails}>
                        <td>{boletin.numero}</td>
                        <td>{boletin.fecha}</td>
                        <td>{this.props.unread.includes(boletin.idBoletin)?"Sin Leer":"Leído"}</td>
                      </tr>);
                const tbody = <tbody>{rows}</tbody>;
                return ( <Table className="table">{thead}{tbody}</Table> );
             }
             return (<p></p>)
            }
    }