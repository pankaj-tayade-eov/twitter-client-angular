import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Tweet } from '../../models/tweet.model';
import { TwitterService } from './twitter.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('TwitterService', () => {
  let service: TwitterService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [TwitterService]
    });
    service = TestBed.get(TwitterService);
    httpMock = TestBed.get(HttpTestingController);
  });


  it('should be created', () => {
    const service: TwitterService = TestBed.get(TwitterService);
    expect(service).toBeTruthy();
  });





  it('getTweets() should http GET tweets', () => {
    const dummyTweet: Tweet[] = [
      {
        author: "author",
        authorScreenName: "test",
        authorProfileImg: "test",
        text: "test",
        date: "2020-12-12 12:12:12",
        retweetCount: 1,
        favoriteCount: 1,
        replyCount: 1,
        quoteCount: 1,
        twitterId: "test",
        tweetUrl: "test"
      }];

    let results = { param: 'results', count: 1 };

    service.getTweets(results.param, results.count).subscribe((res) => {
      expect(res).toEqual(dummyTweet);
    });
    

    let url = '?twitter_user_name=' + results.param + '&count=' + results.count;

    const req = httpMock.expectOne(`${service.devServerUrl}` + '/tweets' + url);

    expect(req.request.method).toBe("GET");
    req.flush(dummyTweet);
    httpMock.verify();
  });
 
});
