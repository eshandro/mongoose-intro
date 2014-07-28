var mongoose = require('mongoose')
// mongoose.model defines a constructor object that 
// corresponds to a collection in your db
// first arguemnt  is the name (singular)
// second argument is the schema (object literal) that defines
// the properties allowed on documents in the collection
var User = mongoose.model('User', {
	// Every object has _id and this line defines its schema
	// for mongoose
	// _id: mongoose.Schema.Types.ObjectId,
	// key is arbitray name for that property
	// value is a constructor that indicates the type
	email: String
})

module.exports = User