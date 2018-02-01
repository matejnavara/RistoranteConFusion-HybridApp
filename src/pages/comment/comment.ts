import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Comment } from '../../shared/comment';
import { Dish } from '../../shared/dish';

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  commentForm: FormGroup;
  comment: Comment;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController,
    private formBuilder: FormBuilder ) {

      this.commentForm = this.formBuilder.group({
        rating: ['5', Validators.required ],
        comment: ['', Validators.required ],
        author: ['', Validators.required ],
        date: new Date().toISOString()
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad commentPage');
  }

  onSubmit() {
    console.log(this.commentForm.value);
    this.comment = this.commentForm.value;
    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss(this.comment);
  }

}
