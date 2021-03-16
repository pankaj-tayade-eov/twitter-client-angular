import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TwitterService } from '../../shared/services/twitter/twitter.service';
import { Tweet } from '../../shared/models/tweet.model';

@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.css']
})
export class TweetListComponent implements OnInit {

  tweetList: Tweet[];
  loader = true;

  constructor(
  	private twitterService: TwitterService, 
  	private formBuilder: FormBuilder,
  	private reactiveFormsModule: ReactiveFormsModule
  ) { }

  twitterForm = this.formBuilder.group({
    twitter_user_name: this.twitterService.default_twitter_user_name,
  });

  ngOnInit() {
    //this.loader = true;
    this.twitterService.getTweets(this.twitterService.default_twitter_user_name, this.twitterService.tweet_count).subscribe((tweets: Tweet[]) => {
	    this.tweetList = tweets;
      this.loader = false;
	  })
  }
  
  onSubmit() {
    this.loader = true;
    this.twitterService.getTweets(this.twitterForm.value.twitter_user_name, 10).subscribe((tweets: Tweet[]) => {
        this.tweetList = tweets;
        this.loader = false;
    })
  }

}
