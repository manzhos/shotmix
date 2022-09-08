import React, {Component} from "react";

class RegForm extends Component {
  constructor(props){
    super(props);
    this.state ={nickname: '', email: '', password: ''}
  }

  changeHandler = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  saveHandler = (event) => {
    console.log("form:", this.state);
    fetch("http://localhost:3300/reg", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(this.state)
    }).then((res)=>{
      console.log(res);
      return res.json();
    });
    event.preventDefault();
  }

  render() {
    return(
      <form>
        <div className="form-group">
          <label htmlFor="nickname">Nickname</label>
          <input id="nickname" name="nickname" onChange={this.changeHandler} />
        </div>
        <div className="form-group">
          <label htmlFor="nickname">Email</label>
          <input id="email" name="email" onChange={this.changeHandler} />
        </div>
        <div className="form-group">
          <label htmlFor="nickname">Password</label>
          <input id="password" name="password" onChange={this.changeHandler} />
        </div>
        <button type="submit" onClick={this.saveHandler}>Save</button>
      </form>
    )
  }
}

export default RegForm;
