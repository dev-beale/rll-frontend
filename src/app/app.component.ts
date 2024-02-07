import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Word {
  id : Number,
  russian : string,
  english: string,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'rll-frontend';
  words : Word[] = [];
  currentWordIndex = 0;
  currentWord: Word|null = null;
  isRussianSide: boolean = true;

  constructor(private http: HttpClient){
  }


  pushCorrect(){
    const word = this.words[this.currentWordIndex];
    this.http.post(`http://localhost:3000/russian_english/${word.id}/correct`,{}).subscribe(
      (response) =>{
        console.log(response);
      }, (error) =>{
        console.log(error);
      }
    )
  }

  pushWrong(){
    const word = this.words[this.currentWordIndex];
    this.http.post(`http://localhost:3000/russian_english/${word.id}/wrong`,{}).subscribe(
      (response) =>{
        console.log(response);
      }, (error) =>{
        console.log(error);
      }
    )
  }

  public pushNext(){
    this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
    this.currentWord = this.words[this.currentWordIndex];
  }

  pushFlip(){
    this.isRussianSide = !this.isRussianSide;
  }

  ngOnInit(): void {
    this.http.get("http://localhost:3000/russian_english").subscribe(
      (response)=>{
        this.words = response as Word[];
        this.currentWord = this.words[this.currentWordIndex];
        console.log(response);
      },
      (error) => {
        console.error('Error:', error);
      }
      );
  }
}
