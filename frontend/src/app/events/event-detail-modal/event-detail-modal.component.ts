import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-detail-modal',
  standalone: true,
  templateUrl: './event-detail-modal.component.html',
  styleUrls: ['./event-detail-modal.component.css'],
  imports: [CommonModule]
})
export class EventDetailModalComponent {
  @Input() event: any;
  @Input() currentUserId: string = '';
  @Output() closeModal = new EventEmitter<void>();
  @Output() edit = new EventEmitter<any>();

  get canEdit(): boolean {
    return this.event?.createdBy?._id === this.currentUserId;
  }

  close() {
    this.closeModal.emit();
  }

  editEvent() {
    this.edit.emit(this.event);
  }
}
