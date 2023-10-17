const express = require('express');




const app = express();

app.use(express.json());
app.use(express.urlencoded({
	extended:true,
}))

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}. (http://localhost:${PORT})`);
});
