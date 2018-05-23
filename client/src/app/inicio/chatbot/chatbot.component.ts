import { Component, OnInit,Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppobservableService } from '../../services/appobservable.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})

export class ChatbotComponent implements OnInit {

  public form_success = false;
  public initialMessage = "";
  public messages = [];
  @Input() chatbot: string;
  public question = 
  {
      "message": null,  
  }
  constructor(private observableService: AppobservableService) { }
  ngOnInit() {
    const url = '/api/chatbot';
    this.observableService.createService(url, {"message": ""})
				.subscribe(result => {
          this.initialMessage = result.response
				},
					error => { }
				);
  }
  submitMessage(form: any) {
		if (form.valid) {
			console.log('valid');
			const url = '/api/chatbot';
			this.observableService.createService(url, this.question)
				.subscribe(result => {
          this.form_success = result;
          this.messages = [...this.messages, result];
          console.log(this.messages);
				},
					error => { }
				);
		} else {
			console.log('invalid');
		}
	}
}
