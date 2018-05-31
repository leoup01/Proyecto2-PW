var Table = Reactstrap.Table;

class CategoriasList extends React.Component {
        constructor(props) {
              super(props)
              this.handleDetails = this.handleDetails.bind(this);
        }
            handleDetails(e) {
              console.log("handleDetails");
                const index = e.currentTarget.getAttribute('data-item');
                console.log(index);
                console.log("id is:" + this.props.categorias[index].idCategoria);
                this.props.handleChangeCategoria(this.props.categorias[index]);
            }
            render() {
              console.log("RENDER CATEGORIASLIST");
              if (this.props.categorias.length > 0) {
                const thead = <thead className="thead-dark"><tr><th>Nombre</th><th>Zona</th><th>Encargado</th></tr></thead>;
                const rows = this.props.categorias.map((categoria,index) => 
                      <tr key={index} data-item={index}
                          onClick={this.handleDetails}>
                        <td>{categoria.nombre}</td>
                        <td>{categoria.zona}</td>
                        <td>{categoria.encargadoNom}</td>
                      </tr>);
                const tbody = <tbody>{rows}</tbody>;
                return ( <Table className="table">{thead}{tbody}</Table> );
             }
             return (<p></p>)
            }
    }