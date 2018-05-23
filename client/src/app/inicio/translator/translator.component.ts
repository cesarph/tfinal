import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppobservableService } from '../../services/appobservable.service';

@Component({
  selector: 'app-translator',
  templateUrl: './translator.component.html',
  styleUrls: ['./translator.component.scss']
})
export class TranslatorComponent implements OnInit {

  public translate = {
      "text": null,
      "language": null
  };
  public form_success = false;
  public translation=null;
  public ok=null;


  constructor(private observableService: AppobservableService) { }

  ngOnInit() {
  }
  refresh(): void {
    window.location.reload();
}
  submitTexttoForm(form: any) {
    if (form.valid) {
      console.log('valid');
      const url = '/api/translator';
      this.observableService.createService(url, this.translate)
        .subscribe(result => {
  
          this.form_success = result;
          this.translation = result.translation;
       
          
        },
          error => { }
        );
    } else {
      console.log('invalid');
    }
  }
}
