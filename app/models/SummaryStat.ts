export interface DashboardSummaryStatDto {
  visitors?: SummaryStatDto
  visits?: SummaryStatDto
  registers?: SummaryStatDto
  products?: SummaryStatDto
  sells?: SummaryStatDto
  views?: SummaryStatDto
  bounceRate?: SummaryStatDto
}

export interface SummaryStatDto {
  count: number
  suffix?: string
  progress: number
  progressFlow: number[]
}
