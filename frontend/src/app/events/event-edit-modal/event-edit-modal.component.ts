import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-edit-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './event-edit-modal.component.html',
  styleUrls: ['./event-edit-modal.component.css']
})
export class EventEditModalComponent {
  @Input() event: any;
  @Output() closeModal = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  saveChanges() {
    this.save.emit(this.event);
  }

  close() {
    this.closeModal.emit();
  }
}
