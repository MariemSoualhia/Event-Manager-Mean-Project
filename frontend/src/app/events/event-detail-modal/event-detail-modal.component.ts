import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';

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

  downloadPDF() {
    const doc = new jsPDF();
  
    doc.setFontSize(18);
    doc.text('Event Details', 20, 20);
  
    doc.setFontSize(12);
    doc.text(`Title: ${this.event.title}`, 20, 40);
    doc.text(`Date: ${new Date(this.event.date).toLocaleString()}`, 20, 50);
    doc.text(`Location: ${this.event.location}`, 20, 60);
    doc.text(`Description: ${this.event.description}`, 20, 70);
    doc.text(`Created By: ${this.event.createdBy?.name}`, 20, 80);
  
    if (this.event.attendees?.length) {
      doc.text('Attendees:', 20, 95);
      this.event.attendees.forEach((a: any, index: number) => {
        doc.text(`- ${a.name}`, 25, 105 + index * 10);
      });
    }
  
    doc.save(`${this.event.title}_details.pdf`);
  }
  
}
