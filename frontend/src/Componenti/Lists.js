
import 'bootstrap/dist/css/bootstrap.min.css';
import Tabella from './Tabella';
import React from 'react';
import ModalView from './ModalView';

class Lists extends React.Component
{
  constructor(props)
  {
    super(props);
    
    
    this.state = {
      valueList : "1",
      items_lists: [],
      inputID: "",
      inputName: "",
      inputQuantity: "",
      inputPurchased: false,
      show: false,
      message: ''
    };
    this.handleClickSelectList = this.handleClickSelectList.bind(this);
    this.handleChangeSelectList = this.handleChangeSelectList.bind(this);
    this.handleCreateList = this.handleCreateList.bind(this);
    this.handleClickNuovo = this.handleClickNuovo.bind(this);
    this.handleClickSalva = this.handleClickSalva.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeQuantity = this.handleChangeQuantity.bind(this);
    this.handleChangePurchased = this.handleChangePurchased.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
    //this.handleClickEvent = this.handleClickEvent.bind(this);

  }

 


  componentDidMount() {
    
    this.handleCreateList();
    this.handleClick();
    
  }
    

  handleClick()
  {

    fetch(this.props.baseUrl + 'api/items/' + this.state.valueList).then(function (data)
    {
      return data.json();
    }).then(json =>
    {
      if (json === null)
      {
        this.setState({
          show:true,
          message: "No data for list",
          
        });
      } 
    });

  }


  handleCreateList(){
    fetch(this.props.baseUrl + 'api/lists' ).then(function (data)
    {
      return data.json();
    }).then(json =>
    {
      this.setState({
        items_lists: json.map((row) =>
        <option >
        {row.id}-{row.listName}
        </option>),

      });

    })
    .catch(err =>
      {
        console.error(err);
      });
  }

  handleClickSelectList(event)
  {
    
    this.handleClick();

  }


  handleChangeSelectList(event)
  {
    this.setState({
      valueList: event.target.value.split('-')[0]
    });

  }


  handleChangeName(event)
  {
    this.setState({
      inputName: event.target.value,
      
    });
  }

  handleChangeQuantity(event)
  {
    this.setState({
      inputQuantity: event.target.value,
    });
  }

  handleChangePurchased(event)
  {
    this.setState({
      inputPurchased: event.target.checked,
    });
  }

  

  handleClickNuovo(event)
  {

    this.setState({
      inputID: "",
      inputName: "",
      inputQuantity: "",
      inputPurchased: false,
      show: false,
    });
  }

  handleClickSalva(event)
  {

    if (this.state.inputName === "" ||
      this.state.inputQuantity === "" )
    {
      this.setState({
        show: true,
        message: 'Tutti i campi devono essere compilati! '
      })
    }

    else if (isNaN(parseFloat(this.state.inputQuantity)))
    {
      this.setState({
        show: true,
        message: 'Quantity is a number!'
      })
    } else
    {

            
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          listId:this.state.valueList,
          itemName: this.state.inputName,
          quantity: this.state.inputQuantity,
          purchased: this.state.inputPurchased
         })
    };



    fetch(this.props.baseUrl + 'api/lists/'+ this.state.valueList + '/addItem', requestOptions)
        .then(() => console.log('Item created'))
        .catch(err => {
          console.error(err);
        });
      
        this.setState({
          show: true,
          message: 'Item created!'
        })
     
    }
    
  }

  handleClose(event)
  {

    this.setState({
      show: false,
    });
  }

  render()
  {
    return (
      <div class="row">
        <div className="col-md-12">
          <div className="card" >
            <div className="card-body">
              <h5 className="card-title">Item:</h5>
              <div className="input-group mb-3">
              
               <span className="input-group-text">Lists:</span>
                <select value={null}
                  onClick={this.handleClickSelectList}
                  onChange={this.handleChangeSelectList}
                  className="form-select"
                >
                  {this.state.items_lists}
                </select>

                <span className="input-group-text">Item name:</span>
                <input

                  type="text"
                  className="form-control"
                  value={this.state.inputName}
                  onChange={this.handleChangeName}
                />
                <span className="input-group-text">Quantity:</span>
                <input

                  type="text"
                  className="form-control"
                  value={this.state.inputQuantity}
                  onChange={this.handleChangeQuantity}
                />
                <label class="form-check-label" for="flexCheckDefault">Purchased:</label>
                <input

                  type="checkbox"
                  className="form-check-input"
                  checked={this.state.inputPurchased}
                  onChange={this.handleChangePurchased}
                />

              </div>


              <button onClick={this.handleClickNuovo} className="btn btn-primary">
                 New
              </button>
              <button onClick={this.handleClickSalva} className="btn btn-secondary">
                 Save
              </button>
              

              <ModalView
                message={this.state.message} show={this.state.show} handleClose={this.handleClose}
              />
            </div>
          </div>
          <Tabella baseUrl={this.props.baseUrl} valueList={this.state.valueList}/>

        </div>



      </div>

    );
  }
}

export default Lists;
