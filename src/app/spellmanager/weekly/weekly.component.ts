import { Component, OnInit, Renderer2  } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, ValidatorFn } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { isNull } from 'util';
import { WelldoneDialogComponent } from '../shared/welldone-dialog.component';
import { UtilsService } from '../../shared/utils.service';

function wordMatch(exp: string): ValidatorFn {

  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value == undefined || c.value == '') {
      return null;
    }
    //if (c.value.toLowerCase() != exp) {
    if (c.value != exp) {  
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
  static eList: string[] = ['when', 'where', 'there', 'walking', 'wheels', 'today', 'why'];

  //Isla Year4 words
  static iList: string[] = ['sausages', 'wonderful', 'infrastructure'];

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

  constructor(private fb: FormBuilder, private dialog: MatDialog, 
              private renderer: Renderer2, private route: ActivatedRoute, 
              private router: Router, private utils: UtilsService) {
  }

  ngOnInit() {
    console.log('* WeeklyComponent ngOnInit *');
    this.route.params.subscribe(params => {
      this.selected_id = params['id'];
      console.log('route params subscribed to for selected_id=%s', this.selected_id);
      this.loadWords();
    });

    this.displayWord = false;
  }

  //'up' key triggers audio play
  onKeydown(event) {
    console.log(event);
    this.play();
  }

  loadWords() {
    var chosenid = this.getChoice();
    console.log('In loadWords for choice=%s', chosenid);
    switch (chosenid) {      
      case 1: {
        this.title = 'Kingfishers - class spellings this week';
        this.wordList = WeeklyComponent.iList;             
        break;
      }
      default: {
        console.log('Default routine for chosenid=%s', chosenid);    
        this.title = 'Canaries - Days of the week';
        this.wordList = WeeklyComponent.eList;         
        break;
      }      
    }
    // ensure words randomised each run
    this.utils.shuffleInPlace(this.wordList);         
    this.resetCount();
    this.doNewWord();
  }

  getChoice(): number {
    const param = this.route.snapshot.paramMap.get('id');    
    if (param) {
      let id = +param //cast to number from string
      return id;
    }
    else {
      console.error('no param for id found [defaulting to zero]');
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
    console.log('Post set index=%s', this.index);
  }

  generateWord() {
    this.file_location = null;    
    this.word = this.wordList[this.index - 1];
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
    console.log('playing:%s', this.file_location)
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
    this.errorMessage = '';

    if (c.pristine || isNull(c.value) || (c.value == '')) {      
      this.errorMessage = 'Enter a word';
      this.setFocusOnInput();
      return;
    }

    if ((c.touched || c.dirty) && c.errors) {      
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
    console.log("* WeeklyComponent in ngOnDestory *");
    if (this.selected_id != null) {
      this.selected_id.unsubscribe;  
    }    
    this.resetCount();    
  }
}

