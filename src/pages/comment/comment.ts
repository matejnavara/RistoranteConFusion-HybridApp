import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  comment: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController,
    private formBuilder: FormBuilder ) {

      this.comment = this.formBuilder.group({
        rating: 5,
        author: ['Enter name', Validators.required],
        comment: ['Enter comment', Validators.required],
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad commentPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSubmit() {
    console.log(this.comment.value);
    this.viewCtrl.dismiss();
  }

}
