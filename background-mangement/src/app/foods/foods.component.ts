import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../service/category.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FoodsService } from '../service/foods.service'

import { Foods } from './foods'


@Component({
  selector: 'foods',
  templateUrl: './foods.html',
  styleUrls: ['foods.css']
})
export class FoodsComponent implements OnInit {

  public category: object;
  public foodsDate: any;
  public foodsForm: FormGroup;
  public imagebase64: any;
  public imagebase642: any;
  public msg: any;
  public obj: Object;

  public dis = false;

  public deleteinfo: any;

  public foodsInfo: Foods = new Foods();

  constructor(
    public categoryService: CategoryService,
    public foodsService: FoodsService,
    public fb: FormBuilder,
    public router: Router,
  ) { }

  public ngOnInit() {
    this.getCategory();
    this.buildFoodsForm();
    this.sendfoods();
    this.showpic();
  }


  buildFoodsForm(): void {
    this.foodsForm = this.fb.group({
      "name": [
        this.foodsInfo.name, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(32)
        ]
      ],
      "price": [
        this.foodsInfo.price,
        [
          Validators.required,
        ]
      ],
      "info": [
        this.foodsInfo.info,
        [
          Validators.required,
        ]
      ],
      "typeName": [
        this.foodsInfo.typeName,
        [
          Validators.required,
        ]
      ],
      "image": [
        this.foodsInfo.image,
        [

        ]
      ],
    })
  }

  // 获取类型
  getCategory() {
    this.categoryService.GetTypeData().subscribe(res => {
      this.category = res
      console.log(this.category)
    })
  }

  // 增加食物
  addFood() {
    this.foodsForm.value.image = this.imagebase64;
    var bd = JSON.stringify(this.foodsForm.value)
    console.log(bd);
    this.foodsService.postFood(bd).subscribe(res => {
      let msg = res
      if (msg.code == 1) {
        this.msg = "添加成功";
        this.sendfoods();
      } else {
        this.msg = "添加失败"
      }
    })
  }

  sendfoods() {
    this.foodsService.getFoods()
      .subscribe(data => {
        this.foodsDate = data
        console.log(this.foodsDate)
      })
  }

  // 图片base64
  showpic() {
    var that = this;
    var base64 = '';
    var imgfile = document.getElementById('imagefile');
    this.changeImg(imgfile, base64, that)
  }

  changeImg(id, base64, that) {
    id.addEventListener('change', readFild, false);

    function readFild() {
      var file = this.files[0];
      if (!/image\/\w+/.test(file.type)) {
        alert("要求是图片");
        return false;
      }
      var render = new FileReader();
      render.readAsDataURL(file);

      render.onload = function () {
        base64 = this.result;
        that.imagebase64 = base64;
      }
    }
  }


  // 删除食物
  deteltfood(_id) {
    this.foodsService.deletefood(_id).subscribe(result => {
      let ret = result;
      if (ret.code == 1) {
        this.sendfoods();
      }
    })
  }


  showdis() {
    this.dis = !this.dis;
  }

  show(food) {
    this.showdis();
    // 转换图片
    // var that = this;
    // var base64 = '';
    // var imgfile = document.getElementById('imagefile2');
    // this.changeImg(imgfile, base64, that)
    console.log(food);
    let foodobj = food;
    this.obj = {
      _id: foodobj._id,
      name: foodobj.name,
      price: foodobj.price,
      info: foodobj.info,
      typeName: foodobj.typeName[0].categoryName,
      image: foodobj.image
    }
  }

  // 更新食物
  updatefood() {
    console.log(this.obj)
    let model = this.obj;
    let obj = JSON.stringify(model);
    this.foodsService.updateFood(obj).subscribe(result => {
      let ret = result;
      if (ret.code == 1) {
        console.log("修改success");
        this.dis = false;
        this.sendfoods();
      } else {
        alert("修改失败");
        this.dis = false;
      }
    })
  }





}
