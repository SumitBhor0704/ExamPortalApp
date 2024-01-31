import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit{

  category = {
    title:'',
    description:''
  }

  constructor(private categoryz:CategoryService, private snack:MatSnackBar){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

formSubmit(){
  if(this.category.title.trim() == '' || this.category.title == null)
  {
    this.snack.open("Title Required !!",'',{duration:3000})
    return;
  }
  this.categoryz.addcategory(this.category).subscribe(
    (data:any)=>{
      this.category.title='';
      this.category.description='';
      Swal.fire("Success !!",'Category added Sucessfully','success');
    },
    (error)=>{
      console.log(error);
      Swal.fire("Error !!",'Please try again','error');
    }
    );

}

}
