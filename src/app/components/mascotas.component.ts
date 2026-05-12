import { Component } from '@angular/core';

interface Mascota {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  dueno: {
    nombre: string;
    telefono: string;
    email: string;
  };
  vacunas: { nombre: string; fecha: string }[];
}

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.css'],
  standalone: false
})
export class MascotasComponent {
  mascotas: Mascota[] = [
    {
      id: 1,
      nombre: 'Firulais',
      especie: 'Perro',
      raza: 'Labrador',
      dueno: {
        nombre: 'Juan Pérez',
        telefono: '999888777',
        email: 'juan.perez@email.com'
      },
      vacunas: [
        { nombre: 'Rabia', fecha: '2024-01-10' },
        { nombre: 'Parvovirus', fecha: '2024-02-15' }
      ]
    }
  ];

  editIndex: number | null = null;
  submitted = false;

  formModel: Omit<Mascota, 'id'> = this.createEmptyForm();

  private createEmptyForm(): Omit<Mascota, 'id'> {
    return {
      nombre: '',
      especie: '',
      raza: '',
      dueno: {
        nombre: '',
        telefono: '',
        email: ''
      },
      vacunas: []
    };
  }

  agregarVacuna() {
    this.formModel.vacunas.push({ nombre: '', fecha: '' });
  }

  eliminarVacuna(i: number) {
    this.formModel.vacunas.splice(i, 1);
  }

  submit() {
    this.submitted = true;

    const hasRequiredVacunaData = this.formModel.vacunas.every(v => v.nombre.trim() && v.fecha);
    if (!hasRequiredVacunaData) {
      return;
    }

    const nuevaMascota: Mascota = {
      id: this.editIndex !== null ? this.mascotas[this.editIndex].id : Date.now(),
      nombre: this.formModel.nombre.trim(),
      especie: this.formModel.especie.trim(),
      raza: this.formModel.raza.trim(),
      dueno: { ...this.formModel.dueno },
      vacunas: this.formModel.vacunas.map(v => ({
        nombre: v.nombre.trim(),
        fecha: v.fecha
      }))
    };

    if (this.editIndex !== null) {
      this.mascotas[this.editIndex] = nuevaMascota;
      this.editIndex = null;
    } else {
      this.mascotas.push(nuevaMascota);
    }

    this.resetFormState();
  }

  editarMascota(i: number) {
    const m = this.mascotas[i];
    this.formModel = {
      nombre: m.nombre,
      especie: m.especie,
      raza: m.raza,
      dueno: {
        nombre: m.dueno.nombre,
        telefono: m.dueno.telefono,
        email: m.dueno.email
      },
      vacunas: m.vacunas.map(v => ({ ...v }))
    };

    this.submitted = false;
    this.editIndex = i;
  }

  eliminarMascota(i: number) {
    this.mascotas.splice(i, 1);
    if (this.editIndex === i) {
      this.resetFormState();
    }
  }

  cancelarEdicion() {
    this.resetFormState();
  }

  private resetFormState() {
    this.editIndex = null;
    this.submitted = false;
    this.formModel = this.createEmptyForm();
  }
}
