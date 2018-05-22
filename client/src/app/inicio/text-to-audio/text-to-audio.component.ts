import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-to-audio',
  templateUrl: './text-to-audio.component.html',
  styleUrls: ['./text-to-audio.component.scss']
})
export class TextToAudioComponent implements OnInit {
  public texttoau = 
  {
      "text": null,
  
  }
  constructor() { }

  ngOnInit() {
  }

}
