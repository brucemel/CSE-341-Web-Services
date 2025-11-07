require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 8080;

// Connection string desde variable de entorno
const MONGO_URI = process.env.MONGO_URI;

// Agregar un console.log para verificar (temporal)
console.log('🔍 Verificando MONGO_URI:', MONGO_URI ? '✅ Configurado' : '❌ No encontrado');

const DB_NAME = 'professionalDB';
const COLLECTION_NAME = 'profiles';

app.use(cors());
app.use(express.json());

let db;
let collection;

const professionalData = {
  professionalName: "Bruce - Desarrollador Web",
  base64Image: "/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAyADIDAREAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlbaWmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//2Q==",
  nameLink: {
    firstName: "Bruce",
    url: "https://www.byui.edu"
  },
  primaryDescription: " es estudiante de Web Services en BYU-Idaho.",
  workDescription1: "Estudiante de CSE 341 - Web Services. Conectando APIs con MongoDB Atlas en la nube.",
  workDescription2: "Aprendiendo desarrollo backend con Node.js, Express y bases de datos NoSQL.",
  linkTitleText: "Encuéntrame en:",
  linkedInLink: {
    text: "LinkedIn",
    link: "https://www.linkedin.com/in/tu-perfil"
  },
  githubLink: {
    text: "GitHub",
    link: "https://github.com/tu-usuario"
  }
};

async function connectToMongoDB() {
  try {
    console.log('🔄 Intentando conectar a MongoDB Atlas...');
    const client = await MongoClient.connect(MONGO_URI);
    console.log('✅ ¡Conectado exitosamente a MongoDB Atlas!');
    
    db = client.db(DB_NAME);
    collection = db.collection(COLLECTION_NAME);
    
    const count = await collection.countDocuments();
    if (count === 0) {
      await collection.insertOne(professionalData);
      console.log('📝 Datos insertados en la base de datos');
    } else {
      console.log(`📊 La base de datos ya tiene ${count} documento(s)`);
    }
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
    console.log('\n🔍 Posibles soluciones:');
    console.log('1. Verifica tu usuario y contraseña en Atlas');
    console.log('2. Asegúrate de que tu IP esté en la whitelist');
    console.log('3. Espera 2-3 minutos después de cambios en Atlas');
  }
}

app.get('/professional', async (req, res) => {
  try {
    if (!collection) {
      return res.status(500).json({ error: 'Base de datos no conectada' });
    }
    
    const data = await collection.findOne({});
    if (!data) {
      return res.status(404).json({ error: 'No se encontraron datos' });
    }
    
    delete data._id;
    console.log('✅ Datos enviados al cliente');
    res.json(data);
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ error: 'Error obteniendo datos' });
  }
});

app.get('/', (req, res) => {
  res.send('✅ API funcionando. Endpoint: /professional');
});

connectToMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`\n🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📡 Endpoint: http://localhost:${PORT}/professional`);
  });
});