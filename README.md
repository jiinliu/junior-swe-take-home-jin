# Borrowing Power Calculator

Hello and thanks so much for taking the time to do the Ferocia Junior Engineering Code Exercise.

This borrowing power calculator written in Javascript was started by one of our juniors, Gen (her full name is “Gen A. Eye”), but she she went on leave before she could finish it…

We need you to progress the code in her absence. Once you’ve submitted your work and we’ve reviewed it, you’ll sit down and explain the code to Gens team members (our interviewers) in a pairing session.

Keep in mind that we’ll expect you to be able to explain and expand on the code you submit.

If you haven’t done much Javascript before don’t worry. We’ll take your experience into account, just give it your best shot. 

You can see our online borrowing power calculator (Gens project is simplified so dont expect the number to match perfectly) to see how it work (https://www.bendigobank.com.au/personal/loans/calculators/borrowing-power/).

## Please try to complete the following:

### Replace the two placeholder functions
The code needs to calculate tax on income and a HEM (Household Expense Measure) value.
Currently this is performed by placeholder code in the following functions:
    getTax(income)
    getHEM(income, dependents)
You will need to replace the code in both with API calls.
We have provided a server.js which can you run locally to expose the following 2 development endpoints:
    http://localhost:3000/api/tax?income=[income]
    http://localhost:3000/api/hem?income=[income]&dependents=[dependents]
Both return JSON and require an authentication header with a valid PAT (Personal Access Token), see server.md for full documentation including the development PAT.

### Make it manageable
Gen planned to pull all the calculator functions into a class so she could extend it later, but we’ll leave it up to you to choose the approach (a well-formed class, an orchestrator function, a factory/closure pattern, or whatever)

### Test coverage
Of course we’ll need the test suite to pass and have full coverage.



## Rules:

Use whatever tools and resources help you get the job done. That includes AI, documentation, Stack Overflow, or anything else. What matters is that you understand every line you submit. In the follow-up pairing session, we'll ask you to walk us through your code, explain your decisions, and make changes on the fly - without an AI in Agent mode. If you can't do that confidently, it will count against you. The goal isn't to catch you out, it's to understand how you think.

## Design decisions

### Calculator class

I put `getTax`, `getHEM`, and `calculateBorrowingPower` in a `BorrowingPowerCalculator` class. These methods are part of the same calculator and use the same API URL and token. Separate functions would also work, but the class keeps the related code together and makes it easier to add more methods later.

The constructor has default values for the API URL and token. This means the app can create a calculator without passing them in every time. They can still be changed later if needed.

The API URL and token are development values provided with this exercise. I kept them in the code so the project is easy to run. In a real application, I would keep tokens out of the source code and read them from an environment variable or a secrets manager.

### Console entry point

`index.js` handles the questions and output shown in the terminal. `borrowingCalculator.js` handles the API calls and calculation. I split them so the calculation code is easier to read and test. Testing the terminal questions would add more complexity, so I test the calculator automatically and check the console manually with `npm start`.

### API errors and testing

The API methods check `response.ok` after each request. If a request fails, they throw an error so the calculation stops. The console catches the error and shows a message to the user.

The tests use the provided development API instead of fake responses. This checks the URLs, authentication header, JSON data, and API errors. The downside is that `npm run api` must be running before the tests.

The coverage command checks `borrowingCalculator.js`. It fails if statements, branches, functions, or lines fall below 100%.

## Setup

Make sure you have Node.js installed.

Install dependencies:
```
npm install
```

## Server

You wil need to run the development API in it's own terminal window.
(The server will be available at http://localhost:3000/).
To start the server run the following command:
```
npm run api
```
Note: You can stop the server with Ctrl+C


## Running

Run the calculator with:
```
npm start
```


## Testing

With the development API running in a separate terminal, run tests with:
```
npm test
```

Run the calculator coverage check with:
```
npm run coverage
```
