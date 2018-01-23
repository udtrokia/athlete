
var express = require('express');
var router = express.Router();
var fs = require('fs');
//mongoose
var Qq = require('../mongo/base').Qq
//multer
var multer = require('multer')
var storage = multer.diskStorage({
    destination:(req,file,cb)=>{
	let qq = req.query.qq
	let dest = 'public/fotos/'+qq
	fs.mkdir(dest,(err)=>{
	    if(err){console.error(err)}
	    cb(null,dest)
	})
    },
    filename:(req,file,cb)=>{
	let qq = req.query.qq
	let name = req.query.name
	let path=qq+'-'+Date.now()
	let fotoUrl = "http://localhost:9999/fotos/"+qq+'/'+path
	let qqid = new Qq({qq:qq,name:name,url:fotoUrl,thumb:0})
	qqid.save()
	cb(null,path)
    }
})
var upload= multer({storage:storage})
/* GET home page. */
router.get('/', function(req, res) {
    console.log('you get me ')
    console.log(req.body)
});

router.post('/',(req,res)=>{
    console.log('you post me ')
    console.log(req.body)
    res.send({stat:'scuess'})    
})

router.put('/',upload.array('photos',12),(req,res)=>{
    console.log(req.body)
    console.log(req.files)
    res.send({stat:'scuess'})
})

module.exports = router;
