 

( function  (){

  var form = document.getElementById('form-contact') [0],
  elements = form.elements;
  
  var validarName= function(){
      if (form.name.value == 0 ){
  alert ("completar con un nombre valido"); 
    e.preventDefult();
      }
  };
  
  var validar = function(e) {
   validarName(e);  
  };
  form.addEventListener( "submit", validar);
  }() )


