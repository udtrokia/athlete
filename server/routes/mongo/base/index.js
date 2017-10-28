var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fotos', { useMongoClient: true });

var qqSchema = mongoose.Schema({
    qq:String,
    name:String,
    url:String,
    thumb:Number
})

var Qq = mongoose.model('Qq',qqSchema);

module.exports={
    Qq
}
