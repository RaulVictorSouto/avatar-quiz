import { Component, OnInit } from '@angular/core';
import quiz_questions from "../../../assets/data/quiz_questions.json"
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})

export class QuizComponent implements OnInit {
  title: string = "";
  questions: any;
  questionSelected: any;
  answers: string[] = [];
  answersSelected: string = "";
  questionIndex: number = 0;
  questionMaxIndex: number = 0;
  finished: boolean = false;

  ngOnInit(): void {
    if (quiz_questions.questions) {
      this.finished = false;
      this.title = quiz_questions.title;
      this.questions = quiz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];
      this.questionMaxIndex = this.questions.length;
    }
  }

  playerChoose(value: string): void {
    this.answers.push(value);
    this.nextStep();
  }

  async nextStep(): Promise<void> {
    const finalAnswer: string = await this.checkResult(this.answers);
    this.questionIndex += 1;
    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      this.finished = true;
      this.answersSelected = quiz_questions.results[finalAnswer as keyof typeof quiz_questions.results];
    }
  }

  async checkResult(answers: string[]): Promise<string> {
    const result = answers.reduce((previous, current, i, arr) => {
      if (
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length
      ) {
        return previous;
      } else {
        return current;
      }
    });
    return result;
  }

  getColorForAnswerBG(result: string): string {
    switch (result) {
      case 'Você é um dobrador de AR!  Os dobradores de ar são verdadeiros artistas da liberdade, explorando caminhos inexplorados com criatividade e independência. Seu espírito livre busca constantemente novas formas de encarar o mundo, trazendo inovação e leveza aos desafios que encontra.':
        return '#F8C777';
      case 'Você é um dobrador de ÁGUA! Os dobradores de água são seres compassivos que fluem como rios de empatia. Sua habilidade de construir relacionamentos fortes e buscar harmonia faz de você uma presença cativante. Você encontra novas maneiras de navegar pelas águas da vida.':
        return '#739DFC';
      case 'Você é um dobrador de FOGO! Os dobradores de fogo são expressivos e determinados, moldando a realidade com criatividade e paixão. Sua busca incansável pelo que quer ilumina o caminho, e sua expressividade ardente torna cada desafio uma oportunidade única de criar algo extraordinário.':
        return '#E85B43';
      case 'Você é um dobrador de TERRA! Os dobradores de terra são fortes, pacientes e poderosos, como gigantes inabaláveis. Sua resistência e teimosia, embora desafiadoras, são fundamentais para a estabilidade do mundo ao seu redor. Seu legado é esculpido na solidez das rochas que moldam a história.':
          return '#666A19';

      default:
        return '#e8a017';
    }
  }

  getColorForAnswerBorder(result: string): string {
    switch (result) {
      case 'Você é um dobrador de AR!  Os dobradores de ar são verdadeiros artistas da liberdade, explorando caminhos inexplorados com criatividade e independência. Seu espírito livre busca constantemente novas formas de encarar o mundo, trazendo inovação e leveza aos desafios que encontra.':
        return '#F6AA50';
      case 'Você é um dobrador de ÁGUA! Os dobradores de água são seres compassivos que fluem como rios de empatia. Sua habilidade de construir relacionamentos fortes e buscar harmonia faz de você uma presença cativante. Você encontra novas maneiras de navegar pelas águas da vida.':
        return '#4D7EFD';
      case 'Você é um dobrador de FOGO! Os dobradores de fogo são expressivos e determinados, moldando a realidade com criatividade e paixão. Sua busca incansável pelo que quer ilumina o caminho, e sua expressividade ardente torna cada desafio uma oportunidade única de criar algo extraordinário.':
        return '#C8281D';
      case 'Você é um dobrador de TERRA! Os dobradores de terra são fortes, pacientes e poderosos, como gigantes inabaláveis. Sua resistência e teimosia, embora desafiadoras, são fundamentais para a estabilidade do mundo ao seu redor. Seu legado é esculpido na solidez das rochas que moldam a história.':
          return '#202505';

      default:
        return '#e8a017';
    }
  }

  getImageForAnswer(result: string): string | undefined {
    switch (result) {
      case 'Você é um dobrador de AR!  Os dobradores de ar são verdadeiros artistas da liberdade, explorando caminhos inexplorados com criatividade e independência. Seu espírito livre busca constantemente novas formas de encarar o mundo, trazendo inovação e leveza aos desafios que encontra.':
        return 'https://miro.medium.com/v2/resize:fit:1400/1*AVlhKqgk0B1L0KKJW-od0Q.gif';
      case 'Você é um dobrador de ÁGUA! Os dobradores de água são seres compassivos que fluem como rios de empatia. Sua habilidade de construir relacionamentos fortes e buscar harmonia faz de você uma presença cativante. Você encontra novas maneiras de navegar pelas águas da vida.':
        return 'https://media.tenor.com/6CEMA-h_V5YAAAAC/avatar-waterbender.gif';
      case 'Você é um dobrador de FOGO! Os dobradores de fogo são expressivos e determinados, moldando a realidade com criatividade e paixão. Sua busca incansável pelo que quer ilumina o caminho, e sua expressividade ardente torna cada desafio uma oportunidade única de criar algo extraordinário.':
        return 'https://miro.medium.com/v2/resize:fit:1400/1*JVm8fTQA9L3pEWM8jRFdUg.gif';
      case 'Você é um dobrador de TERRA! Os dobradores de terra são fortes, pacientes e poderosos, como gigantes inabaláveis. Sua resistência e teimosia, embora desafiadoras, são fundamentais para a estabilidade do mundo ao seu redor. Seu legado é esculpido na solidez das rochas que moldam a história.':
        return 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*N-Y4iM3Zy58jsBP-71ATLA.gif';
      default:
        return undefined;
    }
  }

  resetQuiz(): void {
    this.title = "";
    this.questions = null;
    this.questionSelected = null;
    this.answers = [];
    this.answersSelected = "";
    this.questionIndex = 0;
    this.questionMaxIndex = 0;
    this.finished = false;

    location.reload()
    };

  }



