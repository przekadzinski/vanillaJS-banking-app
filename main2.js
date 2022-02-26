class Account {
  #password;
  #movements = [];
  #movementsDates = [];
  loan = true;
  #deposits;
  #withdraws;
  #balance;

  constructor(firstName, surName, password, movements, movementsDates) {
    this.firstName = firstName;
    this.surName = surName;
    this.#password = password;
    this.#movements = movements;
    this.#movementsDates = movementsDates;
    this._calcBalance();
    this._createLogin();
  }

  _createLogin() {
    return (this.login =
      this.firstName.slice(0, 3).toLowerCase() +
      this.surName.slice(0, 3).toLowerCase());
  }
  _getPassword() {
    return this.#password;
  }
  _withdrawal(amount) {
    this.#movements.push(amount);
    this._calcBalance();
  }

  _newDate() {
    this.#movementsDates.push(new Date().toISOString());
  }

  _newDeposit(amount) {
    this.#movements.push(amount);
    this._calcBalance();
  }

  _getBalance() {
    return this.#balance;
  }

  _getMovements() {
    return this.#movements;
  }
  _getMovementsDates() {
    return this.#movementsDates;
  }
  _getDeposits() {
    return this.#deposits;
  }
  _getWithdraws() {
    return this.#withdraws;
  }

  _calcBalance() {
    this.#deposits = this.#movements
      .filter(mov => mov > 0)
      .reduce((acc, curr) => acc + curr, 0);
    this.#withdraws = this.#movements
      .filter(mov => mov < 0)
      .reduce((acc, curr) => acc + curr, 0);
    this.#balance = this.#movements.reduce((acc, curr) => acc + curr, 0);
  }
}

//Aplication architecture
const movementsField = document.querySelector('.movements');
const summaryIN = document.querySelector('.summary__in');
const summaryOUT = document.querySelector('.summary__out');
const balance = document.querySelector('.balance__value');

// const btnLogin2 = document.querySelector('.login__form');
const dataField = document.querySelector('.date');
const inputLoginUserName = document.querySelector('.login__input-username');
const inputLoginPassword = document.querySelector('.login__input-password');
const dashboard = document.querySelector('.app');
const loginField = document.querySelector('.operations');
const userName = document.querySelector('.header__user-name');
const welcomeField = document.querySelector('.header__welcome');
const logoutTime = document.querySelector('.header__logout-time');
const logoutTimer = document.querySelector('.header__timer');
const spinnerWindow = document.querySelector('.login__success');
const spinner = document.querySelector('.spinner');
const clock = document.querySelector('.header__logout-time');
const clockTimer = document.querySelector('.header__timer');
const cardFirstName = document.querySelector('.card__name-firstname');
const cardSurName = document.querySelector('.card__name-surname');
const tabContainer = document.querySelector('.operations');
const tabs = document.querySelectorAll('.operations__tab');
const operations = document.querySelectorAll('.operations__content');
const popupSuccess = document.querySelector('.popup-success');
//btn operation
const btnSort = document.querySelector('.summary__btn');
const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.transfer__btn');
const btnLoan = document.querySelector('.loan__btn');
const btnClose = document.querySelector('.close__btn');
const btnLogout = document.querySelector('.header__btn-logout');
const btnSignUp = document.querySelector('.signup__btn');

class App {
  #accounts = [];
  currentAcc;
  receiverAcc;
  timer;
  showTimer;
  sorted = false;
  constructor() {
    // this._getLocalStorage();
    this._getTestAccounts();

    tabContainer.addEventListener('click', this._switchTab);
    btnLogin.addEventListener('click', this._loginUser.bind(this));
    btnSort.addEventListener('click', this._sorting.bind(this));
    btnLogout.addEventListener('click', this._logoutClick.bind(this));
    btnTransfer.addEventListener('click', this._transfer.bind(this));
    btnLoan.addEventListener('click', this._takeLoan.bind(this));
    btnClose.addEventListener('click', this._closeAccount.bind(this));
    btnSignUp.addEventListener('click', this._registerNewAcc.bind(this));
  }

  _switchTab(e) {
    const clicked = e.target.closest('.operations__tab');
    if (!clicked) return;

    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    clicked.classList.add('operations__tab--active');
    operations.forEach(o => o.classList.remove('visible'));

    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add('visible');
  }
  _getTestAccounts() {
    console.log(this.#accounts.length);
    if (this.#accounts.length !== 0) return;
    const account1 = new Account(
      'Kamil',
      'Testowy',
      '1111',
      [120, -200, 1200, 3000, -600, 800, -550],
      [
        '2021-09-01T13:15:33.035Z',
        '2021-10-01T13:15:33.035Z',
        '2021-11-01T13:15:33.035Z',
        '2021-12-01T13:15:33.035Z',
        '2022-01-01T13:15:33.035Z',
        '2022-02-05T13:15:33.035Z',
        '2022-02-20T13:15:33.035Z',
      ]
    );

    const account2 = new Account(
      'Jan',
      'Nowak',
      '2222',
      [220, -500, 100, 300, -100, 800, -550],
      [
        '2021-09-01T13:15:33.035Z',
        '2021-10-01T13:15:33.035Z',
        '2021-11-01T13:15:33.035Z',
        '2021-12-01T13:15:33.035Z',
        '2022-02-16T13:15:33.035Z',
        '2022-02-18T13:15:33.035Z',
        '2022-02-19T13:15:33.035Z',
      ]
    );

    const account3 = new Account(
      'Mary',
      'Kowalska',
      '3333',
      [1210, -200, 1200, 2000, -980, 880, -590],
      [
        '2021-09-01T13:15:33.035Z',
        '2021-10-01T13:15:33.035Z',
        '2021-11-01T13:15:33.035Z',
        '2021-12-01T13:15:33.035Z',
        '2022-01-16T13:15:33.035Z',
        '2022-02-18T13:15:33.035Z',
        '2022-02-19T13:15:33.035Z',
      ]
    );
    this.#accounts.push(account1, account2, account3);
    console.log(this.#accounts);
  }

  _formatMovementDate(date) {
    const calcDaysPassed = (date1, date2) => {
      return Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
    };

    const daysPassed = calcDaysPassed(new Date(), date);
    if (daysPassed === 0) return 'Today';
    if (daysPassed === 1) return 'Yesterday';
    if (daysPassed <= 7) return `${daysPassed} ago`;
    else {
      return new Intl.DateTimeFormat('pl').format(date);
    }
  }

  _displayMovements(acc, sorted = false) {
    movementsField.innerHTML = '';

    console.log(acc._getMovements());
    const movs = sorted
      ? acc
          ._getMovements()
          .slice()
          .sort((a, b) => b - a)
      : acc._getMovements();

    movs.forEach((mov, i) => {
      const type = mov > 0 ? 'deposit' : 'withdrawal';
      const date = new Date(acc._getMovementsDates()[i]);
      const displayDate = this._formatMovementDate(date);
      const html = `
    <div class="movements__row movements__row-${type}">
          <div class="movements__data">${displayDate}</div>
          <div class="movements__value">${mov} PLN</div>
        </div>
    `;
      movementsField.insertAdjacentHTML('afterbegin', html);
    });
  }

  _displaySummary(acc) {
    summaryIN.textContent = acc._getDeposits().toFixed(2);
    summaryOUT.textContent = acc._getWithdraws().toFixed(2);
    balance.textContent = `${acc._getBalance()}`;
  }

  _upDateUI(acc) {
    this._displayMovements(acc);
    this._displaySummary(acc);
    this._displayCard(acc);
  }

  _displayCard(acc) {
    cardFirstName.textContent = acc.firstName;
    cardSurName.textContent = acc.surName;
  }

  _loginUser(e) {
    e.preventDefault();
    inputLoginPassword.classList.remove('wrong');
    inputLoginUserName.classList.remove('wrong');

    this.currentAcc = this.#accounts.find(
      acc => acc.login === inputLoginUserName.value.toLocaleLowerCase()
    );
    console.log(this.currentAcc);

    if (!this.currentAcc) {
      inputLoginUserName.classList.add('wrong');
      inputLoginPassword.classList.add('wrong');
      return;
    }

    if (this.currentAcc._getPassword() === inputLoginPassword.value) {
      btnLogout.classList.remove('hidden');
      inputLoginUserName.value = '';
      inputLoginPassword.value = '';
      loginField.classList.add('hidden');
      spinnerWindow.classList.add('active');
      spinner.style.animationPlayState = 'running';
      setTimeout(() => {
        spinnerWindow.classList.remove('active');
        spinner.style.animationPlayState = 'paused';
        userName.textContent = `${this.currentAcc.firstName}`;
        this._upDateUI(this.currentAcc);
        this._getDate();
        this._expandElements();
        dashboard.classList.add('app--active');

        welcomeField.style.opacity = 1;
        this._showTimerFn();
      }, 1000);
    }
  }

  _getDate() {
    const now = new Date();
    dataField.textContent = new Intl.DateTimeFormat('pl', {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    }).format(now);
  }
  _showTimerFn() {
    this.showTimer = setTimeout(() => {
      welcomeField.style.opacity = 0;
      clock.style.opacity = 1;
      if (this.timer) clearInterval(this.timer);
      this.timer = this._startLogoutTimer();
    }, 3000);
  }

  _sorting(e) {
    e.preventDefault();
    this.sorted = !this.sorted;
    this._displayMovements(this.currentAcc, this.sorted);
  }

  _logout(message) {
    loginField.classList.remove('hidden');
    dashboard.classList.remove('app--active');
    btnLogout.classList.add('hidden');
    welcomeField.innerHTML = `${message} <span class="header__user-name">${this.currentAcc.firstName}</span> 👋`;
    clearTimeout(this.showTimer);
    welcomeField.style.opacity = 1;
    clock.style.opacity = 0;
  }

  _logoutClick() {
    clearTimeout(this.showTimer);
    this._logout(`Do zobaczenia, `);
  }

  _startLogoutTimer() {
    const tick = function () {
      const min = String(Math.trunc(time / 60)).padStart(2, 0);
      const sec = String(time % 60).padStart(2, 0);
      clockTimer.textContent = `${min}:${sec}`;

      if (time === 0) {
        clearInterval(this.timer);
        logout('Zostałeś wylogowany. Do zobaczenia, ');
      }
      time--;
    };

    let time = 120;
    tick();
    this.timer = setInterval(tick, 1000);
    return this.timer;
  }
  _expandElements() {
    const expandElements = document.querySelectorAll('.operation__label');
    const menuInputs = document.querySelectorAll('.expand');
    expandElements.forEach(el => {
      el.addEventListener('click', function (e) {
        menuInputs.forEach(input => (input.checked = false));
      });
    });
  }

  _transfer() {
    const receiverInput = document.querySelector('.transfer__input-account');

    const amount = document.querySelector('.transfer__input-value');

    this.receiverAcc = this.#accounts.find(
      acc => acc.login === receiverInput.value.toLowerCase()
    );

    if (
      this.receiverAcc &&
      Number(amount.value) > 0 &&
      Number(amount.value) <= this.currentAcc._getBalance() &&
      this.receiverAcc.login !== this.currentAcc.login
    ) {
      this.currentAcc._withdrawal(Number(-amount.value));
      this.receiverAcc._newDeposit(Number(amount.value));

      this.currentAcc._newDate();
      this.receiverAcc._newDate();
      //update UI
      this._upDateUI(this.currentAcc);
      btnTransfer.textContent = 'Wysłano przelew! ';

      setTimeout(() => {
        btnTransfer.textContent = 'Wyślij';
      }, 2000);
    } else {
      btnTransfer.textContent = 'Niepowodzenie, spróbuj jeszcze raz! ';
      setTimeout(() => {
        btnTransfer.textContent = 'Wyślij';
      }, 2500);
    }
    amount.value = '';
    receiverInput.value = '';
    document.querySelector('.transfer__input-name').value = '';
  }
  _takeLoan() {
    const amount = document.querySelector('.loan__input-value');
    if (
      Number(amount.value) > 0 &&
      Number(amount.value) < Number(this.currentAcc._getDeposits() * 3) &&
      this.currentAcc.loan
    ) {
      this.currentAcc._newDeposit(Number(amount.value));
      this.currentAcc._newDate();
      this.currentAcc.loan = false;
      amount.disabled = true;
      this._upDateUI(this.currentAcc);
      btnLoan.textContent = 'Szybka pożyczka niedostępna';

      alert(
        'POMYŚLNY PROCES WERYFIKACJI! :) Pieniądze są już do twojej dyspozycji. /n Następna oferta szybkiej pożyczki 365 dni! '
      );
    } else {
      alert(
        'Niestety twoje zarobki są za niskie, wpisałeś błędą wartość, bądź wykorzystałeś już w tym roku pożyczkę. Spróbuj ponownie :)'
      );
    }
  }

  _closeAccount(e) {
    e.preventDefault();
    const login = document.querySelector('.close__input-login');
    const password = document.querySelector('.close__input-password');

    if (
      login.value.toLowerCase() === this.currentAcc.login &&
      password.value === this.currentAcc._getPassword()
    ) {
      const newArr = this.#accounts.filter(
        acc => acc.login !== this.currentAcc.login
      );
      this.#accounts = newArr;
      login.value = '';
      password.value = '';
      this._logout('Dziękujemy za to, że byłeś z nami, wszystkiego dobrego ');
    }
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('accounts'));
    console.log(data);
    if (!data) return;
    this.#accounts = data;
  }

  //reset all data in localStorage
  reset() {
    localStorage.removeItem('accounts');
    window.location.reload();
  }

  //register new Account

  _registerNewAcc(e) {
    e.preventDefault();

    const newFirstName = document.querySelector('.signup__input--newFirstName');
    const newSurName = document.querySelector('.signup__input--newSurName');
    const newPassword = document.querySelector('.signup__input--password');

    if (!newFirstName.value || newFirstName.value.length < 3) {
      newFirstName.classList.add('wrong');
      return;
    }
    if (!newSurName.value || newFirstName.value.length < 3) {
      newSurName.classList.add('wrong');
      return;
    }
    if (
      newPassword.value.length < 6 ||
      newPassword.value.toLowerCase() === newFirstName.value.toLowerCase()
    ) {
      newPassword.classList.add('wrong');
      return;
    }

    const name = newFirstName.value.slice(0, 3).toLowerCase();
    const surname = newSurName.value.slice(0, 3).toLowerCase();
    const checkLogin = this.#accounts.find(
      el => el.login === `${name}${surname}`
    );

    if (checkLogin) {
      alert('Istnieje już użytkownik');
      return;
      newFirstName.value = '';
      newSurName.value = '';
      newPassword.value = '';
    }

    const account = new Account(
      newFirstName.value,
      newSurName.value,
      newPassword.value,
      [500],
      [new Date().toISOString()]
    );

    this.#accounts.push(account);

    tabContainer.classList.add('hidden');
    popupSuccess.classList.remove('hidden');
    document.querySelector(
      '.popup-success__login'
    ).textContent = `${name}${surname}`;

    setTimeout(() => {
      tabContainer.classList.remove('hidden');
      popupSuccess.classList.add('hidden');
      document.querySelector('.login').classList.add('visible');
      document.querySelector('.signup').classList.remove('visible');
      console.log(
        document.querySelector('[data-tab="1"]'),
        document.querySelector('[data-tab="2"]')
      );
      document
        .querySelector('[data-tab="1"]')
        .classList.add('operations__tab--active');
      document
        .querySelector('[data-tab="2"]')
        .classList.remove('operations__tab--active');
    }, 4000);

    // window.localStorage.setItem('accounts', JSON.stringify(this.#accounts));
  }
}

const app = new App();
