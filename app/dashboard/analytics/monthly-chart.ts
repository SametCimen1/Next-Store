import betweekWeeks from "./between-weeks"
import checkDate from "./check-date"

export const monthlyChart = (chartItems: {date: Date, revenue: number}[]) => {
    return [
        {
            date: '3 weeks ago',
            revenue: chartItems.filter((order) => betweekWeeks(order.date!, 28, 21))
            .reduce((acc, price) => acc + price.revenue, 0),
        },
        {
            date: '2 weeks ago',
            revenue: chartItems.filter((order) => betweekWeeks(order.date!, 20, 14))
            .reduce((acc, price) => acc + price.revenue, 0),
        },
        {
            date: '1 weeks ago',
            revenue: chartItems.filter((order) => betweekWeeks(order.date!, 14, 7))
            .reduce((acc, price) => acc + price.revenue, 0),
        },
        {
            date: 'This week',
            revenue: chartItems.filter((order) => betweekWeeks(order.date!, 7, 0))
            .reduce((acc, price) => acc + price.revenue, 0),
        }
    ]
}