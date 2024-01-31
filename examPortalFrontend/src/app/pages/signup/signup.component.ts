import { Component, OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  constructor(private userService:UserService, private snak:MatSnackBar){}
ngOnInit(): void {
}
public user={
  userName:'',
  password:'',
  firstName:'',
  lastName:'',
  email:'',
  phone:''
}
formSubmit(){
  console.log(this.user);
  if(this.user.userName == '' || this.user.userName == null){
    // alert("User Name is required...");
    this.snak.open('User name is required', '',{duration: 3000,
      verticalPosition:'bottom',
      // horizontalPosition:'right'
    
    })
    return;
  }
// Add USer function : User service
this.userService.addUser(this.user).subscribe(
  (data:any)=>{
    //Success
    console.log(data);
    // alert('sucess');
    Swal.fire('Successfully Done !!','User id is : '+data.id,'success');
  },
  (error)=>{
    //error
    console.log(error);
    // alert('Somthing went wrong');
    this.snak.open('Something went wrong !!', '',{duration:3000})
  })

}
}
