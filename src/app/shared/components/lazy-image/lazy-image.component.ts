import { CommonModule } from '@angular/common';
import {  Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
})
export class LazyImageComponent  implements OnInit{


 @Input()
 public url!: string;

@Input()
 public alt: string = '';

 public hasLoaded:boolean =false;

 onLoad(){
  setTimeout(() => {
  this.hasLoaded = true;
  }, 500);

 }
 ngOnInit(): void {
  if(!this.url)
   throw new Error('URL property es required.');
 }

 }
