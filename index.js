// Dependencias requeridas para la aplicación
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Renderizar archivos CSS
app.use(express.static("public"));

// Marcadores para las tareas agregadas
var task = ["Tarea prueba", "practica con nodejs"];
// Marcadores para las tareas completadas
var complete = ["Tarea de NodeJs"];

// Ruta post para agregar una nueva tarea
app.post("/addtask", function(req, res) {
    var newTask = req.body.newtask;
    // Agregar la nueva tarea desde la ruta post
    task.push(newTask);
    res.redirect("/");
});

app.post("/removetask", function(req, res) {
    var completeTask = req.body.check;
    // Verificar el "tipo de" tarea completada, luego agregarla a la lista de tareas completadas
    if (typeof completeTask === "string") {
        complete.push(completeTask);
    // Verificar si la tarea completada ya existe en la lista de tareas, si es así, eliminarla   
        task.splice(task.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
        for (var i = 0; i < completeTask.length; i++) {
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }
    res.redirect("/");
});

app.post("/cleartasks", function(req, res) {
    // Limpiar la lista de tareas completadas
    complete = [];

    // Redirigir de nuevo a la pagina principal
    res.redirect('/');
});

// Renderizar el archivo ejs y mostrar las tareas agregadas y completadas
app.get("/", function(req, res) {
    res.render("index", { task: task, complete: complete });
});


app.listen(3000, function() {
    console.log("Servidor ejecutándose en el puerto 3000");
});
