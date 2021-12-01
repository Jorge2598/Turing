const br = [ 
  "Máquina de Turing",
  "Este autômato foi projetado para uma linguagem {a, b}. Com o objetivo de mudar as letras de bes para aes.",
  "Digite a string",
  "Carga",
  "Velocidade",
  "Caractere não permitido",
  "O símbolo B é um símbolo reservado",
  "Campo vazio",
  "Por favor, insira uma string",
  "Palavra rejeitada",
  "Palavra aceita"
]

const ing = [ 
  "Turing Machine",
  "This Automata was designed for an {a, b} language. With the purpose of changing the letters bes to aes.",
  "Enter the string",
  "Load",
  "Speed",
  "Character not allowed",
  "Symbol B is a reserved symbol",
  "Empty field",
  "Please enter a string",
  "Word Rejected",
  "Verified Sword"
]

const esp = [ 
  "Maquina De Turing",
  "Este Automata fue diseñado para un lenguaje {a,b}. Con el proposito de cambiar las letras bes por aes.",
  "Ingrese la cadena",
  "Carga",
  "Velocidad",
  "Caracter no permitido",
  "El simbolo B es un simbolo reservado",
  "Campo vacio",
  "Por favor, Ingrese una cadena",
  "Palabra Rechazada",
  "Palabra aceptada"
]
var lenguaje = esp;

 $(".cambiar").on("click", function (event){
  var leng = $(event.target).val();

   console.log(leng)
  switch (leng) {
    case "esp":
       lenguaje = esp;
      break;

    case "ing":
        lenguaje = ing;
      break;

    case "br":
        lenguaje = br;
      break; 
  
    default:
      break;
  }
  cambiarLenguajeHtml();
 }) 
  

function cambiarLenguajeHtml(){
  $("#titulo").text(lenguaje[0]);
  $("#subTitulo").text(lenguaje[1]);
  $("#fcadena").attr("placeholder", lenguaje[2]);
  $("#load").text(lenguaje[3]);
  $("#barra").text(lenguaje[4]);
}

$( "#btnPlay" ).prop( "disabled", true ); 
$( "#btnPause" ).prop( "disabled", true );
$( "#btnStep" ).prop( "disabled", true );
$( "#btnStop" ).prop( "disabled", true );
// variables globales
var stepController = true;
var state= "q1";
var stateprevius="q1";
var cadena = "";

// cambios alf
var slider=document.getElementById("myRange");
var x=parseInt(slider.value);
var velocidad=1000;
var smove =null;
//////////////
var boton1=document.getElementsByClassName("slick-next");
var boton2 = document.getElementsByClassName("slick-prev");
var i=1;

var trans = {
  "q1,a": { NewState: "q1", NewValue: "a",  move: "R" },
  "q1,b": { NewState: "q1", NewValue: "a",move: "R" }, // cambia newvalue por a
  "q1,B": {NewState: "q2",NewValue: "B", move: "L" },
  "q2,a": {NewState: "q2",NewValue: "a",move: "L"},
  "q2,B": {NewState: "q3",NewValue: "B",move: "R"},
};
// ----------------------------------------------------------
function llenarceldas(cadena) {
  for (var i = 1; i < cadena.length - 1; i++) {
    document.getElementById("cinta" + (i + 1)).innerHTML = "<h3 id='letra" + (i + 1) + "'>" + cadena[i] + "</h3>";
  }
}
function limpiarCeldas(){
  for (var i = 0; i < cadena.length ; i++) {
    document.getElementById("cinta"+i).innerHTML = " ";
  }
}
function crearCeldas(size){
  cinta=document.getElementById("slip");
  var k=0,num=-5,adds=0;
  if(size>10){
     adds=(size-10);
   }
  while(k<(15+adds)){
     var elemento= document.createElement("div");
     elemento.className="items";
     elemento.id="cinta"+num;
     document.getElementById("slip").appendChild(elemento);
    k++;num++;
  }
}

function loadcinta(_callback){
     
    $("#slip").removeClass("sliderinicio");
    $("#slip").removeClass("slick-initialized");
    $("#slip").removeClass("slick-slider");
    $("#slip").empty();
    _callback();

}
function newslider(){
  loadcinta(function () {
    crearCeldas(cadena.length);
    $("#slip").addClass("newSlider");
    loadNewSlider();  
  });

 
}

var bandpause=false;
function pause(){
  clearInterval(smove);
  bandpause=true;
  $( "#btnPlay" ).prop( "disabled", false );
  $( "#btnStep" ).prop( "disabled", false );
  $( "#btnPause" ).prop( "disabled", true );
}

var bandStop=false;
function stop(){
  bandStop=true;
  load();
  $( "#btnPlay" ).prop( "disabled", true );     
}

var stepOne=0;
function step(){
    if(stepOne==0 && !bandpause){
       clearInterval(smove);
       $( "#btnPlay" ).prop( "disabled", false );     
       stepOne=1;
    }else if(stepOne==1 || bandpause){
      stepOne=1;
      $( "#btnStep" ).prop( "disabled", true );     
      fchangeSpeed(fsmove);
    }
}

function load() {
  $("#gq3").css({"fill":"white"});
  var buscar_B = document.getElementById("fcadena").value.indexOf('B');
  if(document.getElementById("fcadena").value != "" &&  buscar_B == -1 ){
        $( "#btnPlay" ).prop( "disabled", false );
        $( "#btnPause" ).prop( "disabled", true );
        $( "#btnStep" ).prop( "disabled", true );
        $( "#btnStop" ).prop( "disabled", true );
        
        state = "q1";
        stateprevius = "q1";
        cadena = "";
        i = 1;

        clearInterval(smove);

        cadena = Array.from("B" + document.getElementById("fcadena").value + "B");
        loadcinta(newslider);
        botonNext = boton1[0];
        botonNext.click();
        
        if(!bandStop){
          setTimeout(function () {
            x=parseInt(slider.value);
            $('.newSlider').slick("setOption", "speed",velocidad);
            llenarceldas(cadena);
          },250);
        }else{
          limpiarCeldas();
          bandStop=false;
        }
           
    } else{
      if(buscar_B != -1){
        Swal.fire(
          lenguaje[5],
          lenguaje[6],
          'error'
        )
      }
      else{
        Swal.fire(
          lenguaje[7],
          lenguaje[8],
          'error'
        )
      }
          
        }
  
}

function transition(){
  if(state != "q3")
  {
    if(cadena[i] != 'a' && cadena[i] != 'b' && cadena[i] != "B"){
      Swal.fire(
        lenguaje[9],
        '',
        'error'
      )
      stop();
    }
    else{
      var ttta = cadena.length - 1 ; 
      if(state == "q2"  && ( cadena[i] != cadena[ttta-i]) ){

        Swal.fire(
          lenguaje[9],
          '',
          'error'
        )
        stop();
      
      }
      condicion = state + "," + cadena[i];
      newaccion = trans[condicion];
      state = newaccion.NewState;
      newvalue = newaccion.NewValue;
      dir = newaccion.move;
    }
  }
}

function nuevoEstado()
{
  transition();
  switch (state) {
    case "q1":
      movercinta(accion);
      i++;
      break;
    case "q2":
      movercinta(accion);
      i--;
      break;
    case "q3":
      movercinta(accion);
      $( "#btnStep" ).prop( "disabled", true );
      $( "#btnPause" ).prop( "disabled", true );
      $( "#btnStop" ).prop( "disabled", true);
      clearInterval(smove);
      break;
  }
}

var changeSpeed=false;
function fchangeSpeed(_callback){
     if(changeSpeed==true){
       $('.newSlider').slick("setOption", "speed",velocidad); 
         changeSpeed=false;
         if(stepOne==0){
          clearInterval(smove);
          play();
         }
         
     }
    _callback();
}

function fsmove(){
  fchangeSpeed(function(){
     nuevoEstado();
  });
   
}

function play() {
  $( "#btnPlay" ).prop( "disabled", true );
  $( "#btnStep" ).prop( "disabled", false );
  $( "#btnPause" ).prop( "disabled", false );
  $( "#btnStop" ).prop( "disabled", false);
  botonNext = boton1[0];
  botonPrevius = boton2[0];
  stepOne=0;
  bandpause=false;
  smove = setInterval(function () {
      fchangeSpeed(fsmove);
  }, (velocidad+200));
}


function movercinta(_callback) {
  if(stateprevius != "q3")
  {
    if (dir == "R") {
      botonNext.click();
    } else if (dir == "L") {
      botonPrevius.click();
    }
    _callback();
}
}


//Función del grafo
function efectoGrafo(prevState, oldValue, newState, newValue, dir){
  //console.log("#"+newState + oldValue + newValue);
  $("#q1bb,#q2aa,#q2BB,#q3BB,#q1aa").css({"fill":"none"});
  $(".nodo").css({"fill":"aquamarine","opacity":"0.1"});

  $("#"+newState + oldValue + newValue).css({"fill":"#0062cc","opacity": "1"});
  //$("#g"+prevState).css({"fill":"none"});
  $("#g"+newState).css({"fill":"#0062cc","opacity": "0.5"});
  if(newState == "q3"){
    $("#q1bb,#q2aa,#q2BB,#q3BB,#q1aa").css({"fill":"black"});
    $("#"+newState + oldValue + newValue).css({"fill":"#0062cc"});
  }
}

function accion() {

  movercinta(function () {
    if (newvalue != "B" && state != "q3") {
      document.getElementById("cinta" + (i + 1)).innerHTML = "<h3>" + newvalue + "</h3>";
    }
    if(stepOne==1){
      setTimeout(function(){
       $( "#btnStep" ).prop( "disabled",false);       
      },velocidad);
       
    }
       if(state == "q3"){
        Swal.fire(
          lenguaje[10],
          '',
          'success'
        )
        $( "#btnPlay" ).prop( "disabled", true );
        $( "#btnStep" ).prop( "disabled", true );
        $( "#btnPause" ).prop( "disabled", true );
        $( "#btnStop" ).prop( "disabled", true );

      }
   
     efectoGrafo(stateprevius,cadena[i],state,newvalue,dir);
     stateprevius=state;
    cadena[i] = newvalue;
  });
 
}

//-------- jquery----------------//

 function loadNewSlider(){
  $('.newSlider').slick({

    slidesToShow: 13,
    slidesToScroll: 1,
    speed: 1000,
  
  });
 }

 function loadSliderInicio(){
    $('.sliderinicio').slick({ 
      slidesToShow: 13,
      slidesToScroll: 1,
      speed: 1000, 
    });
 }
 
 window.onload=loadSliderInicio();
// --------------------------------//
var k;
var xpre=x;
function setSpeed(){
  if(x<50){
    k=51-x;
    velocidad=(1000+k*10)+250;
    
  }else{
      k=x-50;
      velocidad=(1000-k*10);
      
  }
}
slider.addEventListener("mousemove",function(){
   x=parseInt(slider.value);
     if((x-xpre)!=0){     
       setSpeed();
        slider.onmouseup = function(){
            changeSpeed=true;             
          } 
        xpre=x; 
    }
    var color='linear-gradient(90deg,rgb(3, 93, 211)'+x+'%,rgb(255, 255, 255)'+x+'%)'
    slider.style.background=color;
 });


