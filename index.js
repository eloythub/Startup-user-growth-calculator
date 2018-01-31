const formatNumber = require('./formatNumber')

const configQuartersCount = 4
const configQuarterWeeksCount = 12
const configAnnualInflationRate = 10 // percent


function annualGrowthReport (initialUsersCount, estimatedWeeklyGrowth) {
  let quartersCount = configQuartersCount
  let quarterWeeksCount = configQuarterWeeksCount

  let annualReport = {}

  while (quartersCount--) {
    let quarter = {}

    while (quarterWeeksCount--) {
      initialUsersCount += Math.round(initialUsersCount * (estimatedWeeklyGrowth / 100))

      const currentWeekNumber = configQuarterWeeksCount - quarterWeeksCount

      quarter[`WEEK #${currentWeekNumber}`] = formatNumber(initialUsersCount)
    }

    const currentQuarterNumber = configQuartersCount - quartersCount

    annualReport[`QUARTER #${currentQuarterNumber}`] = quarter

    quarterWeeksCount = configQuarterWeeksCount
  }

  return {
    annualReport,
    lastWeekAmount: initialUsersCount
  }
}

function forcastGrowthYears (initialUsersCount, estimatedWeeklyGrowth, yearsCount) {
  console.log('Annual Growth Report')

  const configYearsCount = yearsCount

  while (yearsCount--) {
    const currentYear = configYearsCount - yearsCount

    console.log(`\n\n\nYEAR #${currentYear} ----------GrowthRate: ${estimatedWeeklyGrowth}% (initial growth rate  - inflation rate) --------`)

    const annualReport = annualGrowthReport(initialUsersCount, estimatedWeeklyGrowth)

    // calculate inflation rate on weeklyGrowthRate
    estimatedWeeklyGrowth -= Math.round(estimatedWeeklyGrowth * (configAnnualInflationRate / 100))

    initialUsersCount = annualReport.lastWeekAmount

    console.log(annualReport.annualReport)
  }
}

forcastGrowthYears(100, 7, 5)