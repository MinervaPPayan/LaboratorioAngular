import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Persona } from 'src/app/classes/persona';
import { MatTable } from '@angular/material/table';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  // Variable del objeto del formulario
  persona: FormGroup;

  // Array que contendrá a los objetos de la clase Persona
  arrayPersonas: Persona[]= [];

  // Array para el manejo de mat-table
  displayedColumns: string[] = ['posicion' ,'nombre', 'apellidos', 'edad', 'dni', 'fechaN', 'colorF', 'sexo', 'borrar', 'modificar'];

  // Variable que identifica la tabla
  @ViewChild(MatTable) tabla!: MatTable<any>;

  // Variable booleana que activas cuando se está modificando un registro
  modificar:boolean= false;

  // variable que almacena el indice del registro que se está modificando
  indiceModificar :number= 0;

  constructor() {

    // Creación del objeto del formulario y validadores de los campos
    this.persona = new FormGroup({
      nombre: new FormControl('',[Validators.required,Validators.minLength(3)]),
      apellidos: new FormControl('',[Validators.required,Validators.minLength(3)]),
      edad: new FormControl('',[Validators.required,Validators.min(0),Validators.max(125)]),
      dni: new FormControl('',[Validators.required,Validators.maxLength(9),Validators.minLength(9)]),
      fechaN: new FormControl('',Validators.required),
      colorF: new FormControl('',[Validators.required,Validators.minLength(3)]),
      sexo: new FormControl('',Validators.required)
    });
   }

  ngOnInit(): void {
  }

  // Función que se ejecuta al enviar el formulario 
  // Recibe como parámetro formDirective que se usa para que al hacer reset el formulario
  // se resetee tambien el control de errores, con la función resetForm()

  onSubmit(formDirective: FormGroupDirective){

    // Se crea un nuevo objeto Persona a partir delos datos del formulario
    let nuevaPersona= new Persona(
      this.persona.controls["nombre"].value,
      this.persona.controls["apellidos"].value,
      this.persona.controls["edad"].value,
      this.persona.controls["dni"].value,
      this.persona.controls["fechaN"].value,
      this.persona.controls["colorF"].value,
      this.persona.controls["sexo"].value
    );

   // Añadimos el objeto al arrayPersonas
    this.arrayPersonas.push(nuevaPersona);

    // Al actualizar el array que usa la tabla mat-table es necesario llamar al metodo renderRows()
    // para que se pinte de nuevo la tabla con los valores actualizados
    this.tabla.renderRows();

    formDirective.resetForm();
    this.persona.reset();
  }

  // Función para borrar personas del array
  public funcionBorrar(indice: number): void{
    this.arrayPersonas.splice(indice,1);
    this.tabla.renderRows();
  }

  // Función para modificar personas
  public funcionModificar(indice: number): void{
    this.modificar= true;
    this.indiceModificar= indice;
    this.persona.controls["nombre"].setValue(this.arrayPersonas[indice]._nombre);
    this.persona.controls["apellidos"].setValue(this.arrayPersonas[indice]._apellidos);
    this.persona.controls["edad"].setValue(this.arrayPersonas[indice]._edad);
    this.persona.controls["dni"].setValue(this.arrayPersonas[indice]._dni);
    this.persona.controls["fechaN"].setValue(this.arrayPersonas[indice]._fechaN);
    this.persona.controls["colorF"].setValue(this.arrayPersonas[indice]._colorF);
    this.persona.controls["sexo"].setValue(this.arrayPersonas[indice]._sexo);

  }
  
  // Función para cancelar la edición
  public funcionCancelar(formDirective: FormGroupDirective): void{
    this.modificar= false;
    formDirective.resetForm();
    this.persona.reset();
  }

  // Función para guardar los cambios de la edición
  public funcionGuardar(formDirective: FormGroupDirective):void{
    this.arrayPersonas[this.indiceModificar]._nombre= (this.persona.controls["nombre"].value);
    this.arrayPersonas[this.indiceModificar]._apellidos= (this.persona.controls["apellidos"].value);
    this.arrayPersonas[this.indiceModificar]._edad= (this.persona.controls["edad"].value);
    this.arrayPersonas[this.indiceModificar]._dni= (this.persona.controls["dni"].value);
    this.arrayPersonas[this.indiceModificar]._fechaN= (this.persona.controls["fechaN"].value);
    this.arrayPersonas[this.indiceModificar]._colorF= (this.persona.controls["colorF"].value);
    this.arrayPersonas[this.indiceModificar]._sexo= (this.persona.controls["sexo"].value);
    this.tabla.renderRows();
    formDirective.resetForm();
    this.persona.reset();
    this.modificar= false;
  }
}
