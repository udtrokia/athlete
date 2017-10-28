
var express = require('express');
var router = express.Router();
var Qq = require('./base').Qq

router.get('/',(req,res)=>{
    console.log(req.query)
    let page=req.query.page
    Qq.find({},null,{limit:10,skip:page*10,sort:{_id:-1}},(err,doc)=>{
	res.send(doc)
    })
})

router.post('/',(req,res)=>{
    Qq.count({},(err,count)=>{
	if(err){console.error(err)}
	res.send({count:count})
    })
})

router.put('/',(req,res)=>{
    let body = req.body
    Qq.update({url:body.url},{thumb:body.thumb},{upsert:true},(err,raw)=>{
	if (err){console.error(err)};
	console.log('The raw response from Mongo was ', raw);
	res.send({stat:raw})
    })
})

module.exports=router
