import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppobservableService } from '../../services/appobservable.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {

  public form_success = false;
  public personality=null;
  public values=null;
  public needs=null;
  public consumptions=null;
  public preguntass = 
  {
      "content": null,
      "q1":null,
      "q2":null,
      "q3":null,
  
  }
   constructor(private observableService: AppobservableService) { }

  ngOnInit() {
  }
  submitTestForm(form: any) {
		if (form.valid) {
			console.log('valid');
			const url = '/api/personality';
			this.observableService.createService(url, this.preguntass)
				.subscribe(result => {
          this.form_success = result;
          this.personality = result.personality;
          this.needs = result.needs;
          this.values = result.values;
          this.consumptions = result.consumption_preferences;
				},
					error => { }
				);
		} else {
			console.log('invalid');
		}
	}

}
