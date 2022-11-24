import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalView from './ModalView';

class Tabella extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      rows: [],
      purchased:false,
      show: false,
      message: ''
    }

    this.handleDelete = this.handleDelete.bind(this);
    this.handleClickEvent = this.handleClickEvent.bind(this);
    this.handleClick = this.handleClick.bind(this);
    //this.handleChangePurchased = this.handleChangePurchased.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleEdit = this.handleEdit.bind(this);

  }

  componentDidMount()
  {
    this.handleClick();
    document.addEventListener('click', this.handleClickEvent)
  }

  componentWillUnmount()
  {
    document.removeEventListener('click', this.handleClickEvent)
  }

  handleClickEvent(event)
  {
    this.handleClick();
  }



  handleClick()
  {
    fetch(this.props.baseUrl + 'api/items/' + this.props.valueList).then(function (data)
    {
      return data.json();
    }).then(json =>
    {
      this.setState({
        rows: json.map((row) =>
          <tr  >
            
            <td>{row.itemName}</td>
            <td>{row.quantity}{row.purchased}</td>
            <td><input
                type="checkbox"
                className="form-check-input"
                id={row.itemName}
                checked={row.purchased}
                onClick={this.handleEdit}
                /> 
            </td>
            <td ><button id={row.itemName} onClick={this.handleDelete} className="btn btn-danger">
               Delete
            </button></td>

          </tr>),

      });

    })
    .catch(err =>
      {
        console.error(err);
      });

  }



  handleDelete = (e) =>
  {

    const key = e.currentTarget.getAttribute("id");


    fetch(this.props.baseUrl + 'api/lists/' + this.props.valueList + "/"+ key + "/delete",
      {
        method: 'DELETE',

      })
      .then(() => console.log('Item deleted: ' + key))
      .catch(err =>
      {
        console.error(err);
      });

      this.setState({
        show: true,
        message: 'Item deleted!'
      })


    this.handleClick();

  }

  handleEdit = (e) =>
  {
    const key = e.currentTarget.getAttribute("id");
    const purchased =e.target.checked;
    

    fetch(this.props.baseUrl + 'api/lists/' + this.props.valueList + "/"+ key + "/"+ purchased +"/update",
    {
      method: 'PUT',
    })
    .then(() => console.log('Item purchased: ' + key))
    .catch(err =>
    {
      console.error(err);
    });

    if (purchased){
        this.setState({
            show: true,
            message: 'Item purchased!'
        });
    }
   
  }


  handleClose(event)
  {

    this.setState({
      show: false,
    });
  }


  /*handleChangePurchased(event)
  {
    this.setState({
      purchased: event.target.value,
    });
  }*/



  render()
  {

    return (


      <>
        <table className="table table-striped" >
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Purchased</th>
            </tr>
          </thead>
          <tbody>
            {this.state.rows}
          </tbody>
        </table>
        
        <ModalView
                message={this.state.message} show={this.state.show} handleClose={this.handleClose}
              />
        
      </>
    );
  }
}
export default Tabella;
