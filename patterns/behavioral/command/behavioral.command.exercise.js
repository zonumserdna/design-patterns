let Action = Object.freeze({
  deposit: 0,
  withdraw: 1
});

class Command
{
  constructor(action, amount)
  {
    this.action = action;
    this.amount = amount;
    this.success = false;
  }
}

class Account
{
  constructor()
  {
    this.balance = 0;
  }

  process(cmd)
  {
    switch (cmd.action) {
      case Action.deposit:
        cmd.success = this.deposit(cmd.amount);
        break;
      case Action.withdraw:
        cmd.success = this.withdraw(cmd.amount);
        break;
    }
  }

  deposit(amount) {
    this.balance += amount;
    return true
  }

  withdraw(amount) {
    if (this.balance - amount >= 0) {
      this.balance -= amount;
      return true
    }
    return false
  }
}



let a = new Account();

console.log('depositing $100', a.balance);
let command = new Command(Action.deposit, 100);
a.process(command);

console.log('withdrawing $50', a.balance);
command = new Command(Action.withdraw, 50);
a.process(command);

console.log('attempting to withdraw $150', a.balance);
command.amount = 150;
a.process(command);
