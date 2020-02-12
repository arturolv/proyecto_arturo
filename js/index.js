
var juego = new Vue({
    //div # juego
    el: "#juego",
    data:{
      saludUsuario: 150,
      manaUsuario: 150,
      saludEnemigo: 150,
      manaEnemigo: 150,
      jugando: true,
      mensaje:  ''
    },
    methods:{
      batalla() {
        if (this.saludUsuario <= 0) {
          this.jugando = false;
          this.mensaje = 'Derrota'
        }
        if (this.saludEnemigo <= 0) {
          this.jugando = false;
          this.mensaje = 'Victoria'
        }
      },
      enemigo() {
        var decision = Math.floor((Math.random() * 5) + 1);
  
        if ((this.manaEnemigo < 10 && decision == 1)||
            (this.manaEnemigo < 15 && decision == 2)||
            (this.saludEnemigo >= 90 && decision == 2)) {
          decision = 0;
        }
  
        switch (decision) {
  
          //Ataque especial enemigo
          case 1:
            this.manaEnemigo = this.manaEnemigo - 10;
            dañoEnemigo = Math.floor((Math.random() * 8) + 1) + 5;
            this.saludUsuario = this.saludUsuario - dañoEnemigo;
  
            var mensaje = $('<span class="blue-text">Ataque especial del enemigo pierdes '+ dañoEnemigo +' de salud</span>');
            break;
  
          //Curación enemigo
          case 2:
            this.manaEnemigo = this.manaEnemigo - 15;
            curacion = Math.floor((Math.random() * 5) + 1) + 5;
  
            if (curacion+this.saludEnemigo > 100) {
              this.saludEnemigo = 100;
            } else {
              this.saludEnemigo = this.saludEnemigo + curacion;
            }
  
            var mensaje = $('<span class="amber-text">El enemigo se cura '+ curacion +' </span>');
            break;
  
          //Ataque normal enemigo
          default:
            dañoEnemigo = Math.floor((Math.random() * 8) + 1);
            this.saludUsuario = this.saludUsuario - dañoEnemigo;
  
            var mensaje = $('<span class="red-text">Pierdes '+ dañoEnemigo +' de salud</span>');
            break;
        }
  
        // Toast
        Materialize.toast(mensaje, 3000);
  
        //Analizar barras de estado
        this.batalla();
      },
      normal: function() {
        daño = Math.floor((Math.random() * 8) + 1);
        this.saludEnemigo = this.saludEnemigo - daño;
  
        //Toast
        Materialize.toast($('<span class="green-text">Causas '+ daño +' de daño</span>'), 2000);
  
        //Acción del enemigo
        this.enemigo();
      },
      especial: function() {
        this.manaUsuario = this.manaUsuario - 10;
        daño = Math.floor((Math.random() * 8) + 1) + 5;
        this.saludEnemigo = this.saludEnemigo - daño;
  
        // Toast
        Materialize.toast($('<span class="cyan-text">Ataque especial causas '+ daño +' de daño</span>'), 2000);
  
        //Acción del enemigo
        this.enemigo();
      },
      curar: function() {
        this.manaUsuario = this.manaUsuario - 15;
        curacion = Math.floor((Math.random() * 5) + 1) + 5;
  
        //Toast      
        Materialize.toast($('<span class="lime-text">Te curas '+ curacion +'</span>'), 2000);
  
        if (curacion+this.saludUsuario > 100) {
          this.saludUsuario = 100;
        } else {
          this.saludUsuario = this.saludUsuario + curacion;
        }
  
        //Acción del enemigo
        this.enemigo();
      },
      rendirse: function() {
        this.jugando = false;
        this.mensaje = 'Retirada'
      },
     
    }
  });