window.addEventListener("load",cargarPikachu(),false);

        

        function cargarPikachu(){            
            fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
            .then(response=>{
                if(!response.ok){
                    throw new Error("No se encuentra el recurso pikachu");
                }
                return response.json();
            })
            .then(data=>{
                const nombrePokemon=document.getElementById("pika");
                nombrePokemon.src=data.sprites.other.showdown.front_shiny_female;
                nombrePokemon.style.display="flex";
            });            
        }

        async function fetchData(){
            try{

                const nombrePokemon=document.getElementById("pokemonName").value.toLowerCase();
                console.log("Nombre="+nombrePokemon);

                const response=await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`);
                if(!response.ok){
                    throw new Error("No se encuentra el recurso")
                }

                const data=await response.json();
                const imagenPokemon=data.sprites.front_default;
                //const imgElement=document.getElementById("pokemonSprite");
                console.log("Url imagen="+imagenPokemon);
                //console.log('Contenido de data (formateado):', JSON.stringify(data, null, 2));
                /*console.log("Aqui:",data.sprites.other.dream_world.front_default);               

                imgElement.src=imagenPokemon;
                imgElement.style.display="block";*/

                const caracteristicas=document.getElementById("caracteristicas");
                //Motramos la tarjeta de caracteristicas
                caracteristicas.style="display:flex";

                const imgElement2=document.getElementById("pokemondream_world");
                //imgElement2.src=data.sprites.other.showdown.front_shiny_female;
                console.log("data.sprites.other.dream_world.front_default",data.sprites.other.dream_world.front_default);
                if(data.sprites.other.dream_world.front_default!=null){
                    imgElement2.src=data.sprites.other.dream_world.front_default;                    
                }else{
                    imgElement2.src=data.sprites.front_default;                    
                }
                imgElement2.style.display="block";
                imgElement2.style.maxWidth="50%";
                

                const ataque=document.getElementById("ataque");
                const salud=document.getElementById("salud");
                const defensa=document.getElementById("defensa");
                const velocidad=document.getElementById("velocidad");
                const peso=document.getElementById("peso");

                //Ataque
                let attack=document.getElementById("attack");
                let ataquePokemon=data.stats[1].base_stat;
                console.log("ataque",ataquePokemon);
                crearBarra(ataque,ataquePokemon,'RoyalBlue');
                attack.textContent=`Ataque: ${ataquePokemon}`;

                //salud(healh point)
                let hp=document.getElementById("hp");
                let saludPokemon=data.stats[0].base_stat;
                console.log("salud",saludPokemon);
                crearBarra(salud,saludPokemon,'coral');
                hp.textContent=`Salud: ${saludPokemon}`;

                //Defensa
                let defense=document.getElementById("defense");
                let defensaPokemon=data.stats[2].base_stat;
                console.log("defensa",defensaPokemon);
                crearBarra(defensa,defensaPokemon,'green');
                defense.textContent=`Defensa: ${defensaPokemon}`;

                //Velocidad
                let velocity=document.getElementById("velocity")
                let velocidadPokemon=data.stats[5].base_stat;
                console.log("velocidad",velocidadPokemon);
                crearBarra(velocidad,velocidadPokemon,'RosyBrown')
                velocity.textContent=`Velocidad: ${velocidadPokemon}`;

                //Peso
                let weight=document.getElementById("weight");
                let pesoPokemon=data.weight;
                console.log("peso",pesoPokemon);
                crearBarra(peso,pesoPokemon,'yellow');
                let pesokilos=pesoPokemon/10;
                weight.textContent=`Peso: ${pesokilos} kg`;

                


            }catch(error){
                console.log("se ha producido un error",error);
            }

        }

        
        //Función para crear las barras de progreso
        function crearBarra(input,value,colorvar){

            input.style.background=colorvar;

            let contador=0;

            console.log("value",value);

            let animacion=setInterval(()=>{
                contador++;
                input.style.width=`${contador}px`;
                //console.log('Contador',input.style.width);
                if(contador===value || contador>100){
                    clearInterval(animacion);
                }
                //input.style.display="block";
                input.style.height="10px";
            },30);

        }