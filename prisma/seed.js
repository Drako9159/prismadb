const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

(async function main() {
    try {
        const woopa = await prisma.explorer.upsert({
            where: { name: "Woopa" },
            update: {},
            create: {
                name: "Woopa",
                username: "ajolonauta",
                mission: "Node"
            },
        });

        const woopa1 = await prisma.explorer.upsert({
            where: { name: "Woopa1" },
            update: {},
            create: {
                name: "Woopa1",
                username: "ajolonauta1",
                mission: "Node"
            },
        });

        const woopa2 = await prisma.explorer.upsert({
            where: { name: "Woopa 2" },
            update: {},
            create: {
                name: "Woopa 2",
                username: "ajolonauta2",
                mission: "Java"
            },
        });

        const woopa3 = await prisma.explorer.upsert({
            where: { name: "Woopa 3" },
            update: {},
            create: {
                name: "Woopa 3",
                username: "ajolonauta3",
                mission: "Node"
            },
        });
        
        const Student1 = await prisma.students.upsert({
            where: { name: "Estudiante 1" },
            update: {},
            create: {
                name: "Estudiante 1",
                lang: "Español",
                missionCommander: "Carlo",
                enrollments: 2,
                hasCertification: true
            },
        });

        const Student2 = await prisma.students.upsert({
            where: { name: "Estudiante 2" },
            update: {},
            create: {
                name: "Estudiante 2",
                lang: "Alemán",
                missionCommander: "Carlo",
                enrollments: 1,
                hasCertification: false
            },
        });

        console.log("Se crearón 3 explorers en la tabla Explorer");
        console.log("Se crearón 2 estudiantes en la tabla Students");
    } catch(e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
})();