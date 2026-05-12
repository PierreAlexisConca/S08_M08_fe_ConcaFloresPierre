import { Component } from '@angular/core';

export interface Dueno {
  id: number;
  nombre: string;
  email: string;
  mensaje: string;
}

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  nombre = '';
  email = '';
  mensaje = '';
  submitted = false;
  exito = false;
  private nextId = 1;

  duenos: Dueno[] = [
    { id: 1, nombre: 'Juan Pérez', email: 'juan@email.com', mensaje: 'Tengo un Labrador llamado Firulais.' },
    { id: 2, nombre: 'Ana López', email: 'ana@email.com', mensaje: 'Mi gato Misu está en adopción.' }
  ];

  enviar() {
    this.submitted = true;
    if (!this.nombre || !this.email || !this.mensaje) return;

    this.duenos.push({
      id: this.nextId++,
      nombre: this.nombre,
      email: this.email,
      mensaje: this.mensaje
    });

    this.exito = true;
    this.nombre = '';
    this.email = '';
    this.mensaje = '';
    this.submitted = false;

    setTimeout(() => this.exito = false, 3000);
  }

  eliminarDueno(id: number) {
    this.duenos = this.duenos.filter(d => d.id !== id);
  }
}
