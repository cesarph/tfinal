import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppobservableService } from '../../services/appobservable.service';

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
  public form_success = false;
  public audio=null;
  public values=null;
  public needs=null;
  public consumptions=null;

  constructor(private observableService: AppobservableService) { }

  ngOnInit() {
  }
submitTexttoForm(form: any) {
		if (form.valid) {
			console.log('valid');
			const url = '/api/text-to-speech';
			this.observableService.createService(url, this.texttoau)
				.subscribe(result => {
          this.form_success = result;
				},
					error => { }
				);
		} else {
			console.log('invalid');
		}
	}

}
