import { Component, Inject } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, ModalController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { CommentPage } from '../../pages/comment/comment';
import { FavoriteProvider } from '../../providers/favorite/favorite';

/**
 * Generated class for the DishdetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {
  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    @Inject('BaseURL') private BaseURL,
    private favoriteservice: FavoriteProvider,
    private toastCtrl: ToastController,
    private actionCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private socialSharing: SocialSharing) {

    this.dish = navParams.get('dish');
    this.favorite = favoriteservice.isFavorite(this.dish.id);
    this.numcomments = this.dish.comments.length;
    this.refreshTotals();
  }

  presentActionSheet() {
    let actionSheet = this.actionCtrl.create({
      title: 'Select Actions',
      buttons: [
        {
          text: 'Share via Facebook',
          handler: () => {
            this.socialSharing.shareViaFacebook(this.dish.name + ' -- ' + this.dish.description, this.BaseURL + this.dish.image, '')
              .then(() => console.log('Posted successfully to Facebook'))
              .catch(() => console.log('Failed to post to Facebook'));
          }
        },
        {
          text: 'Share via Twitter',
          handler: () => {
            this.socialSharing.shareViaTwitter(this.dish.name + ' -- ' + this.dish.description, this.BaseURL + this.dish.image, '')
              .then(() => console.log('Posted successfully to Twitter'))
              .catch(() => console.log('Failed to post to Twitter'));
          }
        },
        {
          text: 'Add to Favorites',
          icon: 'heart',
          handler: () => {
            this.addToFavorites();
          }
        },
        {
          text: 'Add a Comment',
          icon: 'chatboxes',
          handler: () => {
            this.addComment();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
 
    actionSheet.present();
  }

  addToFavorites() {
    console.log('Adding to Favorites', this.dish.id);
    this.favorite = this.favoriteservice.addFavorite(this.dish.id);
    this.toastCtrl.create({
      message: 'Dish ' + this.dish.id + ' added as favorite successfully',
      position: 'middle',
      duration: 3000}).present();
  }

  addComment() {
    let modal = this.modalCtrl.create(CommentPage, {dish: this.dish});
    modal.onDidDismiss(comment => {
      if(comment != null){
        this.dish.comments.push(comment);
        this.refreshTotals();
      }   
    });
    modal.present();
  }

  refreshTotals() {
    this.numcomments = this.dish.comments.length;
    let total = 0;
    this.dish.comments.forEach(comment => total += comment.rating );
    this.avgstars = (total/this.numcomments).toFixed(2);
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

}