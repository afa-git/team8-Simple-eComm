import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  constructor(private productService: ProductService) { }

  dataProducts:Product[] = [];

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts().subscribe(
      (response)=>{
        this.dataProducts = response;
      },
      (error)=>{
        console.log("error",error)
      }
    )
  }


  onCreatePost(postData:NgForm) {
    if(!postData.valid)
      return
      
    const img:any = [];
    img.push(postData.value.img_url_1);
    img.push(postData.value.img_url_2);
    img.push(postData.value.img_url_3);
    img.push(postData.value.img_url_4);



    const dataProduct:Product = {
        trx_id:postData.value.trx_id,
        name:postData.value.name,
        amount:postData.value.amount,
        stocks:postData.value.stocks,
        image_url:img,
        description:postData.value.description,
        category:postData.value.category
    }

    //Check Id Product
    this.productService.getProducts().subscribe(
      (response)=> {
        console.log("response",response);
        const filteredResults = response.filter(item => item.trx_id.toLowerCase().includes(postData.value.trx_id.toLowerCase()));
        
        if(filteredResults.length > 0){
          alert("Trx ID is exist")    
        }else{
          // Send Http request
          this.productService.postProduct(dataProduct).subscribe(
            (data) => {
              console.log(data);
              alert("Product is Successfully Added")
              postData.reset()
            },
            (error) => {
              console.log(error);
            }
          );
        }
      },
      (error)=>{
        console.log("error",error)
      })


    
  }
}
