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
    const allStudents =  await prisma.explorer.findMany({});
    res.json(allStudents);
});
app.get("/students", async (req, res) => {
    const allStudents =  await prisma.students.findMany({});
    res.json(allStudents);
});
//Regresa el explorer al enviar ID
app.get("/explorers/:id", async (req, res) => {
    const id = req.params.id;
    const explorer = await prisma.explorer.findUnique({where: {id: parseInt(id)}});
    res.json(explorer);
});
app.get("/students/:id", async (req, res) => {
    const id = req.params.id;
    const student = await prisma.students.findUnique({where: {id: parseInt(id)}});
    res.json(student);
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
app.post("/students", async (req, res) => {
    const student = {
        name: req.body.name,
        lang: req.body.lang,
        missionCommander: req.body.missionCommander,
        enrollments: req.body.enrollments,
        hasCertification: req.body.hasCertification
    };
    const message = "Estudiante creado.";
    await prisma.students.create({data: student});
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
app.put("/students/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    await prisma.students.update({
        where: {
            id: id
        },
        data: {
            missionCommander: req.body.missionCommander
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
app.delete("/students/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await prisma.students.delete({where: {id: id}});
    return res.json({message: "Eliminado correctamente"});
});




app.listen(port, () => {
    console.log(`Listening to requests on port ${port}`);
});