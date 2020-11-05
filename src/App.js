import "./App.css";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  NavLink,
} from "react-router-dom";

function Header() {
  return (
    <div>
      <ul className="header">
        <li>
          <NavLink exact activeClassName="active" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/products">
            Products
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/add-book">
            Add Book
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/find-book">
            Find Book
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/company">
            Company
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

function Home() {
  return(
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Products(props) {
  let { path, url } = useRouteMatch();
  return (
    <div>
      <h2>Products</h2>
      <p>Length: {props.bookFacade.getBooks().length}</p>
      <ul>
        {props.bookFacade.getBooks().map((el) => (
          <li>
            {el.title} <NavLink to={`${url}/${el.id}`}>details</NavLink>
          </li>
        ))}
      </ul>
      <Switch>
        <Route exact path={path}>
        <p>Book details for selected book will go here</p>
        </Route>
        <Route path={`${path}/:titleID`}>
          <Details bookFacade={props.bookFacade}/>
        </Route>
      </Switch>
      
    </div>
  );
}

function Details(props) {
  let { titleID } = useParams();

  return(
    <div>
      <p>Make box!</p>
      <p>Title: {props.bookFacade.findBook(titleID).title}</p>
      <p>ID: {props.bookFacade.findBook(titleID).id}</p>
      <p>Info: {props.bookFacade.findBook(titleID).info}</p>
    </div>
  )
}

function Company() {
  return(
    <div>
      <h2>Company</h2>
    </div>
  );
}

function FindBook(props) {
  const [book, setBook] = useState({});
  const [id, setId] = useState();

  const handleChange = event => {
    const target = event.target;
    const value = target.value;
    setId(value);
  }

  const handleSubmit = event => {
    event.preventDefault();
    let bookFound = props.bookFacade.findBook(id);
    setBook(bookFound);
  }

  const handleDelete = event => {
    event.preventDefault();
    console.log(id);
    props.bookFacade.deleteBook(id);
    //setBook(bookDeleted);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="id"
          type="number"
          onChange={handleChange}
          placeholder="Enter book ID"
        />
        <input type="submit" value="Find Book"/>
      </form>
      <p>Enter ID for book to find</p>
      <p>{book.title}</p>
      <p>{book.id}</p>
      <p>{book.info}</p>
      <input type="button" onClick={handleDelete} value="Delete Book"/>
      {/* <button onClick={handleDelete}>Delete</button> */}
    </div>
  );
}

function AddBook(props) {
  //Opgave 12, kom tilbage!! Tilføj advarsel

  const [book, setBook] = useState({});

  const handleSubmit = event => {
    event.preventDefault();
    props.bookFacade.addBook(book);
  }

  const handleChange = event => {
    const target = event.target;
    const value = target.value;
    const vari = target.name;
    setBook({...book, [vari]: value});
  }

  return (
    <div>
      <h2>Add Book</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            value={book.title}
            type="text"
            onChange={handleChange}
            placeholder="Add title"
          />
          <br />
          <input 
          name="info" 
          value={book.info}
          type="text" 
          onChange={handleChange}
          placeholder="Add info" 
          />
          <br />
          <input type="submit" value="Submit" />
        </form>
        <p>End of form</p>
      </div>
    </div>
  );
}

function NoMatch() {
  return(
    <div>
      <h2>No match found</h2>
    </div>
  )
}

function App(props) {
  return (
    <div className="App">
      <div>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/products">
            <Products bookFacade={props.bookFacade}/>
          </Route>
          <Route path="/company">
            <Company />
          </Route>
          <Route path="/add-book">
            <AddBook bookFacade={props.bookFacade}/>
          </Route>
          <Route path="/find-book">
            <FindBook bookFacade={props.bookFacade}/>
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
