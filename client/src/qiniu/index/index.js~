
import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Dropzone from 'react-dropzone'
import $ from 'jquery'
import {
    ListGroup,
    ListGroupItem,
    Button,
    Col,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Label,
    Alert
}from 'reactstrap'
export default class Index extends Component{
    constructor(props){
	super(props)
	this.state={
	    files:[],
	    name:'',
	    preview:'',
	    showPreview:false,
	    showUpload:false,
	    loading:false	    
	}
    }
    onDrop=files => {
	console.log(files)
	this.setState({
	    files
	})
    }
    cancel=()=>{
	this.setState({files:[]})
    }
    upload=()=>{
	this.setState({
	    showUpload:!this.state.showUpload
	})
    }
    showpic=(url)=>{
	this.setState({
	    showPreview:!this.state.showPreview,
	    preview:url
	})
    }
    toServer=()=>{
	console.log("files+"+this.state.files)
	console.log("qq"+this.state.qq)
	if(!this.state.qq){
	    alert('请输入您的qq')
	    return
	}
	this.setState({	    
	    showUpload:!this.state.showUpload
	},()=>{
	    this.setState({loading:true})
	    var that = this
	    let uploadData = new FormData()
	    this.state.files.forEach(f=>{
		console.log(f)
		uploadData.append("photos",f)
	    })
	    $.ajax({
		url: 'http://upload.udtrokia.com/upload?qq='+this.state.qq+"&name="+this.state.name,
		type:'put',
		data:uploadData,
		cache: true,
		processData: false,
		contentType: false,
		dataType:'JSON',
		success: function(res) {
		    that.setState({
			loading:false,
			files:[]
		    },()=>{
			alert('上传成功!')
		    })
		}
	    });
	})
	
    }
    previewModal=()=>{
	return(
		<Modal isOpen={this.state.showPreview}
	    toggle={this.showpic} className={this.props.className}>
		<ModalHeader toggle={this.showpic}>我的照片</ModalHeader>
		<ModalBody className="text-center">
		<img
	    style={{width:'20rem'}}
	    alt="显示失败请重新上传"
	    src={this.state.preview}/>
		</ModalBody>
		<ModalFooter>
		<Button color="secondary" onClick={this.showpic}>关闭</Button>
		</ModalFooter>
		</Modal>
	)
    }
    uploadModal=()=>{
	return(
		<Modal isOpen={this.state.showUpload}
	    toggle={this.upload} className={this.props.className}>
		<ModalHeader toggle={this.upload}>上传</ModalHeader>
		<ModalBody className="text-center">
		<Label>请输入您的姓名和QQ, 以方便我们在整理完照片后联系您</Label>
		<Input placeholder="姓名" className="mt-2" onChange={(e)=>{
		    this.setState({name:e.target.value})
		}}/>		
		<Input placeholder="qq" className="mt-2" onChange={(e)=>{
		    this.setState({qq:e.target.value})
		}}/>
		</ModalBody>
		<ModalFooter>
		<Button color="primary" onClick={this.toServer}>上传</Button>
		</ModalFooter>
		</Modal>
	)
    }    
    preview=()=>{
	let imgs = this.state.files.map(
	    f =>(		
		    <ListGroupItem
		key={f.name} name={f.name}
		onClick={()=>this.showpic(f.preview)}
		action
		    >
		    {f.name} - {f.size} bytes
		</ListGroupItem>
	    )
	)
	return(
		<ListGroup
	    style={{display:'inline-block',width:'25rem'}}
	    className="mt-3">{imgs}</ListGroup>
	)
    }
    loading=()=>{
	if(this.state.loading){
	    return(
		    <Alert style={{
			display:'flex',
			position:'absolute',
			zIndex:999,
			alignSelf:'center',
			width:'18rem'
		    }}>正在上传中....</Alert>
	    )
	}
    }
    render() {
	var style={
	    btn:{
		width:"8rem",
		margin:"1rem"
	    }
	}    	
	return (
	        <div className="App">
		<header className="App-header">
		<img src={logo} className="App-logo" alt="logo" />
		<h1 className="App-title">用沙漏做招牌的疗养院</h1>
		</header>
		<p className="App-intro mt-3">
		安庆师范大学运动会 -> 运动员照片上传
	    </p>
		<Col>
		<Dropzone
	    className="mt-2"
	    style={{
		    display:'inline-block',
		    width:'18rem',
		    height:'2rem',
		    border:'0.1rem solid black',
		    alignSelf:'center',
	    }}
	    onDrop={this.onDrop}>
		<p>点击此处选择照片</p>
	    {this.loading()}		
		{this.previewModal()}
	    {this.uploadModal()}
		</Dropzone>
		</Col>
		{this.preview()}		
		<Col className="mt-1">
		<Button onClick={this.cancel} style={style.btn}>清空</Button>
		<Button
	    onClick={this.upload} color="primary" style={style.btn}>上传</Button>		
		</Col>
		</div>
	);
    }
}
