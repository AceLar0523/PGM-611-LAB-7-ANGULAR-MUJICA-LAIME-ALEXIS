import { Component, EventEmitter, Input, Output, Signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar para *ngFor y *ngIf

@Component({
  selector: 'app-lista-palabras',
  standalone: true,
  imports: [CommonModule], // Añadir CommonModule
  templateUrl: '../lista-palabras/lista-palabras.component.html',
  styleUrls: ['./lista-palabras.component.css'],
})
export class ListaPalabrasComponent {
  // Input: Recibe la lista de palabras desde el padre
  @Input({ required: true }) palabras!: Signal<string[]>;

  // Output: Emite el índice de la palabra a eliminar
  @Output() eliminar = new EventEmitter<number>();

  // Output: Emite el índice de la palabra a editar
  @Output() editar = new EventEmitter<number>();

  /**
   * Delega la eliminación al padre
   */
  eliminarPalabra(index: number) {
    // Restricción: Confirmación antes de borrar
    if (confirm('¿Estás seguro de que quieres eliminar esta palabra?')) {
      this.eliminar.emit(index);
    }
  }

  /**
   * Delega la edición al padre
   */
  editarPalabra(index: number) {
    this.editar.emit(index);
  }
}
