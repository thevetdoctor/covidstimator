import express from 'express';
import parser from 'body-parser';
import cors from 'cors';


const app = express();
const cors = cors();
const port = process.env.PORT || 3000;

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));


app.listen(port, () => {
    console.log(`Server started on ${port}`);
})


export default app;