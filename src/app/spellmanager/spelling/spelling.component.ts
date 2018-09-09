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
  selector: 'app-spelling',
  templateUrl: './spelling.component.html',
  styleUrls: ['./spelling.component.scss']
})
export class SpellingComponent implements OnInit {

  //picture words]
  static objectAnimalList: string[] = ['ball', 'bed', 'bicycle', 'cake', 'chair', 'flowers', 'hammer', 'house', 'knife', 'moon', 'scissors', 'scooter', 'spoon', 'table', 'train', 'tree', 'window', 'butterfly', 'camel', 'dog', 'dolphin', 'duck', 'elephant', 'giraffe', 'gorilla', 'horse', 'kangaroo', 'koala', 'lion', 'monkey', 'snake', 'spider', 'swan', 'tiger', 'whale', 'zebra'];  
  static colourList: string[] = ['blue', 'green', 'orange', 'red', 'yellow', 'brown', 'purple', 'pink'];
  static numberList: string[] = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];
  static shoppingList: string[] = ['apple', 'banana', 'cabbage', 'tomato', 'potato', 'lemon', 'bread', 'cheese', 'milk'];

  //audio words
  static calendarList: string[] = ['April', 'August', 'December', 'February', 'Friday', 'January', 'July', 'June', 'March', 'May', 'Monday', 'month', 'November', 'October', 'Saturday', 'September', 'Sunday', 'Thursday', 'Tuesday', 'Wednesday', 'year'];
  static warmList: string[] = ['about', 'after', 'again', 'another', 'because', 'brother', 'called', 'could', 'first', 'half', 'laugh', 'little', 'name', 'night', 'once', 'people', 'school', 'should', 'sister', 'take', 'there', 'these', 'water', 'your'];
  static warmerList: string[] = ['again', 'bite', 'blade', 'boil', 'caught', 'close', 'clothes', 'coin', 'earth', 'farmyard', 'father', 'flew', 'floor', 'friends', 'garden', 'important', 'light', 'money', 'moon', 'mother', 'neat', 'noisy', 'rain', 'round', 'scare', 'shade', 'share', 'show', 'something', 'soon', 'sound', 'spade', 'sport', 'stood', 'swimming', 'toilet', 'tune', 'turkey', 'white'];
  static hotList: string[] = ['across', 'almost', 'always', 'around', 'asked', 'balloon', 'before', 'began', 'being', 'below', 'better', 'between', 'birthday', 'brought', 'change', 'children', 'different', 'during', 'following', 'found', 'great', 'half', 'heard', 'inside', 'jumped', 'knew', 'might', 'morning', 'much', 'never', 'number', 'often', 'only', 'opened', 'outside', 'second', 'sometimes', 'started', 'still', 'stopped', 'suddenly', 'think', 'today', 'together', 'told', 'until', 'upon', 'walked', 'watch', 'while', 'without', 'woken', 'year', 'young'];
  static hottestList: string[] = ['accompany', 'according', 'achieve', 'actually', 'aggressive', 'although', 'amateur', 'analysis', 'ancient', 'apparent', 'appreciate', 'argument', 'assessment', 'attached', 'audible', 'audience', 'autumn', 'available', 'average', 'awkward', 'bargain', 'beginning', 'believe', 'beneath', 'bruise', 'business', 'category', 'caught', 'cemetery', 'chocolate', 'column', 'committee', 'communicate', 'competition', 'concentration', 'conclusion', 'consequence', 'continuous', 'contribute', 'controversy', 'convenience', 'correspond', 'creation', 'criticise', 'curiosity', 'daughter', 'decision', 'definite', 'design', 'desperate', 'development', 'dictionary', 'disappointing', 'disastrous', 'embarrass', 'engagement', 'enquire', 'environment', 'equipment', 'especially', 'essential', 'evaluation', 'evidence', 'exaggerate', 'excellent', 'existence', 'explanation', 'familiar', 'fierce', 'frequently', 'furthermore', 'government', 'guarantee', 'guard', 'happened', 'height', 'hindrance', 'imaginary', 'immediately', 'improvise', 'individual', 'industrial', 'interference', 'interruption', 'jealous', 'knowledge', 'language', 'leisure', 'lightning', 'listening', 'marriage', 'marvellous', 'material', 'meanwhile', 'mischief', 'mischievous', 'murmur', 'muscle', 'necessary', 'neighbour', 'nervous', 'nuisance', 'occupation', 'opportunity', 'original', 'parallel', 'parliament', 'participation', 'peaceful', 'permanent', 'persuade', 'physical', 'possession', 'potentially', 'preparation', 'prioritise', 'privilege', 'profession', 'pronunciation', 'proportion', 'proposition', 'queue', 'receive', 'recognise', 'recommend', 'reference', 'relevant', 'relief', 'remember', 'research', 'restaurant', 'rhyme', 'rhythm', 'sacrifice', 'science', 'secondary', 'secretary', 'separate', 'sequence', 'shoulder', 'signature', 'sincere', 'skilful', 'soldier', 'stomach', 'straight', 'strategy', 'strength', 'success', 'sufficient', 'suggest', 'symbol', 'system', 'technique', 'technology', 'temperature', 'thorough', 'unfortunately', 'valuable', 'variety', 'vegetable', 'vehicle', 'weight', 'yacht'];
  static monsterList: string[] = ['accommodate', 'acknowledge', 'acquire', 'aggravate', 'appropriate', 'assassin', 'atmosphere', 'ballerina', 'commission', 'compatible', 'conscience', 'conscious', 'courteous', 'criticism', 'deterrent', 'disappearance', 'disastrous', 'dissatisfied', 'efficient', 'embarrassment', 'encyclopedia', 'equipped', 'erroneous', 'especially', 'exception', 'exercise', 'fascinate', 'feasible', 'foreign', 'fulfilled', 'grievance', 'guardian', 'humorous', 'hypocrisy', 'illuminate', 'incidentally', 'indispensable', 'irrelevant', 'irreparable', 'irresistible', 'liaison', 'maintenance', 'manoeuvre', 'miniature', 'miscellaneous', 'mortgage', 'negotiable', 'occasional', 'omitted', 'outrageous', 'penicillin', 'preceding', 'questionnaire', 'seize', 'symmetrical', 'tendency', 'unconscious'];
  
  isAudio = false;
  
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
              private renderer: Renderer, private route: ActivatedRoute, 
              private router: Router) {
  }

  ngOnInit() {
    console.log('In SpellingComponent ngOnInit, index=%s', this.index);
    this.route.params.subscribe(params => {
      this.selected_id = params['id'];
      console.log('route params subscribed to for selected_id=%s', this.selected_id);
      this.displayWord = false;
      this.loadWords();
      this.doNewWord();
    });
  }
  
  //'up' key triggers audio play
  onKeydown(event) {
    console.log(event);
    this.play();
  }

  loadWords() {
    console.log('In loadWords for choice=%s', this.getChoice());

    switch (this.getChoice()) {
      case 0: {
        this.isAudio = false;
        this.title = 'Objects & Animals';
        this.wordList = SpellingComponent.objectAnimalList;
        break;
      }      
      case 2: {
        this.isAudio = false;
        this.title = 'Colours & Numbers';
        this.wordList = SpellingComponent.colourList;
        break;
      }      
      case 4: {
        this.isAudio = false;
        this.title = 'Shopping';
        this.wordList = SpellingComponent.shoppingList;
        break;
      }      
      case 6: {
        this.isAudio = true;
        this.title = 'Warm words';
        this.wordList = SpellingComponent.warmList;
        break;
      }
      case 7: {
        this.isAudio = true;
        this.title = 'Warmer words';
        this.wordList = SpellingComponent.warmerList;
        break;
      }
      case 8: {
        this.isAudio = true;
        this.title = 'Hot words';
        this.wordList = SpellingComponent.hotList;
        break;
      }
      case 9: {
        this.isAudio = true;
        this.title = 'Hottest words';
        this.wordList = SpellingComponent.hottestList;
        break;
      }
      case 10: {
        this.isAudio = true;
        this.title = 'Monster words!';
        this.wordList = SpellingComponent.monsterList;
        break;
      }      
      default: {
        //default to Objects
        this.title = 'Objects & Animals';
        this.wordList = SpellingComponent.objectAnimalList;
        break;
      }
    }
    this.setIndex();
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
    this.generateWord();
    this.setupForm();
    this.setFocusOnInput();
  }

  setIndex() {
    console.log('Set random index on wordList=%s', this.wordList);
    this.index = Math.floor(Math.random() * this.wordList.length) + 0;
    console.log('Set random index=%s', this.index);
  }

  generateWord() {
    this.displayWord = false;
    this.incrementIndex();
    this.word = this.wordList[this.index];
    var suffix = (this.isAudio) ? ".wav" : ".png";    
    this.file_location = "/assets/words/" + this.selected_id + '/' + this.word + suffix;
    console.log('generateWord using index=%s, word=%s, file_location=%s, isAudio=%s', this.index, this.word, this.file_location, this.isAudio);
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
    if (this.isAudio) {
      var audio = new Audio();
      audio.src = this.file_location;
      audio.load();
      audio.play();      
    }
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
      console.log('checkInError not in error');
      if (this.guessedCorrectly) {
        this.doNewWord();
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
 
  incrementIndex() {
    if (this.index >= (this.wordList.length - 1)) {
      console.log('setting index to zero');
      this.index = 0;
    }
    else {
      console.log('incrementing index');
      this.index++;
    }
  }

  ngOnDestroy() {
    console.log("* SpellingComponent in ngOnDestory *");
    if (this.selected_id != null) {
      this.selected_id.unsubscribe;
    }    
  }
}
