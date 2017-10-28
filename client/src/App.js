import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,    
} from 'react-router-dom'
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

import Upload from './qiniu/index'
import FotoList from './qiniu/fotoList'

class App extends Component {
    render(){
	return(
		<div>
		<Navbar color="#222" dark style={{backgroundColor:'#222'}} light expand="sm">
		<NavbarBrand href="/">照片</NavbarBrand>
		<Nav className="ml-auto" navbar>
		<NavItem>
		<NavLink href="/upload">上传</NavLink>
		</NavItem>
		</Nav>
		</Navbar>
		
		<Router className="foo">
		<Switch>
		<Route exact path="/" component={FotoList}/>
		<Route exact path="/upload" component={Upload}/>		
		</Switch>
		</Router>
		</div>
	);
    }
}

export default App;
