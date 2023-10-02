import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatFormFieldControl } from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {

    private fb          = inject( FormBuilder );
    private authService = inject( AuthService );
    private router      = inject( Router )

    public myForm: FormGroup = this.fb.group({
      username:    [ '',[ Validators.required, Validators.email ]],
      password: ['', [ Validators.required, Validators.minLength(6) ]],
    });



    login() {
      const { username, password } = this.myForm.value;

      this.authService.login(username, password)
        .subscribe({
          next: () => this.router.navigateByUrl('/'),
          error: (message) => {
            // Swal.fire('Error', message, 'error' )
          }
        })

    }
}
