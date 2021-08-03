import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GLTFService {
  private GLTFs$: Subject<string[]> ;

  constructor() {
    this.GLTFs$ = new BehaviorSubject<string[]>(['warrior', 'armadillo', 'mountain']);
  }

  addGLTF(gltf: string[]): void {
    this.GLTFs$.next(gltf);
  }

  get GLTFs(): Observable<string[]> {
    return this.GLTFs$;
  }
}
