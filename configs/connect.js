const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB Server Connected"))
    .catch((err) => {
        console.log(`Err : - ${err}`)
        process.exit();
    })
module.exports = mongoose;