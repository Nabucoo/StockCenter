require('dotenv').config();

const app = require('./app')

console.log(`usando bdd: ${process.env.DB_NAME}`);

const connection = require('./database/connection')

async function teste() {
    try {
        const conn = await connection.getConnection();
        console.log('conexao feita!');
        conn.release();
    } catch (error) {
        console.log(error);
    }
}

teste();

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000!")
})