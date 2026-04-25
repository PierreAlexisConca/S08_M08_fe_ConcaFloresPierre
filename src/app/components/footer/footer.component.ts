import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
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
}
