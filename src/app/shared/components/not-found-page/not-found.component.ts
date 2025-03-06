import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { Router } from '@angular/router';

@Component({
    selector: 'app-not-found',
    templateUrl: 'not-found.component.html',
    standalone: true,
    imports: [CommonModule, MaterialModule],
    styleUrls: ['not-found.component.scss']
})
export class NotFoundComponent {

    constructor(private readonly router:Router) {}

    onClickToGoBack() {
        this.router.navigate(['/']);
    }
}
