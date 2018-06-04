var Table = Reactstrap.Table;

class BoletinesDetalleNoticiasList extends React.Component {
        constructor(props) {
              super(props)
              this.handleDetails = this.handleDetails.bind(this);
        }
            handleDetails(e) {
              console.log("handleDetails");
                const index = e.currentTarget.getAttribute('data-item');
                console.log(index);
                console.log("id is:" + this.props.noticias[index].idNoticia);
                ///this.props.handleChangeBoletin(this.props.boletines[index]);
            }
            render() {
              console.log("RENDER BOLETINESLIST");
              if (this.props.noticias.length > 0) {
                const thead = <thead className="thead-dark"><tr><th>Numero</th><th>Fecha</th></tr></thead>;
                const rows = this.props.noticias.map((boletin,index) => 
                      <tr key={index} data-item={index}
                          onClick={this.handleDetails}>
                        <td>{boletin.idNoticia}</td>
                        <td>{boletin.titulo}</td>
                      </tr>);
                const tbody = <tbody>{rows}</tbody>;
                return ( <Table className="table">{thead}{tbody}</Table> );
             }
             return (<p></p>)
            }
    }