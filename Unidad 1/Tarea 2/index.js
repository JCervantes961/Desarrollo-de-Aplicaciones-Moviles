var firebaseConfig = {
    apiKey: "AIzaSyDStW_cngVn1LhXMX832OMk_l_Vmlw9opM",
    authDomain: "cediswaldos-854ba.firebaseapp.com",
    databaseURL: "https://cediswaldos-854ba-default-rtdb.firebaseio.com",
    projectId: "cediswaldos-854ba",
    storageBucket: "cediswaldos-854ba.appspot.com",
    messagingSenderId: "289719204239",
    appId: "1:289719204239:web:c4b26cbceb19ac8d8db3fa",
    measurementId: "G-6KZSND4263"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var Curp;

function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='';
    document.getElementById("Input5").value='';
    document.getElementById("Input6").value='';
    document.getElementById("Input7").value='';
    document.getElementById("Input8").value='';
}

function createEmpleado() {
    //Guardo los datos capturados usando el id de cada control
    var nombre = document.getElementById("Input1").value;
    var apellido = document.getElementById("Input2").value;
    Curp = document.getElementById("Input3").value;
    var Rfc = document.getElementById("Input4").value;
    var Direccion = document.getElementById("Input5").value;
    var Tipo = document.getElementById("Input6").value;
    var correo = document.getElementById("Input7").value;
    var Telefono = document.getElementById("Input8").value;

    //validaciones
    if (Curp != "") {
        //creo un objeto que guarda los datos
        var Empleado = {
            nombre, 
            apellido,
            Curp,
            Rfc,
            Direccion,
            Tipo,
            correo,
            Telefono
        }

        //console.log(Curp);
        firebase.database().ref('Empleados/' + Curp).update(Empleado).then(() => {
            resetFields();
         }).then(()=>{
            Consulta();
         });
        swal("Listo!", "Agregado correctamente", "success");

    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }



    document.getElementById("Input3").disabled = false;
}

function Consulta(Empleado){
    document.getElementById("Table1").innerHTML='';
    var ref = firebase.database().ref('Empleados');
 /*  
   ref.on('value', function(snapshot) {
        snapshot.forEach(row=>{
            printRow(row.val());
        })
    });
 */
   
    ref.on("child_added", function(snapshot) {
        printRow(snapshot.val());
    });

}


function printRow(Empleado){
    
    if(Empleado!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);
        var cell10 = row.insertCell(9);
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = Empleado.nombre;
        cell2.innerHTML = Empleado.apellido; 
        cell3.innerHTML = Empleado.Curp; 
        cell9.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR('${Empleado.Curp}')">Eliminar</button>`;
        cell10.innerHTML = `<button type="button" class="btn btn-success" onClick="seekR('${Empleado.Curp}')">Modificar</button>`;
    }
}

function deleteR(Curp){

    firebase.database().ref("Empleados/"+Curp).set(null).then(() => {
      Consulta();
    }).then(()=>{
       swal("Listo!", "Eliminado correctamente", "success");
    });
}

function seekR(Curp){
    var ref = firebase.database().ref('Empleados/' + Curp);
    ref.on('value', function(snapshot) {
      updateR(snapshot.val());
    });
}

function updateR(Empleado){
    if(Empleado!=null)
    {
        document.getElementById("Input1").value=Empleado.nombre;
        document.getElementById("Input2").value=Empleado.apellido;
        document.getElementById("Input3").value=Empleado.Curp;
        document.getElementById("Input4").value=Empleado.Rfc;
        document.getElementById("Input5").value=Empleado.Direccion;
        document.getElementById("Input6").value=Empleado.Tipo;
        document.getElementById("Input7").value=Empleado.correo;
        document.getElementById("Input8").value=Empleado.Telefono;
    }
}


//Para consulta de carrera
function ConsultaEMP(){
    document.getElementById("Table1").innerHTML='';
    var c = document.getElementById("Busqueda").value;

    var ref = firebase.database().ref("Empleados");
    ref.orderByChild("Curp").equalTo(c).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}


function printRowQ(Empleado){

    var table = document.getElementById("Table1"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);
    
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = Empleado.nombre;
    cell2.innerHTML = Empleado.apellido; 
    cell3.innerHTML = Empleado.Curp;
    cell4.innerHTML = Empleado.Rfc;
    cell5.innerHTML = Empleado.Direccion;
    cell6.innerHTML = Empleado.Tipo; 
    cell7.innerHTML = Empleado.correo;
    cell8.innerHTML = Empleado.Telefono;  
   
}