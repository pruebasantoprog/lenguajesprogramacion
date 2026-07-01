window.addEventListener("load",empezar(),false);

    function empezar(){
        obtenerPersonajes();
        rellenarSelctEpisodios();
    }

    function obtenerPersonajes(gender,species){
        console.log("entra en obtenerPersonajes en archivo js");
        let direccion="https://rickandmortyapi.com/api/character";
        if(gender!=null){
            
            if(gender!='todos'){
                direccion=direccion+"?gender="+gender;    
            }            
            if(species!=null){
                  if(gender!='todos'){
                    direccion=direccion+"&species="+species;
                  }else{
                    direccion=direccion+"?species="+species;
                  }
            }
        }else{
            if(species!=null){
                direccion=direccion+"?species="+species;
            }else{
                //La primera vez rellenamos la página con los primeros 5 personajes
                direccion="https://rickandmortyapi.com/api/character/1,2,3,4,5";
            }
        }

        console.log("direccion",direccion);
        
        //"https://rickandmortyapi.com/api/character?gender=unknown&status=Alive"
         //fetch("https://rickandmortyapi.com/api/character?species=robot")
         //"https://rickandmortyapi.com/api/character?name=frankenstein"
        //fetch("https://rickandmortyapi.com/api/character?name=frankenstein")
        //fetch("https://rickandmortyapi.com/api/character?gender=unknown&status=Alive")
        //fetch("https://rickandmortyapi.com/api/character")
        //fetch("https://rickandmortyapi.com/api/character?gender=Female")

        if(direccion.includes("1,2,3,4,5")){
             //La primera vez rellenamos la página con los primeros 5 personajes
            fetch(direccion)
            .then(response=>response.json())/*Obtenemos la respuesta en formato json*/
            .then(data=>{
                data.forEach(personaje=>{
                    let especie="";
                    let estado="";  
                    let genero="";
                    especie=retornarEspecie(personaje.species);
                    console.log("Especie",especie);
                    estado=retornarEstado(personaje.status,personaje.gender);
                    genero=retornarGenero(personaje.gender);                    

                    const article=document.createRange().createContextualFragment(/*html*/
                        `<article class="personaje" id="${personaje.id}">
                        <div class="contenedor-imagen">
                            <img src="${personaje.image}" alt="Personaje">
                        </div>
                        <h2>${personaje.name}</h2>
                        <span>Estado: ${estado}</span>
                        <br/>
                        <span>Especie: ${especie}</span>
                        <br/>
                        <span>Localización: ${personaje.location.name}</span>
                        <br/>
                        <span>Genero: ${genero}</span>
                        </article>`
                    );
                    const main=document.querySelector("main");
                    main.append(article);
                }

                );
            })
        }else{

            let arrayPersonajes=document.getElementsByClassName("personaje");
            console.log("arrayPersonajes",arrayPersonajes);

            fetch(direccion)
            .then(response=>response.json())/*Obtenemos la respuesta en formato json*/
            .then(data=>{
                console.log("data",data);
                const personajes=data.results;
                let especie="";
                let estado="";
                let genero="";

                personajes.forEach(personaje => {
                    //Creamos un article por cada personaje
                    especie=retornarEspecie(personaje.species);
                    console.log("Especie",especie);
                    estado=retornarEstado(personaje.status,personaje.gender);
                    genero=retornarGenero(personaje.gender);
                    
                    console.log("Buscando:", "principio"+personaje.id+"fin", personaje.name);

                    Array.from(arrayPersonajes).forEach(e => {
                        console.log("ID DOM:", "principio"+e.id+"fin");
                    });
                    //Comprobamos si ya existe el personaje para no añadirlo otra vez pasamos elemento.id a Number
                    const existe = document.getElementById(String(personaje.id)) !== null;
                    /*const existe = Array.from(arrayPersonajes)
                          .some(elemento => Number(elemento.id) === personaje.id);*/                    

                    if(!existe){
                        const article=document.createRange().createContextualFragment(/*html*/
                            `<article class="personaje" id="${personaje.id}">
                            <div class="contenedor-imagen">
                                <img src="${personaje.image}" alt="Personaje">
                            </div>
                            <h2>${personaje.name}</h2>
                            <span>Estado: ${estado}</span>
                            <br/>
                            <span>Especie: ${especie}</span>
                            <br/>
                            <span>Localización: ${personaje.location.name}</span>
                            <br/>
                            <span>Genero: ${genero}</span>
                            </article>`
                        );
                        const main=document.querySelector("main");
                        main.append(article);
                    }
                    
                });
            });
        }
        
    }

    function rellenarSelctEpisodios(){
      
        const nombresEpisodios=["",
        /*Temporada 1*/"Episodio Piloto","Perro cortacésped","Parque de Anatomía","M. Night Shaym-Aliens!",
        "Meeseeks and Destroy","Rick Potion #9","Raising Gazorpazorp","Rixty Minutes","Something Ricked This Way Comes",
        "lose Rick-counters of the Rick Kind","Ricksy Business",
        /*Temporada 2*/"A Rickle in Time","Mortynight Run","Auto Erotic Assimilation","Total Rickall","Get Schwifty",
        "The Ricks Must Be Crazy","Big Trouble in Little Sanchez","Interdimensional Cable 2: Tempting Fate","Look Who's Purging Now",
        "The Wedding Squanchers",
        /*Temporada 3*/"The Rickshank Rickdemption","Rickmancing the Stone","Pickle Rick","Vindicators 3: The Return of Worldender",
        "The Whirly Dirly Conspiracy","Rest and Ricklaxation","The Ricklantis Mixup","Morty's Mind Blowers","The ABC's of Beth",
        "The Rickchurian Mortydate",
        /*Temporada 4*/"Edge of Tomorty: Rick Die Rickpeat","The Old Man and the Seat","One Crew over the Crewcoo's Morty",
        "Claw and Hoarder: Special Ricktim's Morty","Rattlestar Ricklactica","Never Ricking Morty","Promortyus","The Vat of Acid Episode",
        "Childrick of Mort","Star Mort Rickturn of the Jerri",
        /*Temporada 5*/"Mort Dinner Rick Andre","Mortyplicity","A Rickconvenient Mort","Rickdependence Spray","Amortycan Grickfitti",
        "Rick and Morty’s Thanksploitation Spectacular","Gotron Jerrysis Rickvangelion","Rickternal Friendshine of the Spotless Mort",
        "Forgetting Sarick Mortshall","Rickmurai Jack",
        /*Temporada 6*/"Solaricks","Rick: A Mort Well Lived","Bethic Twinstic","Night Family","Final DeSmithation","Jurisick Mort",
        "Full Meta Jackrick","Analyze Piss","A Rick in King Mortur's Mort","Ricktional Mortpoon's Rickmas Mortcation",
        /*Temporada 7*/"How Poopy Got His Poop Back","The Jerrick Trap","Air Force Wong","That's Amorte","Unmortricken",
        "Rickfending Your Mort","Wet Kuat Amortican Summer","Rise of the Numbericons: The Movie","Mort: Ragnarick","Fear No Mort",
        /*Temporada 8*/"Summer of All Fears","Valkyrick","The Rick, The Mort & The Ugly","The Last Temptation of Jerry",
        "Cryo Mort a Rickver","The Curicksous Case of Bethjamin Button","Ricker than Fiction","Nomortland","Morty Daddy","Hot Rick"];

        const episodio=document.getElementById("episodio");
    
        nombresEpisodios.forEach((nombreEpisodio,indice)=>{
            const optionEpi=document.createElement("option");
            optionEpi.value=indice;
            optionEpi.textContent=nombreEpisodio;
            episodio.appendChild(optionEpi);
        });
    }

    function cargarGenero(){
        let gender=document.querySelector('input[name="genero"]:checked').id;
        console.log("valor genero=",gender);
        obtenerPersonajes(gender,null);
    }

    function retornarEspecie(especie){
        switch(especie){
            case "Human":
                return "Humana";
            case "Humanoid":
                return "Humanoide";
            case "Mythological Creature":
                return "Criatura Mitologica";
            case "unknown":
                return "Desconocido/a";
            default:
                return especie;
        }
    }

    function retornarEstado(estado,genero){
        switch(estado){
            case "Alive":
                switch(genero){
                    case 'Male':
                        return "Vivo";
                    case 'Female':
                        return "Viva";
                    default:
                        return "Vivo";
                };
            case "Dead":
                switch(genero){
                    case 'Male':
                        return "Muerto";
                    case 'Female':
                        return "Muerta";
                    default:
                        return "Muerto";
                };
            case "unknown":
                return "Desconocido";
        }
    }

    function retornarGenero(genero){
        switch(genero){
           case 'Male':
                 return "Masculino";
           case 'Female':
                 return "Femenino";
           case "unknown":
                return "Desconocido";
           default:
                 return genero;
        }
    }