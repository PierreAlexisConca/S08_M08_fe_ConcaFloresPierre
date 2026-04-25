import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

interface Mascota {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  dueno: {
    nombre: string;
    telefono: string;
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
      dueno: { nombre: 'Juan Pérez', telefono: '999888777' },
      vacunas: [
        { nombre: 'Rabia', fecha: '2024-01-10' },
        { nombre: 'Parvovirus', fecha: '2024-02-15' }
      ]
    }
  ];

  mascotaForm: FormGroup;
  editIndex: number|null = null;

  constructor(private fb: FormBuilder) {
    this.mascotaForm = this.fb.group({
      nombre: ['', Validators.required],
      especie: ['', Validators.required],
      raza: ['', Validators.required],
      duenoNombre: ['', Validators.required],
      duenoTelefono: ['', Validators.required],
      vacunas: this.fb.array([])
    });
  }

  get vacunas() {
    return this.mascotaForm.get('vacunas') as FormArray;
  }

  agregarVacuna() {
    this.vacunas.push(this.fb.group({
      nombre: ['', Validators.required],
      fecha: ['', Validators.required]
    }));
  }

  eliminarVacuna(i: number) {
    this.vacunas.removeAt(i);
  }

  submit() {
    if (this.mascotaForm.invalid) return;
    const form = this.mascotaForm.value;
    const nuevaMascota: Mascota = {
      id: this.editIndex !== null ? this.mascotas[this.editIndex].id : Date.now(),
      nombre: form.nombre,
      especie: form.especie,
      raza: form.raza,
      dueno: {
        nombre: form.duenoNombre,
        telefono: form.duenoTelefono
      },
      vacunas: form.vacunas
    };
    if (this.editIndex !== null) {
      this.mascotas[this.editIndex] = nuevaMascota;
      this.editIndex = null;
    } else {
      this.mascotas.push(nuevaMascota);
    }
    this.mascotaForm.reset();
    this.vacunas.clear();
  }

  editarMascota(i: number) {
    const m = this.mascotas[i];
    this.mascotaForm.patchValue({
      nombre: m.nombre,
      especie: m.especie,
      raza: m.raza,
      duenoNombre: m.dueno.nombre,
      duenoTelefono: m.dueno.telefono
    });
    this.vacunas.clear();
    m.vacunas.forEach(v => {
      this.vacunas.push(this.fb.group({
        nombre: [v.nombre, Validators.required],
        fecha: [v.fecha, Validators.required]
      }));
    });
    this.editIndex = i;
  }

  eliminarMascota(i: number) {
    this.mascotas.splice(i, 1);
    if (this.editIndex === i) {
      this.editIndex = null;
      this.mascotaForm.reset();
      this.vacunas.clear();
    }
  }
}
