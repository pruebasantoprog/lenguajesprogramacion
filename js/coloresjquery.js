let intervalo;
        //Ready se ejecuta cuando se carga el documento
        jQuery(document).ready(function($){

            console.log('Entar en ready');
    
   
            let totalElementosLista=$("#slider ul li").length;
            let widthElementoLista=$("#slider ul li").width();
            let heightElementoLista=$("#slider ul li").height();
            let totalElementosWidth = totalElementosLista * widthElementoLista;

            //Decimos que el tamaño del slider es igual al de un elemento de la lista
            $("#slider").css({width:widthElementoLista, height:heightElementoLista});
            $("#slider ul").css({width:totalElementosWidth, marginLeft: -widthElementoLista});

            //El método prependTo en jQuery es utilizado para insertar contenido al principio de otro elemento en el DOM. Básicamente, 
            //toma el elemento o elementos seleccionados y los añade como los primeros hijos de un elemento destino.
            $("#slider ul ul li:last-child").prependTo("#slider ul");


            function moverIquierda(){
                console.log("Entra en moverIquierda");
                $("#slider ul").animate({
                    left: + widthElementoLista
                }, 200, function(){
                //El método prependTo en jQuery es utilizado para insertar contenido al principio de otro elemento en el DOM. Básicamente, 
                //toma el elemento o elementos seleccionados y los añade como los primeros hijos de un elemento destino.
                $("#slider ul li:last-child").prependTo("#slider ul");
                $('#slider ul').css('left','');
                });
            };

            function moverDerecha(){
                console.log("Entra en moverDerecha");
                $("#slider ul").animate({
                    left: - widthElementoLista
                }, 200, function(){
                    console.log("Entra en funcion");
                    //El método prependTo en jQuery es utilizado para insertar contenido al principio de otro elemento en el DOM. Básicamente, 
                    //toma el elemento o elementos seleccionados y los añade como los primeros hijos de un elemento destino.
                    $("#slider ul li:first-child").appendTo("#slider ul");
                    $('#slider ul').css('left','');
                });
            };

            $('a.anterior').on('click',function(){
                console.log("Pulsa anterior");
                moverIquierda();
            });

            $('a.siguiente').on('click',function(){
                console.log("Pulsa siguiente");
                moverDerecha();
            });

            $('#checkbox').on('change',function(){
                console.log("Pulsa check");
                if ($(this).is(':checked')) {
                    console.log("Entra en id checked");
                    intervalo=setInterval(function(){
                    moverDerecha();
                }, 3000);
                }else {
                    console.log("Checkbox deshabilitado");
                    // Detener el intervalo
                    clearInterval(intervalo);
                }    
            });

            //Mostramos uocultamos la descripción de la página
            $("#controlarDesc").click(function(){
                $("#descPagina").slideToggle(3000);
                let textoBoton=$("#controlarDesc").text();
                if(textoBoton=="Ocultar Descripción"){
                    $("#controlarDesc").text("Mostrar Descripción");
                }else{
                    $("#controlarDesc").text("Ocultar Descripción");
                }
            });

        });//Fin jQuery(document).ready(function($){
        
        $("#cargarDatos").on("click", cargarDatos);

        //Al principio ocultamos la tabla para que no se vea una línea en donde está la tabla
        $("#datos").hide();

        function cargarDatos() {

            console.log("Entra en cargarDatos");

            //let docXML;

            const listarColores=()=>{
            $.ajax({

                type:'GET',
                url:'xml/Colores.xml',
                contentType:'application/xml',
                dataType: 'xml',
                async:true,
               
            }).done((data)=>{
                
                let fila=$("<tr><th>Color</th><th>Nombre</th><th>Hexadecimal</th><th>RGB</th><th>Muestra</th></tr>");

                let valorHexadecimal="";
                let color="";
                let claseIcono="";

                //Obtenemos el color seleccionado
                let valorSeleccionado = $('input[name="colores"]:checked').val();

                console.log('valorseleccionado',valorSeleccionado);

                //Vaciamos el contenido de la tabla para que se pinte cada vez que pulsan el botón
                $('#datos').empty();

                $('#datos').append(fila);

                $(data).find('COLORES').each(function(){
                       
                        fila=$("<tr>");
                        switch($(this).find('COLOR').text().trim()){
                            case 'Rojo':
                                color='red';
                                claseIcono="bxs-ambulance"
                                break;
                            case 'Rosa':
                                color='HotPink';
                                claseIcono="bxs-popsicle";
                                break;
                            case 'Blanco':
                                color="White";
                                claseIcono="bxs-paint";
                                break;
                            case 'Naranja':
                                color='DarkOrange';
                                claseIcono="bx-basketball"
                                break;
                            case 'Gris':
                                color="Gray";
                                claseIcono="bxs-bookmark-alt";
                                break;
                            case 'Amarillo':
                                color='yellow';
                                claseIcono="bxs-lemon";
                                break;
                            case 'Marrón':
                                color="SaddleBrown";
                                claseIcono="bxs-coffee-bean";
                                break;
                            case 'Verde':
                                color="DarkGreen";
                                claseIcono="bxl-spring-boot";
                                break;
                            case 'Púrpura':
                                color="BlueViolet";
                                break;
                            case 'Azul':
                                color="blue";
                                claseIcono="bx-cloud-drizzle";
                                break;
                            default:
                                color="black";
                                claseIcono="bx bx-book";
                        }

                        if(valorSeleccionado=='todos' || valorSeleccionado==$(this).find('COLOR').text()){
                            fila.append($(`<td style='color:${color}; text-shadow:1px 1px Black;'>${$(this).find('COLOR').text().trim()}</td>`));
                            fila.append($(`<td>${$(this).find('NOMBRE').text()}</td>`));
                            valorHexadecimal=$(this).find('HEXADECIMAL').text();
                            fila.append($(`<td>${valorHexadecimal};</td>`));
                            fila.append($(`<td>${$(this).find('RGB').text()}</td>`));
                            fila.append($(`<td style='color: ${valorHexadecimal}; text-shadow:1px 1px Black;'><i class='bx ${claseIcono} bx-lg'></i></td>`));  
                            //fila.append($(`<td><i class='bx bx-hot' style='color: ${valorHexadecimal};'></i></td>`)); 
                            //fila.append($('<td><i class="bx bx-hot"></i></td>').find('i').css('color', valorHexadecimal).end());                                                                    
                            fila.append($("</tr>"));
                            $('#datos').append(fila);
                        }
                        
                        //Mostramos la tabla una vez rellenada
                        $("#datos").show();
                    });
            });
          
            
        };

        listarColores();

        }