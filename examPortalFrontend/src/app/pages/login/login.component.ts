import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData= {
    userName:'',
    password:'',
  };
  constructor(private snack:MatSnackBar, private login:LoginService, private router:Router){  }
  ngOnInit() : void{

  }
  formSubmit(){
    console.log("Login Form Submitted");

    if(this.loginData.userName.trim()=='' || this.loginData.userName==null)
    {
      this.snack.open('Username is required !! ','',{
        duration: 3000,
      });
      return;
    }

    if(this.loginData.password.trim()=='' || this.loginData.password==null)
    {
      this.snack.open('password is required !! ','',{
        duration: 3000,
      });
      return;
    }

    // request to server to generate the token
    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log("Success");
        console.log(data);
        // login
        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setUser(user);
            console.log(user);
            //redirect...Admin...admin-Dashboard
            //redirect... Normal...normal-Dashboard
            if(this.login.getUserRole() =='ADMIN')
            {
              // admin dashboard
              // window.location.href = '/admin';
              this.router.navigate(['admin']);
              this.login.loginStatusSubject.next(true);
            }else if(this.login.getUserRole() =='NORMAL')
            {
              // normal user dashboard
              // window.location.href = '/user-dashboard';
              this.router.navigate(['user-dashboard']);
              this.login.loginStatusSubject.next(true);
            }else{
              this.login.logout();
            }
          }
        );


      },
      (error)=>{
        console.log('Error !!');
        console.log(error);
        this.snack.open("Invalid Details !! Try Again",'',{
          duration:3000,
        });
      }
      );
  }
}
