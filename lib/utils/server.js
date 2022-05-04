const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

//Require para usar Prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.get("/", (req, res) => {
    res.json({message: "alive"});
});
//Regresa todos los explorers
app.get("/explorers", async (req, res) => {
    const allExplorers =  await prisma.explorer.findMany({});
    res.json(allExplorers);
});
//Regresa el explorer al enviar ID
app.get("/explorers/:id", async (req, res) => {
    const id = req.params.id;
    const explorer = await prisma.explorer.findUnique({where: {id: parseInt(id)}});
    res.json(explorer);
});
//Crea nuevos explorers
app.post("/explorers", async (req, res) => {
    const explorer = {
        name: req.body.name,
        username: req.body.username,
        mission: req.body.mission
    };
    const message = "Explorer creado.";
    await prisma.explorer.create({data: explorer});
    return res.json({message});
});
//Para actualizar el cuerpo del request los campos aa actualizar, se usa un update
app.put("/explorers/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    await prisma.explorer.update({
        where: {
            id: id
        },
        data: {
            mission: req.body.mission
        }
    });

    return res.json({message: "Actualizado correctamente"});
});
//DELEte para eliminar un explrer dado un ID
app.delete("/explorers/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await prisma.explorer.delete({where: {id: id}});
    return res.json({message: "Eliminado correctamente"});
});



app.listen(port, () => {
    console.log(`Listening to requests on port ${port}`);
});