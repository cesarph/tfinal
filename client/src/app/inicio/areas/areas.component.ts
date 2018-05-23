import { Component, OnInit } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { AppobservableService } from '../../services/appobservable.service';
import { ImageUploadModule } from "angular2-image-upload";

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AreasComponent implements OnInit {
    public form_success = false;
    public objects = null;
    public areas = {
        "url": null
    };

  constructor(private observableService: AppobservableService) { }

    ngOnInit() {
    }

    submitImage(form: any) {
        if (form.valid) {
            console.log('valid');
            const url = '/api/visual-recognition/food';

            this.observableService.createService(url, this.areas)
                .subscribe(result => {
                    this.form_success = result;
                    this.objects = result.objects;
                    console.log(result);
                },
                    error => { }
                );
        } else {
            console.log('invalid');
        }

    }
}
