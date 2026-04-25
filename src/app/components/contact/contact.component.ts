import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
 nombre: string = '';
 email: string = '';
 mensaje: string = '';

 mascotas = [
    {
      id: 1,
      nombre: 'Firulais',
      especie: 'Perro',
      raza: 'Labrador',
      dueno: { id: 10, nombre: 'Juan Pérez', telefono: '999888777' },
      vacunas: [
        { id: 100, nombre: 'Rabia', fecha: '2024-01-10' },
        { id: 101, nombre: 'Parvovirus', fecha: '2024-02-15' }
      ]
    },
    {
      id: 2,
      nombre: 'Misu',
      especie: 'Gato',
      raza: 'Siames',
      dueno: { id: 11, nombre: 'Ana López', telefono: '988777666' },
      vacunas: [
        { id: 102, nombre: 'Triple Felina', fecha: '2024-03-20' }
      ]
    }
  ];

 enviar() {
  console.log('Nombre:', this.nombre);
  console.log('Email:', this.email);
  console.log('Mensaje:', this.mensaje);

  alert('Mensaje enviado correctamente');

  //Limpiar el formulario
  this.nombre = '';
  this.email = '';
  this.mensaje = '';
 }
}
