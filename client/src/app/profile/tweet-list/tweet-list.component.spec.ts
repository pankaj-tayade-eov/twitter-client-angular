import { HttpClient, HttpHandler } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
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
                SharedModule
            ],
            providers: [
                HttpClient,
                HttpHandler
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
        component.twitterForm.controls['twitter_user_name'].setValue('test');

        fixture.detectChanges();
        expect(el.querySelector('button').disabled).toBeFalsy;
    }));

    it('submitForm method has been called 0 times', fakeAsync(() => {
        fixture.autoDetectChanges();
        spyOn(component, 'onSubmit').and.callThrough();;
        component.twitterForm.controls['twitter_user_name'].setValue('Platform9Sys');
        component.loader = true;
        fixture.autoDetectChanges();
        let btn = fixture.debugElement.query(By.css('.view-tweet'));
        btn.triggerEventHandler('click', null);
        tick();
        fixture.detectChanges();

        expect(component.onSubmit).toHaveBeenCalledTimes(0);
    }))


    it('Tweeter list to be rendered', async(() => {

        component.tweetList=[{
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
        }] 

        fixture.detectChanges();
        fixture.debugElement
        .query(By.css(".user-name"))
       
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.innerHTML).toContain("author");
    }))


});
