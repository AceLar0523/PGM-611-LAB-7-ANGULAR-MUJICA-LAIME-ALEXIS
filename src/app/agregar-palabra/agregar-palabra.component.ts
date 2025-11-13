import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importar para [(ngModel)]

@Component({
  selector: 'app-agregar-palabra',
  standalone: true,
  imports: [CommonModule, FormsModule], // Añadir FormsModule
  templateUrl: './agregar-palabra.component.html',
  styleUrl: './agregar-palabra.component.css',
})
export class AgregarPalabraComponent {
  // Signal para manejar el estado del input
  nuevaPalabra = signal('');

  // Evento que se emite hacia el padre
  @Output() palabraAgregada = new EventEmitter<string>();

  /**
   * Método para agregar la palabra
   */
  agregarPalabra() {
    const palabra = this.nuevaPalabra().trim();

    // Restricción: solo emitir si la palabra no está vacía
    if (palabra) {
      this.palabraAgregada.emit(palabra);
      this.nuevaPalabra.set(''); // Limpiar el input
    }
  }
}
