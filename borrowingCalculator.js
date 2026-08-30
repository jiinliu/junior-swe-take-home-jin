/**
 * Borrowing Power Calculator
 */

// Global constant for mortgage simulation
const LOAN_TERM_MONTHS = 360; // 30 Years
const API_BASE_URL = "http://localhost:3000"; // API server URL
const API_TOKEN = "pat_abcdefghijklmnopqrstuvwxyz0123456789"; // API Token

class BorrowingPowerCalculator {
    constructor(apiBaseUrl = API_BASE_URL, apiToken = API_TOKEN) {
        this.apiBaseUrl = apiBaseUrl;
        this.apiToken = apiToken;
    }

    async getTax(income) {
        const response = await fetch(`${this.apiBaseUrl}/api/tax?income=${income}`, {
            headers: {
                Authorization: `Bearer ${this.apiToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Tax API failed with status ${response.status}`);
        }

        const data = await response.json();
        return data.tax;
    }

    async getHEM(income, dependents) {
        const response = await fetch(`${this.apiBaseUrl}/api/hem?income=${income}&dependents=${dependents}`, {
            headers: {
                Authorization: `Bearer ${this.apiToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HEM API failed with status ${response.status}`);
        }

        const data = await response.json();
        return data.hem;
    }

    /**
     * Calculates the total borrowing power amount and the monthly repayment configuration
     */
    async calculateBorrowingPower(income, dependents, expenses, creditLimits, annualAssessmentRate) {
        // 1. Calculate Net Monthly Income after tax deductions
        const annualTax = await this.getTax(income);
        const netMonthlyIncome = (income - annualTax) / 12;

        // 2. Determine living expenses (User declared expenses vs HEM baseline, whichever is higher)
        const baselineHEM = await this.getHEM(income, dependents);
        const totalLivingExpenses = Math.max(expenses, baselineHEM);

        // 3. Calculate credit card liability (~3% of total limits)
        const creditCardLiability = creditLimits * 0.03;

        // 4. Calculate monthly repayment capacity
        const maxMonthlyRepayment = netMonthlyIncome - totalLivingExpenses - creditCardLiability;

        // Return early if user cannot afford a loan at all
        if (maxMonthlyRepayment <= 0) {
            return { maxLoanAmount: 0, monthlyRepayment: 0 };
        }

        // 5. Calculate the monthly interest rate
        const monthlyRate = (annualAssessmentRate / 100) / 12;

        // 6. Calculate maximum borrowing power using the following formula:
        // P = M * (1 - (1 + R)^-N) / R
        const maxLoanAmount = maxMonthlyRepayment * ((1 - Math.pow(1 + monthlyRate, - LOAN_TERM_MONTHS)) / monthlyRate);

        return {
            maxLoanAmount: Number(maxLoanAmount.toFixed(2)),
            monthlyRepayment: Number(maxMonthlyRepayment.toFixed(2))
        };
    }
}

module.exports = { BorrowingPowerCalculator };
