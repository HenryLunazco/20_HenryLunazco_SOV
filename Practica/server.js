//Requiriendo el módulo 'express', 'cors' y 'body-parser'
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

//Requiriendo la conexión a BD gestor (MySQL)
const connection = require("./db");

//Creando una nueva aplicación Express.
const app = express();
const path = require("path");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/public", express.static(path.join(__dirname, "public")));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.get("/", (req, res) => {
    res.render("inicio", {
        rutaActual: "/"
    });
});

app.get("/form-estudiante", (req, res) => {
    res.render("pages/form", {
        rutaActual: "/form-estudiante",
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('El servidor esta en el puerto ' + PORT);
});

//Envio de datos a base de datos

app.post("/procesar-formulario", async (req, res) => {
    console.log(req.body);

    for (const campo in req.body){
        if (req.body[campo] === undefined || req.body[campo] === ''){
            res.send(`Error: El campo ${campo} está vacio o indifinido`);
            return;
        }
    }
    const{
        nombre_apellido,
        correo,
        curso,
        dni,
        celular,
        direccion
    } = body;
    try {
        const query =
            "INSERT INTO estudiantes (nombre_apellido, correo, curso, dni, celular, direccion) VALUES(?, ?, ?, ?, ?, ?, ?)";
        await connection.execute(query, [
            nombre_apellido,
            correo,
            curso,
            dni,
            celular,
            direccion,
            new Date(),
        ]);
        res.render("inicio", {
            rutaActual: "/",
        });
    }catch(error) {
        console.log("Error al intentar el ingreso a la base de datos ", error);
        console.log(error);
        res.render("Error al procesar el formulario")
    }
});