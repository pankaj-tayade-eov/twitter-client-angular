import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { TwitterService } from 'src/app/shared/services/twitter/twitter.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { TweetListComponent } from './tweet-list.component';

describe('TweeterComponent', () => {
    let component: TweetListComponent;
    let fixture: ComponentFixture<TweetListComponent>;
    let el: HTMLElement;
    let de: DebugElement;



    beforeEach(async(() => {



        TestBed.configureTestingModule({
            declarations: [TweetListComponent],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                BrowserModule,
                HttpClientModule,
                SharedModule
            ],
            providers: [
                HttpClientTestingModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TweetListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        de = fixture.debugElement.query(By.css("form"));
        el = de.nativeElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });





    it('submit button is disabled when the form is invalid -- Required fields is empty', async(() => {
        component.twitterForm.controls['twitter_user_name'].setValue('');

        fixture.detectChanges();
        expect(el.querySelector('button').disabled).toBeTruthy();
    }));

    it('submit button is enabled when the form is valid', async(() => {
        component.twitterForm.controls['twitter_user_name'].setValue('Platform9Sys');

        fixture.detectChanges();
        expect(el.querySelector('button').disabled).toBeFalsy;
    }));




    it('should call TwitterService.getTweets() method on component.onSubmit()', fakeAsync(() => {

        const fakedFetchedList = [
            {
                author: "list fetched and shown",
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
            }
        ];

        let myService = TestBed.get(TwitterService);

        component.twitterForm.controls['twitter_user_name'].setValue('Platform9Sys');

        expect(component.twitterForm.invalid).toBeFalsy();


        let getTweetsSpy = spyOn(myService, 'getTweets').and.callFake(() => {
            return of(fakedFetchedList).pipe(delay(300))
        });

      

        spyOn(component, 'onSubmit').and.callThrough();

        component.onSubmit();

        expect(component.loader).toBeTruthy();

        tick(300)

        expect(component.loader).toBeFalsy();

        expect(myService).toBeDefined();

        expect(getTweetsSpy).toBeDefined();

        expect(component.tweetList).toBe(fakedFetchedList);

        expect(getTweetsSpy).toHaveBeenCalledTimes(1);

        fixture.detectChanges();

        const bannerDe: DebugElement = fixture.debugElement;
         
       
        const paragraphDe = bannerDe.query(By.css('.user-name'));
        const p: HTMLElement = paragraphDe.nativeElement;
        expect(p.textContent).toEqual(fakedFetchedList[0].author);

       

    }));


 


});
