import * as dayjs from 'dayjs'

export const formatTimeStamp = timestamp => dayjs(timestamp).valueOf()