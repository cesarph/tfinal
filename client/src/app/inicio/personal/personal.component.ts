import { Component, OnInit } from '@angular/core';
//import { AppobservableService } from '../../services/appobservable.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {

  public form_success = false;
  public preguntas = 
  {
      "content": null,
      "q1":null,
      "q2":null,
      "q3":null,
  
  }
  // constructor(private observableService: AppobservableService) { }

  ngOnInit() {
  }
  // submitPartnersForm(form: any) {
	// 	if (form.valid) {
	// 		console.log('valid');
	// 		const url = '/api/personality';
	// 		this.observableService.createService(url, this.preguntas)
	// 			.subscribe(result => {
	// 				this.form_success = (result == 'success' ) ? true : false;
	// 			},
	// 				error => { }
	// 			);
	// 	} else {
	// 		console.log('invalid');
	// 	}
	// }

}
