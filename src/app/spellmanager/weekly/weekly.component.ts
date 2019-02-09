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
    if (c.value.toLowerCase() != exp) {
    //if case is important:  if (c.value != exp) {  
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

  //UK schools weekly and high frequency words (up to year2)
  static weeklyWords: string[] = ['shouldn\'t', 'money', 'wouldn\'t', 'grass', 'can\'t', 'prove', 'parents', 'won\'t', 'clothes', 'haven\'t', 'break'];

  static hfReception: string[] = ['I', 'go', 'come', 'want', 'up', 'you', 'day', 'was', 'look', 'are', 'the', 'of', 'we', 'this', 'dog', 'me', 'like', 'going', 'big', 'she', 'and', 'they', 'my', 'see', 'on', 'away', 'mum', 'it', 'at', 'play', 'no', 'yes', 'for', 'a', 'dad', 'can', 'he', 'am', 'all', 'is', 'cat', 'get', 'said', 'to', 'in'];

  static hfYear1: string[] = ['has','had','an','as','bed','but','did','from','got','school','him','his','if','jump','not','of','want','one','little','there','do','off','could','put','than','that','them','then','us','when','low','new','about','another','because','by',"can't",'down','half','home','just','live','after','back','been','called','first','have','house','last','made','again','ball','brother','came',"don't",'good','her','how','laugh','make','many','much','next','old'];

  static hfYear2: string[] = ['out','seen','so','their','time','tree','who','were','may','must','night','once','over','should','some','these','too','water','what','would','more','name','now','our','people','sister','take','took','very','way','where','your','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday','day','week','January','February','March','April','May','June','July','August','September','October','November','December','month','year','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty','number','red','orange','green','blue','black','white','brown','pink','purple','grey'];

  static hfNext200: string[] = ['water','bear','find','these','live','away',"can't",'more','began','say','good','again',"I'll",'boy','soon','want','cat','round','animals','night','over','long','tree','never','narrator','how','things','magic','next','small','did','new','shouted','first','car','man','after','us','work',"couldn't",'going','wanted','other','lots','three','where','eat','food','need','head','would','everyone','fox',"'that's",'king','or','our','through','baby','town','took','two','way','fish',"I've",'school','has','been','gave','around','think','yes','stop','mouse','every','home','play','must','something','garden','who','take','red','bed','fast',"didn't",'thought','door','may','only','ran','dog','right','still','many','know','well','sea','found','laughed',"let's",'fun','any','better','lived','much','place','under','hot','birds','suddenly','mother','hat','sun','duck','told','sat','snow','across','horse','another','boat','air','gone','rabbit','great','window','tree','hard','white','why','sleep','bad','floppy','coming','cried','feet','tea','really',"he's",'keep','morning','top','wind','river','room','queen','eyes','wish','liked','last','each','fell','eggs','giant','jumped','book','friends','once','looks','because','its','box','please','use','even','green','dark','thing','along','am','different','grandad','stopped','plants','before','let',"there's",'ever','dragon','gran','girl','looking','miss','pulled','clothes','which','end','most',"we're",'tell','inside','than','cold','fly','key','run','best','park','grow'];
  

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
  suffix = ".mp3";
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
      case 0: {
        console.log('Case 0');    
        this.title = 'Canaries - Days of the week';
        this.wordList = WeeklyComponent.weeklyWords;  
        this.suffix='.m4a';       
        break;
      }
      case 1: {
        this.title = 'High frequency words - Reception';
        this.wordList = WeeklyComponent.hfReception;  
        this.suffix='.mp3';           
        break;
      }
      case 2: {
        this.title = 'High frequency words - Year1';
        this.wordList = WeeklyComponent.hfYear1;    
        this.suffix='.mp3';              
        break;
      }
      case 3: {
        this.title = 'High frequency words - Year2';
        this.wordList = WeeklyComponent.hfYear2; 
        this.suffix='.mp3';                 
        break;
      }
      case 4: {
        this.title = 'High frequency words - 200 words';
        this.wordList = WeeklyComponent.hfNext200;   
        this.suffix='.mp3';               
        break;
      }
      default: {
        console.log('Default routine for chosenid=%s', chosenid);    
        this.title = 'Canaries - Days of the week';
        this.wordList = WeeklyComponent.weeklyWords; 
        this.suffix='.m4a';               
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
    this.file_location = "/assets/words/weekly/" + this.selected_id + '/' + this.word + this.suffix;
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

