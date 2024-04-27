import express from "express";
import 'dotenv/config'
import cors from 'cors';
import multer from 'multer';
import csvToJson from 'convert-csv-to-json';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


const storage = multer.memoryStorage();
const update = multer({ storage });
let userData: Array<Record<string, string>> = [];


app.post('/api/files', update.single('file'), async (req, res) => {

    //extraer el archivo que recibimos
    const { file } = req;
    if (!file) return res.status(404).send('insertar archivo');

    //validar que sea un archivo del tipo csv
    if (file.mimetype !== 'text/csv') return res.status(404).send('formato de archivo incorrecto');

    //transofrmar de Buffer( archivo en formato binario) a string y despues a json
    try {
        const csv = Buffer.from(file.buffer).toString('utf-8')
        const json = csvToJson.csvStringToJson(csv);
        //guardamos el json en db o memoria local
        userData = json
    } catch (err) {
        res.status(500).send('Error convirtiendo a Json');
    };

    return res.status(200).json({ data: userData, messege: 'ok' });
});

app.get('/api/files', async (req, res) => {
    //sacamos parametros 'q=' que pueda haber en el link de la consulta.
    const { q } = req.query;
    if (!q) return res.status(500).send('no hay filtros');

    const search = q.toString().toLowerCase();
    //filtrar
    const filteredData = userData.filter((data) => {
        return Object.values(data).some((value) => value.toLowerCase().includes(search));
    });

    return res.status(200).json({ data: filteredData });
});


app.listen(PORT, () => { console.log(`listening at ${PORT}`) });

function csvStringToJson(result: string) {
    throw new Error("Function not implemented.");
}
