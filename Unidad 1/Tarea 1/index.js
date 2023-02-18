
function Busqueda() {
    const search = document.getElementById("search").value;
    const api_url=`https://swapi.dev/api/people/?search=${search}`
    Buscar(api_url);
}

function Buscar(api_url){

    fetch(api_url)
      .then(data => {
        return data.json()
      }).then(resultado=>{
            console.log(resultado);



            console.log(resultado.results[0].name)
            
                document.getElementById("data").innerHTML = "";
                var text = "";
                var Nombre = "";

                //Nombre = '<p>Nombre: ' + resultado.results[i].name + '</p>'

                for(let i = 0; i < resultado.results.length; i++){

                text = '<div class="Personaje"><div class="Nombre"><p>Nombre: ' + resultado.results[i].name + '</p></div>' 
                + '<div class="Altura"><p>Altura: ' + resultado.results[i].height + '</p></div>'
                + '<div class="Peso"><p>Peso: ' + resultado.results[i].mass + '</p></div>'
                + '<div class="Cabello"><p>Color de Cabello: ' + resultado.results[i].hair_color + '</p></div>'
                + '<div class="Piel"><p>Color de piel: ' + resultado.results[i].skin_color + '</p></div>'
                + '<div class="Ojos"><p>Color de ojos: ' + resultado.results[i].eye_color + '</p></div>'
                + '<div class="Genero"><p>Genero: ' + resultado.results[i].gender + '</p></div>'
                + '<div class="Año"><p>Año de Nacimiento: ' + resultado.results[i].birth_year + '</p></div>'
                + '<div class="hover"></div></div>'
                
                //const lista = document.getElementById("hover");
                const lista2 = document.getElementById("data");
                //const Nombre = document.getElementById("Nombre");

                //lista.innerHTML += text;
                lista2.innerHTML += text;

            }
      });


}

const buscar2=async(api_url)=>{

    const data= await fetch(api_url);
    const respuesta= await data.json();
    const Search = await respuesta.Search;

    console.log(Search);

    if(Search!=null)
    {   
        document.getElementById("lista").innerHTML='';
        Search.map((p)=>{
                document.getElementById("lista").innerHTML+=`<div style="margin-top:10px;">
                    <img width='100%' src=${p.Poster} alt="No hay poster"></img></div>`;
        })

    }

}    

     
const buscar3=async(api_url)=>{

    const respuesta= await axios(api_url);
    const Search = await respuesta.data.Search;
    console.log(respuesta.data);
    
    console.log(Search);

    
    if(Search!=null)
    {
        document.getElementById("lista").innerHTML='';
        
        Search.map((p)=>{
                document.getElementById("lista").innerHTML+=`<div style="margin-top:10px;">
                    <img width='100%' src=${p.Poster} alt="No hay poster"></img></div>`;
        })

    }

}    
