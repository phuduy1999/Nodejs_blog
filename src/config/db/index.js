const mongoose = require('mongoose');

async function connect(){
    try{
        await mongoose.connect('mongodb://localhost/f8_education_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
          });
          console.log('successfully');
    }catch(e){
        console.log(e);
    }
}

module.exports ={connect};