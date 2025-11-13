import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necesario para ngModel

// Importamos los nuevos componentes hijos
import { AgregarPalabraComponent } from './agregar-palabra/agregar-palabra.component';
import { ListaPalabrasComponent } from './lista-palabras/lista-palabras.component';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-main', // Cambiado de 'app-root' a 'app-main'
  standalone: true,
  // Importamos los módulos y componentes necesarios
  imports: [CommonModule, FormsModule, AgregarPalabraComponent, ListaPalabrasComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppMainComponent {
  // --- Estado de la Aplicación (Usando Signals) ---

  // La lista principal de palabras
  palabras = signal<string[]>(['juanito', 'ñaño']);

  // Almacena la palabra que se está editando
  palabraActual = signal('');

  // Almacena el índice del elemento que se está editando.
  // null significa que no hay ninguno en edición.
  indexEditando = signal<number | null>(null);

  // --- Métodos (Manejadores de Eventos) ---

  /**
   * Se dispara cuando el hijo 'agregar-palabra' emite un evento.
   */
  onPalabraAgregada(palabra: string) {
    // Restricción: No agregar palabras vacías o que solo sean espacios
    if (palabra.trim()) {
      this.palabras.update((lista) => [...lista, palabra.trim()]);
    }
  }

  /**
   * Se dispara cuando el hijo 'lista-palabras' emite un evento 'eliminar'.
   */
  onPalabraEliminada(index: number) {
    this.palabras.update((lista) => lista.filter((_, i) => i !== index));
    // Si estábamos editando el ítem que se eliminó, cancelamos la edición
    if (this.indexEditando() === index) {
      this.cancelarEdicion();
    }
  }

  /**
   * Se dispara cuando el hijo 'lista-palabras' emite un evento 'editar'.
   */
  onPalabraEditar(index: number) {
    // Obtenemos la palabra actual de la lista
    const palabra = this.palabras()[index];

    // Activamos el modo edición
    this.indexEditando.set(index);
    this.palabraActual.set(palabra);
  }

  /**
   * Se dispara desde el formulario de edición en este mismo componente.
   */
  onGuardarModificacion() {
    const index = this.indexEditando();
    const palabraModificada = this.palabraActual().trim();

    // Restricción: No guardar una palabra vacía
    if (index === null || !palabraModificada) {
      return;
    }

    // Actualizamos la lista
    this.palabras.update((lista) => {
      const nuevaLista = [...lista];
      nuevaLista[index] = palabraModificada;
      return nuevaLista;
    });

    // Salimos del modo edición
    this.cancelarEdicion();
  }

  /**
   * Limpia el estado de edición.
   */
  cancelarEdicion() {
    this.indexEditando.set(null);
    this.palabraActual.set('');
  }
}
