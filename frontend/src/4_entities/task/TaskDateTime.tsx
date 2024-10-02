import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import { Status } from '../../5_shared/types';
dayjs.extend(relativeTime);
import './task.scss'


interface TaskDateTimeProps {
    date_created: string
    time_in_progress?: string
    date_completed?: string
    status: Status
}

const TaskDateTime: React.FC<TaskDateTimeProps> = ({ date_created, date_completed, status }) => {

    const timeInProgress = dayjs(date_created, 'YYYY-MM-DD HH:mm:ss', true).toNow(true)

    const statusId = status?.id

    return (
        <div className='gap-10' >
            <div>
                <div className='task-content task-item margin-10' >
                    Date of creation:
                </div>
                <div className='task-item' >
                    {date_created}
                </div>
            </div>

            {(statusId === 1 || statusId === 2) &&
                <div>
                    <div className='task-content' >
                        Time in progress:
                    </div>
                    <div className='task-item' >
                        {timeInProgress}
                    </div>
                </div>
            }

            {statusId === 3 &&
                <div>
                    <div className='task-content' >
                        Date of completion:
                    </div>
                    <div className='task-item'>
                        {date_completed}
                    </div>
                </div>
            }
        </div>
    )
}

export default TaskDateTime