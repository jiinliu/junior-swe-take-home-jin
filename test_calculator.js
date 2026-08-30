/**
 * Borrowing Power Calculator Test Suite
 */


const assert = require('assert'); 
const {BorrowingPowerCalculator} = require('./borrowingCalculator');

const calculator = new BorrowingPowerCalculator();

describe('Borrowing Power Calculator Tests', () => {

  it('should calculate borrowing power for standard values', async () => {
    const result = await calculator.calculateBorrowingPower(120000, 2, 3000, 10000, 7.5);
    assert.ok(result.maxLoanAmount > 0, 'Should yield a positive borrowing power amount');
    assert.strictEqual(result.monthlyRepayment, 4600);
  });

  it('should return 0 when there is no repayment capacity', async () => {
    const result = await calculator.calculateBorrowingPower(30000, 3, 4000, 5000, 7.5);
    assert.strictEqual(result.maxLoanAmount, 0);
    assert.strictEqual(result.monthlyRepayment, 0);
  });

  it('should reject a negative income', async () => {
    await assert.rejects(
      calculator.calculateBorrowingPower(-30000, 3, 4000, 5000, 7.5),
      /Tax API failed with status 400/
    );
  });

});

