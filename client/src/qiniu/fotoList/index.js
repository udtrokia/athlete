
import React,{Component} from 'react';
import $ from 'jquery'
import {
    Button,
    Col,
    Card,
    CardImg,
    CardBody,
    CardText,
}from 'reactstrap'
import logo from './logo.svg';
import './App.css';
import Scroll from 'react-scroll'
import scroll from 'react-scroll'

export default class Index extends Component{
    constructor(props){
	super(props)
	this.state={
	    files:[],
	    preview:'',
	    showPreview:false,
	    showUpload:false,
	    loading:false,
	    page:0,
	    fotoList:[],
	    listLen:0
	}
    }
    componentWillMount(){
	let Events = Scroll.Events
	Events.scrollEvent.register()
    }
    componentDidMount(){
	this.getList(this.state.page)
    }
    getList=(page)=>{
	let options={
	    col:{},
	    page:page
	}
	$.get('http://localhost:9999/mongo',options,(res)=>{
	    this.setState({fotoList:res})
	})
    }
    thumb=(foto)=>{
	let options={
	    url:foto.url,
	    thumb:Number(foto.thumb)+1
	}
        $.ajax({
	    url: 'http://localhost:9999/mongo',
	    type:'put',
	    dataType:'JSON',
	    data:options,
	    success: function(res) {
		alert('点赞成功! 刷新后查看~')
	    }
	});
    }
    fotoList=()=>{
	const fotoList = this.state.fotoList.map((foto)=>{	    
	    return(
		    <Col key={foto.url} className="mb-2">
		    <Card style={{width:'20rem'}} style={{display:'inline-block'}}>
		    <CardImg top style={{width:"20rem"}} src={foto.url} alt="Card image cap" />		    
		    <CardBody>
		    <CardText>拍客:{foto.name}</CardText>
		    <Button
		color="primary"
		style={{borderRadius:25}}
		onClick={()=>this.thumb(foto)}
		    >{foto.thumb}<span> 👍</span></Button>
		    </CardBody>
		    </Card>
		    </Col>
	    )
	})
	return <div >{fotoList}</div>
    }
    gohash=(n)=>{
	let page = this.state.page
	this.setState({
	    page:page+n
	})
	this.getList(page+n)
    }
    render() {
	return (
	        <div className="App">
		<header className="App-header">
		<img src={logo} className="App-logo" alt="logo" />
		<h1 className="App-title">照片列表</h1>
		</header>
		<p className="App-intro mt-3">
		觉得拍的还不错就点个赞吧~
	    </p>
		{this.fotoList()}	    
		<div style={{height:"5rem",backgroundColor:'#222',bottom:0}} />
		</div>
	);
    }
}
