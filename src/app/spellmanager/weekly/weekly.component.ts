import { Component, OnInit, Renderer } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, ValidatorFn } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { isNull } from 'util';
import { CongratsDialogComponent } from '../../shared/congrats-dialog/congrats-dialog.component';
import { WelldoneDialogComponent } from '../shared/welldone-dialog.component';

function wordMatch(exp: string): ValidatorFn {

  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value == undefined || c.value == '') {
      return null;
    }

    console.log('In wordMatch exp=%s, control.value=%s', exp, c.value);

    if (c.value.toLowerCase() != exp) {
      console.log('wordMatch func returning true (in error)');
      return { 'expected': true }
    }
    return null;
  }
}

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.scss']
})

export class WeeklyComponent implements OnInit {

  static count: number = 0;

  //Elodie Year2 words
  static week1List: string[] = ['baseball','after','every'];
  
  wordList: string[];
  index: number;

  guessedCorrectly: boolean;
  guessForm: FormGroup;
  guessControl: AbstractControl;

  title: string;
  validationMessage = 'Try again';
  errorMessage: string;
  displayWord: boolean;

  word: string;
  file_location: string;

  selected_id: any;

  globalListenFunc: Function;


  constructor(private fb: FormBuilder, private dialog: MatDialog, private renderer: Renderer, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    console.log('In SpellingComponent ngOnInit, index=%s', this.index);

    //play the word if up key pressed
    this.globalListenFunc = this.renderer.listen('document', 'keyup', e => {
      //console.log('onkeyup e.key=%s, e=%s', e.key, e);
      if (e.key == 'ArrowUp') {
        this.play();
      }

    });

    this.route.params.subscribe(params => {
      this.selected_id = params['id'];
      console.log('route params subscribed to for selected_id=%s', this.selected_id);
      this.displayWord = false;
      this.loadWords();
      this.doNewWord();
    });

  }

  loadWords() {
    console.log('In loadWords for choice=%s', this.getChoice());

    switch (this.getChoice()) {
      case 0: {        
        this.title = 'Week 1 words!';
        this.wordList = WeeklyComponent.week1List;
        break;
      }
      default: {        
        this.title = 'Week 1 words!';
        this.wordList = WeeklyComponent.week1List;
        break;
      }
    }    
  }

  getChoice(): number {
    const param = this.route.snapshot.paramMap.get('id');
    console.log('getChoice found param=%s', param);
    if (param) {
      let id = +param //cast to number from string
      return id;
    }
    else {
      console.error('no param for id found');
      return 0;
    }
  }

  doNewWord() {
    this.incrementCount();
    this.generateWord();
    this.setupForm();
    this.setFocusOnInput();
  }

  setIndex() {    
    this.index = WeeklyComponent.count;
    console.log('Set index=%s', this.index);
  }

  generateWord() {
    this.displayWord = false;
   
    this.word = this.wordList[this.index-1];
    var suffix = ".m4a";
    this.file_location = "/assets/words/weekly/" + this.selected_id + '/' + this.word + suffix;
    console.log('generateWord using index=%s, word=%s, file_location=%s', this.index, this.word, this.file_location);
    this.setFocusOnInput();
  }

  setupForm() {
    this.guessForm = this.fb.group({
      actual: ['', wordMatch(this.word)],
    })
    this.guessControl = this.guessForm.get('actual');
    this.guessControl.statusChanges
      .subscribe(value => this.resetError(this.guessControl));

    this.guessedCorrectly = false;
    this.errorMessage = '';
  }

  play() {
    var audio = new Audio();
    audio.src = this.file_location;
    audio.load();
    audio.play();
    this.setFocusOnInput();
  }

  resetError(c: AbstractControl) {
    if (c.valid || c.pristine) {
      this.errorMessage = '';
    }
  }

  setFocusOnInput() {
    const element = this.renderer.selectRootElement('#input1');
    setTimeout(() => element.focus(), 0);
  }

  returnToMenu() {
    this.router.navigateByUrl('/spellmanager/spmenu');
  }

  openCongratsDialog() {
    let dialogRef = this.dialog.open(WelldoneDialogComponent, {
      height: '480px',
      width: '480px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog.afterClosed result=%s', result);
      if (result == 'Main') {
        this.returnToMenu();
      } else {
        this.resetCount();
        this.doNewWord();
      }
    });
  }

  save() {
    const guessControl = this.guessForm.get('actual');
    this.checkInError(guessControl);
  }

  checkInError(c: AbstractControl) {
    console.log('checkInError value=%s, pristine=%s, touched=%s, dirty=%s, errors=%s, valid=%s', c.value, c.pristine, c.touched, c.dirty, c.errors, c.valid);
    this.errorMessage = '';

    if (c.pristine || isNull(c.value) || (c.value == '')) {
      console.log('checkInError found pristine');
      this.errorMessage = 'Enter a word';
      this.setFocusOnInput();
      return;
    }

    if ((c.touched || c.dirty) && c.errors) {
      console.log('checkInError is in error');
      this.errorMessage = this.validationMessage;
      this.guessedCorrectly = false;
      this.setFocusOnInput();
    }
    else {
      console.log('checkInError not in error, getCount=%s, wordList.length=%s', this.getCount(), this.wordList.length)
      if (this.guessedCorrectly) {
        if (this.getCount() >= this.wordList.length) {
          this.resetCount();
          this.openCongratsDialog();
        }
        else {
          console.log('checkInError calling doNewWord');
          this.doNewWord();
        }
      }
      else {
        console.log('checkInError setting guessedCorrectly, disabling');
        this.guessedCorrectly = true;
        this.guessControl.disable();
        document.getElementById('go1').focus(); //focus on submit button
      }
    }
  }

  toggleDisplay() {
    this.displayWord = !this.displayWord;
    this.setFocusOnInput();
  }

  getCount() {
    return WeeklyComponent.count;
  }

  resetCount() {
    WeeklyComponent.count = 0;
  }

  incrementCount() {
    WeeklyComponent.count++;
    this.setIndex();
  }

  ngOnDestroy() {
    console.log("* SpellingComponent in ngOnDestory *");
    if (this.selected_id != null) {
      this.selected_id.unsubscribe;
    }
    this.resetCount();    
  }

}

