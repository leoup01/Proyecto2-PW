var Table = Reactstrap.Table;

class NoticiasList extends React.Component {
        constructor(props) {
              super(props)
              this.handleDetails = this.handleDetails.bind(this);
        }
            handleDetails(e) {
              console.log("handleDetails");
                const index = e.currentTarget.getAttribute('data-item');
                console.log(index);
                console.log("id is:" + this.props.noticias[index].idNoticia);
                this.props.handleChangeNoticia(this.props.noticias[index]);
            }
            render() {
              console.log("RENDER NOTICIASLIST");
              if (this.props.noticias.length > 0) {
                const thead = <thead className="thead-dark"><tr><th>Titulo</th><th>Fecha</th><th>Lugar</th></tr></thead>;
                const rows = this.props.noticias.map((noticia,index) => 
                      <tr key={index} data-item={index}
                          onClick={this.handleDetails}>
                        <td>{noticia.titulo}</td>
                        <td>{noticia.fecha}</td>
                        <td>{noticia.lugar}</td>
                      </tr>);
                const tbody = <tbody>{rows}</tbody>;
                return ( <Table className="table">{thead}{tbody}</Table> );
             }
             return (<p></p>)
            }
    }