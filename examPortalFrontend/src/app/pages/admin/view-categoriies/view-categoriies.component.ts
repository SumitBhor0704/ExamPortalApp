import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categoriies',
  templateUrl: './view-categoriies.component.html',
  styleUrls: ['./view-categoriies.component.css']
})
export class ViewCategoriiesComponent implements OnInit{
  
  categories =[
    {
      cid:21,
      title:'PROGRAMMING',
      description:'This is Developing Category',
    }
    // {
    //   cid:21,
    //   title:'TESTING',
    //   description:'This is Developing Category',
    // },
    // {
    //   cid:21,
    //   title:'DATABASE',
    //   description:'This is Developing Category',
    // }
  ];

  constructor(private category:CategoryService){}
  
  ngOnInit(): void { 
    this.category.categories().subscribe((data:any)=>{
      this.categories = data;
      console.log(this.categories);
    },
    (error)=>{
      console.log(error);
      Swal.fire("Error !!","error in loading data", 'error');
    });
   }

}
