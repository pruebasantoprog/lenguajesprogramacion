window.addEventListener("load",empezar(),false);

    function empezar(){
        let pedirDatos=document.getElementById("pruLambda");        

        //Variables necesarias para leer el contenido del XML
        let datosxml;
        //Mapa que tendra cada nombre y código
        let mapa=new Map();
       

        //Accedemos por ejemplo con fetch
        fetch("xml/codigo.xml")
        .then(response=>{
            if(!response.ok){
                throw new Error("Error al recuperar codigo.xml")
            }
            //Si no hay error convertimos la respuesta a xml con text()
            return response.text();
        })
        .then(docText=>{
            console.log("Entra en .then(docText=>{");
            //Creamos un objeto DOMParser para analizar el texto xml
            const parser=new DOMParser();
            //Convertimos la respuesta xml a string con el objeto parser
            const xmlDoc=parser.parseFromString(docText,'text/xml');
            //Tenmemos cada nombre y código dentro de la etiqueta <codigos> 
            const elementos=xmlDoc.getElementsByTagName('codigos');


            Array.from(elementos).forEach(element => {
                const nombre=element.getElementsByTagName('nombre')[0].textContent;
                const codigo=element.getElementsByTagName('codigo')[0].textContent.trimStart();
                /*console.log("nombre",nombre);
                console.log("codigo",codigo);*/
                //Añadimos nombre(clave) y código (valor) al mapa
                mapa.set(nombre,codigo);
                console.log("Tamaño mapa ",mapa.size);
            });

        //Rellenamos los elementos code con sus respectivos códigos 
        document.getElementById('codlambda').innerHTML=mapa.get('Lambda').trim();
        document.getElementById('defaultFuncional').innerHTML=mapa.get('defaultFuncional').trim();
        document.getElementById('MethodReference').innerHTML=mapa.get('MethodReference').trim();
        document.getElementById('EachRemoveSort').innerHTML=mapa.get('EachRemoveSort').trim();
        console.log("Valor de get ",mapa.size);
        console.log("Valor="+mapa.get('defaultFuncional'));

        //LLamada a Prism para que vuelva a ejecutarse etiquetas de <code>
        Prism.highlightAll();

        let version=0;

        //Ejecición de lambda
        document.getElementById("lambda").addEventListener("keydown", function(e) {
            //alert('Entra en keydown');
             if(e.key==="7"){
                version=7;
             }
             if(e.key==="8"){
                version=8;
             }
             if (e.key === "Enter") { 
                //alert('Ha pulsado enter');
                if(version==0){
                    document.getElementById("lambda").textContent="Teclee 7 u 8 para versión de Java: ";
                }else{
                    let resultadoEjec="";
                    if(version==7){
                        resultadoEjec="Java 7 usando Collections.sort con una clase anonima con Comparator que implementa el método compare el cual llamará a compareTo\n"+
                                      "Lista estados ordenada con Java 7\nAplazada\nEn Contencioso\nEn gestión de cobro\nIncobrable\n"+
                                      "Pagada\nVencida\n";
                    }else{
                        resultadoEjec="Java 8 usando Collections.sort pasamos directamante los estados y con operador -> y llamamos directamante a compareTo entre los estados\n"+
                                      "Lista estados ordenada con Java 8\nAplazada\nEn Contencioso\nEn gestión de cobro\nIncobrable\n"+
                                      "Pagada\nVencida\n";
                    }
                    document.getElementById("preLambda").textContent=resultadoEjec;
                }
                e.preventDefault();
                console.log("Se pulsó Enter dentro del div");                                
             }
             
        });
        });

        //Ejecución de interfaz funcional y default
        document.getElementById("runFuncionalDefault").addEventListener("click",function(e){
            document.getElementById("preFuncionalDefault").textContent=
            "Ejemplo clase que implementa interfaz funcional, llamada a interfaz funcional con lambda y llamada con interfaz con clase interna\n"+
            "=================================================================================================================================\n"+
            "Clase UsoRecargo metodo sobrescrito aplicaImporteInicial: Queremos por ejemplo que se sumen los 2 importes y se dividan entre el importe inicial\n"+
            "Metodo default calcularRecargo perteneciente a la interfaz funcional Recargo se le pasa tipo de recargo Ordinario\n"+
            "Tipo de recargo Ordinario=20\nRecargo calculado cantidad*(tipoRecargo/100)=6291.58\n"+
            "Importe total con clase que usa interfaz importe(35.8)+recargo(6291.58)=6327.38\n"+
            "===============================================================================\n"+
            "Con lambda hemos indicado que para obtener el importe inicial solamente se sumen los 2 importes (a,b)->a+b\n"+
            "Metodo default calcularRecargo perteneciente a la interfaz funcional Recargo se le pasa tipo de recargo Reducido\n"+
            "Tipo de recargo Reducido=10\nRecargo calculado cantidad*(tipoRecargo/100)=3145.79\n"+
            "Importe total usando lambda importe(83.78)+recargo(3145.79)=3229.57\n"+
            "===============================================================================\n"+
            "Importe Inicial usando interfaz con clase interna para que por ejemplo sume ambos valores y los divida entre 2 (importe1(35.8)+importe2(47.98))/2=41.89\n"+
            "Metodo default calcularRecargo perteneciente a la interfaz funcional Recargo se le pasa tipo de recargo Ejecutivo\n"+
            "Tipo de recargo Ejecutivo=5\nRecargo calculado cantidad*(tipoRecargo/100)=157.29\n"+
            "Importe total usando clase interna importe(41.89)+recargo(157.29)=199.18"
        });

        document.getElementById("runMethodReference").addEventListener("click",function(e){
            document.getElementById("preMethodReference").textContent=
            "Tenemos lista 'Ana', 'Juan', 'Pedro' la convertimios a mayusculas con lambda y a minusculas con ::\nConversión a mayúsculas con lambda\n"+
            "=======================================\nANA\nJUAN\nPEDRO\nConversión a minúsculas con operador ::\n=======================================\n"+
            "ana\njuan\npedro";
        });

        document.getElementById("runEachRemoveSort").addEventListener("click",function(e){
            document.getElementById("preEachRemoveSort").textContent=
            "Socios del Gimnasio\nDatos socio: [nombre=Marcos, activo=true, edad=20]\nDatos socio: [nombre=Ana, activo=false, edad=31]\n"+
            "Datos socio: [nombre=Lucia, activo=true, edad=23\nDatos socio: [nombre=Sergio, activo=true, edad=71]\n"+
            "Datos socio: [nombre=Laura, activo=false, edad=57]\nDatos socio: [nombre=David, activo=true, edad=37]\n"+
            "Datos socio: [nombre=Felipe, activo=true, edad=68]\nDatos socio: [nombre=Diana, activo=false, edad=39]\n"+
            "======================================================================================================\n"+
            "Ordenar socios por edad\nNombre:Marcos Edad:20\nNombre:Lucia Edad:23\nNombre:Ana Edad:31\nNombre:David Edad:37\n"+
            "Nombre:Diana Edad:39\nNombre:Laura Edad:57\nombre:Felipe Edad:68\nNombre:Sergio Edad:71\n"+
            "======================================================================================================\n"+
            "Socios activos\nMarcos\nLucia\nDavid\nFelipe\nSergio";
        });    
                                 
        
    }