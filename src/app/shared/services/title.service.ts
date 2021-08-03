import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor(private titleService: TitleService) { }

  setTitle(title: string) {
    this.titleService.setTitle(title);
  }
}
