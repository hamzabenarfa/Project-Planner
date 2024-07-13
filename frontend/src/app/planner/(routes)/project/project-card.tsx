import { FC } from 'react'; // Import FC type for functional components
import { EllipsisVertical, Projector } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

// Define prop types for ProjectCard component
type ProjectCardProps = {
  title: string;
  status: string;
  tasksCompleted: number;
  totalTasks: number;
  progress: number;
  lastUpdated: string;
};

const ProjectCard: FC<ProjectCardProps> = ({
  title,
  status,
  tasksCompleted,
  totalTasks,
  progress,
  lastUpdated,
}) => {
  let statusColorClass = '';

  // Determine color class based on status
  switch (status.toLowerCase()) {
    case 'building':
      statusColorClass = 'bg-yellow-100'; 
      break;
    case 'in progress':
      statusColorClass = 'bg-blue-100';
      break;
    case 'pending':
        statusColorClass = 'bg-gray-100';
        break;
    default:
      statusColorClass = 'bg-green-100'; 
      break;
  }

  return (
    <Card className="py-8 cursor-pointer">
      <CardContent className="flex justify-between">
        <div className="flex gap-2">
          <Projector className="aspect-square size-10" />
          <div>
            <h1 className="text-lg font-bold">{title}</h1>
            <p className={`text-sm text-gray-500 rounded-full w-fit px-2 ${statusColorClass}`}>
              {status}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <EllipsisVertical className="size-6" />
        </Button>
      </CardContent>

      <CardContent className="space-y-1">
        <div className="flex justify-between text-sm">
          <h1>{`${tasksCompleted}/${totalTasks} tasks completed`}</h1>
          <p>{`${progress}% completed`}</p>
        </div>
        <Progress value={progress} className="" />
        <p>Last updated {lastUpdated}</p>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
