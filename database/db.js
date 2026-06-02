const mongoose = require('mongoose');

const connectDB = () => {

mongoose.connect(process.env.MONGO_URI,{

})
.then(()=>console.log("DB Connected Successfully"))
.catch((err)=>console.log("The errro is ", err));
}

module.exports = connectDB