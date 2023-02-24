import * as dayjs from 'dayjs'

export const formatTimeStamp = timestamp => dayjs(timestamp).valueOf()

export const formatTimeToDate = date => dayjs(date).format('YYYY/MM/DD')