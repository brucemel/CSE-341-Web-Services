const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://brucemel:Jmlbruce21@cluster0.jkxrt3m.mongodb.net/?retryWrites=true&w=majority";
    
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        console.log("✅ Conectado exitosamente a MongoDB!");
        
        // Listar las bases de datos
        await listDatabases(client);
        
    } catch (e) {
        console.error("❌ Error:", e.message);
    } finally {
        await client.close();
    }
}

async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();
    
    console.log("\n📚 Bases de datos disponibles:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

main().catch(console.error);