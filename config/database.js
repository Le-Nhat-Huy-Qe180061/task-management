
const mongoose = require("mongoose");

module.exports.connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connect Success!");
    } catch {
        console.log("Connect Error!");
    }
}

// module.exports.connect = async () => {
// 		let timeout = 25;
// 		while (mongoose.connection.readyState === 0) {
// 			if (timeout === 0) {
// 				console.log('timeout');
// 				throw new Error(
// 					'timeout occured with mongoose connection',
// 				);
// 			}
// 			await mongoose.connect("mongodb://localhost:27017/task-management", {
// 				useNewUrlParser: true,
// 				useUnifiedTopology: true,
// 			});
// 			timeout--;
// 		}
// 		console.log(
// 			'Database connection status:',
// 			mongoose.connection.readyState,
// 		);
// 	}