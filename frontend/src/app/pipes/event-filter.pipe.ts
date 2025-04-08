import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eventFilter',
  standalone: true
})
export class EventFilterPipe implements PipeTransform {
  transform(events: any[], searchText: string): any[] {
    if (!events || !searchText) return events;

    searchText = searchText.toLowerCase();

    return events.filter(event =>
      event.title?.toLowerCase().includes(searchText) ||
      event.description?.toLowerCase().includes(searchText) ||
      event.location?.toLowerCase().includes(searchText) ||
      event.createdBy?.name?.toLowerCase().includes(searchText)
    );
  }
}
