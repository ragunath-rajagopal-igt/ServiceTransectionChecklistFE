import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-textarea',
    templateUrl: 'textarea.component.html',
    styleUrls: ['textarea.component.scss']
})
export class TextareaComponent {
    @Input() formVal:FormGroup;
    @Input() field:any;
}
