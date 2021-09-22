import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from "rxjs/operators";

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {

  formulario: FormGroup;

  constructor() { 
    this.formulario = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      apellidos: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8)
      ]),
      edad: new FormControl('', [
        Validators.required,
        this.edadValidator
      ]),
      dni: new FormControl('', [
        this.dniValidator
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9a-zA-Z]+([0-9a-zA-Z]*[-._+])*[0-9a-zA-Z]+@[0-9a-zA-Z]+([-.][0-9a-zA-Z]+)*([0-9a-zA-Z]*[.])[a-zA-Z]{2,6}$/)
      ]),
      password: new FormControl(''),
      repitePassword: new FormControl('')
    })
  }

  ngOnInit(): void {

    const emailControl = this.formulario.controls.email;
    emailControl.valueChanges
      .pipe(
        debounceTime( 500 )
      ).subscribe( value => console.log( value ));


  }

  dniValidator( formControl: any ){

    if( formControl.value === '' ){
      return null;
    }

    const value = formControl.value;
    const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';

    if(/^\d{8}[a-zA-Z]$/.test( value )){
      const numeros = value.substr( 0, value.length - 1 );
      const letra = value.charAt( value.length - 1 );
      
      const calculo = numeros % 23;
      const letraSeleccionada = letras.charAt(calculo);
      console.log(letraSeleccionada);
      
      if( letra.toUpperCase() === letraSeleccionada ){
        return null;
      }else{
        return { dnivalidator: 'La letra no coinside con el numero' }
      }

    }else{
      return { dnivalidator: 'DNI no cumple con las especidicaciones' }
    }

  }

  edadValidator( formControl: any ){
    const value = formControl.value;
    const min:number = 18;
    const max:number = 40;

    if( value >= min && value <= max ){
      return null;
    }else{
      return { edadvalidator:{ max, min } }
    }

  }

  enviar(){
    console.log( this.formulario.value )
  }
}
