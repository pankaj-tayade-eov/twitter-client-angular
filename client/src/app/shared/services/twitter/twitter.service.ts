import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'; 

import { NotificationService } from '../notification/notification.service';

import { Tweet } from '../../models/tweet.model';

@Injectable(
  {
    providedIn:'root'
  }
)
export class TwitterService {

  constructor(private httpClient: HttpClient,
              private notificationService: NotificationService) { }

  defaultOptions = {
    withCredentials: true
  }

  devServerUrl = "http://127.0.0.1:8080";
  default_twitter_user_name = 'Platform9Sys';
  tweet_count = 20;

  private simplifyTweet(tweetData): Tweet {
    return  {
      author: tweetData.user.name,
      authorScreenName: tweetData.user.screen_name,
      authorProfileImg: tweetData.user.profile_image_url_https,
      text: tweetData.text,
      date: tweetData.created_at,
      retweetCount: tweetData.retweet_count,
      favoriteCount: tweetData.favorite_count,
      replyCount: tweetData.reply_count,
      quoteCount: tweetData.quote_count,
      twitterId: tweetData.id_str,
      tweetUrl: `https://twitter.com/${tweetData.user.screen_name}/status/${tweetData.id_str}`
    }
  }

  private simplifyArray(arr: any[], simpFunction: (e: any) => Tweet): any[] {
    return arr.map(simpFunction)
  }



  getTweets(user_name, count): Observable<Tweet[]> {
    return this.httpClient
      .get(this.devServerUrl + '/tweets', {params:{twitter_user_name: user_name, count: count}})
      .map((res: any[]) => {
        return this.simplifyArray(res, this.simplifyTweet);
      })
      .catch((err) => {
        console.info(err);
        return Observable.throwError('Could not get tweets. Try again later.');
      });
  }

}
